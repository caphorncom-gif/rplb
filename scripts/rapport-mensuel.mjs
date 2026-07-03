#!/usr/bin/env node
/**
 * Rapport mensuel client — générateur portable (tous les sites Cap Horn).
 *
 * Produit un BROUILLON HTML par client : nombre de demandes de contact
 * (clics « Appeler » + formulaires) et évolution Google du mois, plus le
 * « topo SEO » du mois. Rien n'est envoyé au client automatiquement : le
 * brouillon est écrit dans `rapports/` pour que tu le relises et l'envoies.
 *
 * Données : mêmes accès que gsc-report.mjs / ga4-report.mjs (compte de service).
 *   - GA4 : conversions phone_call + contact_form.
 *   - GSC : clics + impressions du mois vs mois précédent.
 * Topo SEO : lu depuis `rapports/<AAAA-MM>-seo-<client>.md` s'il existe
 *   (rédigé par Claude depuis la loop SEO hebdo). Sinon, placeholder + rappel.
 *
 * Usage :
 *   node scripts/rapport-mensuel.mjs                 # tous les clients, mois écoulé
 *   node scripts/rapport-mensuel.mjs --client rplb   # un seul client
 *   node scripts/rapport-mensuel.mjs --month 2026-06 # un mois précis
 */
import { google } from 'googleapis'
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || join(ROOT, 'google-service-account-key.json')

// --- args -----------------------------------------------------------------
const args = process.argv.slice(2)
const arg = (name) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : undefined
}

// --- fenêtres mensuelles --------------------------------------------------
const iso = (d) => d.toISOString().slice(0, 10)
// Mois cible = mois écoulé par défaut (ex. lancé début juillet → juin).
function monthWindows(monthArg) {
  let y, m // m = index 0-11
  if (monthArg) {
    const [yy, mm] = monthArg.split('-').map(Number)
    y = yy; m = mm - 1
  } else {
    const now = new Date()
    y = now.getUTCFullYear(); m = now.getUTCMonth() - 1
    if (m < 0) { m = 11; y -= 1 }
  }
  const start = new Date(Date.UTC(y, m, 1))
  const end = new Date(Date.UTC(y, m + 1, 0)) // dernier jour du mois
  const prevStart = new Date(Date.UTC(y, m - 1, 1))
  const prevEnd = new Date(Date.UTC(y, m, 0))
  const label = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(start)
  const slug = `${y}-${String(m + 1).padStart(2, '0')}`
  return { start, end, prevStart, prevEnd, label, slug }
}

// --- clients Google -------------------------------------------------------
const auth = new google.auth.GoogleAuth({
  keyFile: KEY,
  scopes: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/webmasters.readonly',
  ],
})
const ga = google.analyticsdata({ version: 'v1beta', auth })
const sc = google.searchconsole({ version: 'v1', auth })

async function ga4Conversions(propertyId, start, end) {
  const res = await ga.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate: iso(start), endDate: iso(end) }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: { fieldName: 'eventName', inListFilter: { values: ['phone_call', 'contact_form'] } },
      },
    },
  })
  const out = { phone_call: 0, contact_form: 0 }
  for (const r of res.data.rows || []) {
    out[r.dimensionValues[0].value] = Number(r.metricValues[0].value) || 0
  }
  return out
}

async function gscTotals(siteUrl, start, end) {
  const res = await sc.searchanalytics.query({
    siteUrl,
    requestBody: { startDate: iso(start), endDate: iso(end), dimensions: [], rowLimit: 1 },
  })
  const row = (res.data.rows || [])[0]
  return { clicks: Math.round(row?.clicks || 0), impressions: Math.round(row?.impressions || 0) }
}

// --- rendu ----------------------------------------------------------------
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
const delta = (cur, prev) => {
  const d = cur - prev
  if (d === 0) return `<span style="color:#6b7280">= stable</span>`
  const up = d > 0
  return `<span style="color:${up ? '#15803d' : '#b91c1c'}">${up ? '▲' : '▼'} ${up ? '+' : ''}${d} vs mois préc.</span>`
}

function seoBlock(clientId, slug) {
  const path = join(ROOT, 'rapports', `${slug}-seo-${clientId}.md`)
  if (existsSync(path)) {
    const lines = readFileSync(path, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean)
    const items = lines.filter((l) => l.startsWith('-')).map((l) => `<li>${esc(l.replace(/^-\s*/, ''))}</li>`)
    if (items.length) return { html: `<ul style="margin:0;padding-left:20px">${items.join('')}</ul>`, ready: true }
  }
  return {
    ready: false,
    html: `<p style="color:#b45309;margin:0">⚠️ <em>À compléter : créer <code>rapports/${slug}-seo-${clientId}.md</code> (3-4 puces « - … » depuis la loop SEO du mois).</em></p>`,
  }
}

function renderEmail(client, win, calls, gsc, seo) {
  const totalContacts = calls.cur.phone_call + calls.cur.contact_form
  const prevContacts = calls.prev.phone_call + calls.prev.contact_form
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f7f4ed;font-family:Arial,Helvetica,sans-serif;color:#0a1b2e">
  <div style="max-width:600px;margin:0 auto;padding:24px">
    <div style="background:#0a1b2e;color:#fff;border-radius:16px;padding:28px 24px">
      <p style="margin:0 0 4px;color:#ffc53d;font-size:13px;letter-spacing:2px;text-transform:uppercase">Votre site en ${esc(win.label)}</p>
      <h1 style="margin:0;font-size:24px">${esc(client.brand)}</h1>
    </div>

    <p style="font-size:16px;line-height:1.5">Bonjour ${esc(client.clientName)},</p>
    <p style="font-size:16px;line-height:1.5;color:#374151">Voici le point sur votre site ce mois-ci.</p>

    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin:16px 0">
      <p style="margin:0 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#b45309">Demandes de contact générées</p>
      <p style="margin:0;font-size:40px;font-weight:bold;color:#0a1b2e">${totalContacts}</p>
      <p style="margin:6px 0 0;color:#374151">📞 ${calls.cur.phone_call} clic(s) sur « Appeler » &nbsp;·&nbsp; ✉️ ${calls.cur.contact_form} formulaire(s)<br>${delta(totalContacts, prevContacts)}</p>
    </div>

    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin:16px 0">
      <p style="margin:0 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#b45309">Visibilité sur Google</p>
      <p style="margin:0;color:#374151"><strong>${gsc.cur.impressions}</strong> apparitions dans les résultats &nbsp;${delta(gsc.cur.impressions, gsc.prev.impressions)}<br>
      <strong>${gsc.cur.clicks}</strong> visite(s) depuis la recherche &nbsp;${delta(gsc.cur.clicks, gsc.prev.clicks)}</p>
    </div>

    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin:16px 0">
      <p style="margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#b45309">Ce qu'on a fait pour votre visibilité</p>
      ${seo.html}
    </div>

    <p style="font-size:15px;line-height:1.5;color:#374151">Une question, un projet ? Répondez simplement à ce message.</p>
    <p style="font-size:15px;line-height:1.5;color:#374151">Bien à vous,<br><strong>Cap Horn Communications</strong></p>
    <p style="font-size:12px;color:#9ca3af;margin-top:24px">Rapport ${esc(win.label)} · ${esc(client.brand)}</p>
  </div></body></html>`
}

// --- main -----------------------------------------------------------------
const { CLIENTS, VALIDATION } = await import(join(ROOT, 'scripts', 'clients.config.mjs'))
const win = monthWindows(arg('month'))
const only = arg('client')
const targets = only ? CLIENTS.filter((c) => c.id === only) : CLIENTS
if (!targets.length) {
  console.error(`Aucun client${only ? ` « ${only} »` : ''} dans clients.config.mjs.`)
  process.exit(1)
}

const outDir = join(ROOT, 'rapports')
mkdirSync(outDir, { recursive: true })

for (const client of targets) {
  try {
    const [callsCur, callsPrev, gscCur, gscPrev] = await Promise.all([
      ga4Conversions(client.ga4PropertyId, win.start, win.end),
      ga4Conversions(client.ga4PropertyId, win.prevStart, win.prevEnd),
      gscTotals(client.gscDomain, win.start, win.end),
      gscTotals(client.gscDomain, win.prevStart, win.prevEnd),
    ])
    const calls = { cur: callsCur, prev: callsPrev }
    const gsc = { cur: gscCur, prev: gscPrev }
    const seo = seoBlock(client.id, win.slug)
    const html = renderEmail(client, win, calls, gsc, seo)

    const file = join(outDir, `${win.slug}-${client.id}.html`)
    writeFileSync(file, html)

    const contacts = calls.cur.phone_call + calls.cur.contact_form
    console.log(`✅ ${client.brand} — ${win.label}`)
    console.log(`   ${contacts} demande(s) : ${calls.cur.phone_call} appel(s) + ${calls.cur.contact_form} formulaire(s) · Google : ${gsc.cur.impressions} impr / ${gsc.cur.clicks} clics`)
    console.log(`   Brouillon : ${file}${seo.ready ? '' : '  ⚠️ topo SEO à compléter'}`)
  } catch (e) {
    console.error(`❌ ${client.brand} : ${e.message}`)
  }
}

console.log(`\nDestinataire de validation (toi) : ${VALIDATION.recipient}. Rien n'a été envoyé au client.`)
