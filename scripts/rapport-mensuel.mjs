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
 *   - Umami (si `umamiWebsiteId` dans le registre) : visiteurs réels sans cookie,
 *     quand la collecte (démarrée le 29/09/2026) couvre tout le mois. Clé d'API
 *     en lecture : UMAMI_API_KEY ou ~/.umami-token. Sans clé : bloc omis.
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
import { homedir } from 'node:os'
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

// --- Umami (audience réelle, sans cookie) -----------------------------------
const UMAMI_URL = process.env.UMAMI_URL || 'https://umami.srv1147872.hstgr.cloud'
const UMAMI_DEBUT = new Date(Date.UTC(2026, 8, 29)) // mise en place sur le parc
function umamiKey() {
  if (process.env.UMAMI_API_KEY) return process.env.UMAMI_API_KEY
  const f = join(homedir(), '.umami-token')
  return existsSync(f) ? readFileSync(f, 'utf8').trim() : null
}

// null si pas d'id, pas de clé, ou mois antérieur au début de la collecte.
async function umamiTotals(websiteId, start, end) {
  const key = umamiKey()
  if (!websiteId || !key || start < UMAMI_DEBUT) return null
  const q = new URLSearchParams({ startAt: String(start.getTime()), endAt: String(end.getTime() + 86_400_000 - 1) })
  const res = await fetch(`${UMAMI_URL}/api/websites/${websiteId}/stats?${q}`, {
    headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`Umami HTTP ${res.status}`)
  const s = await res.json()
  const v = (x) => Number(typeof x === 'object' && x ? x.value : x) || 0 // Umami 2 {value} / 3 nombre
  return { visitors: v(s.visitors), pageviews: v(s.pageviews) }
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

function renderEmail(client, win, calls, gsc, seo, umami) {
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
${umami?.cur ? `
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin:16px 0">
      <p style="margin:0 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#b45309">Fréquentation du site</p>
      <p style="margin:0;color:#374151"><strong>${umami.cur.visitors}</strong> visiteur(s)${umami.prev ? ` &nbsp;${delta(umami.cur.visitors, umami.prev.visitors)}` : ''}<br>
      <strong>${umami.cur.pageviews}</strong> page(s) consultée(s)${umami.prev ? ` &nbsp;${delta(umami.cur.pageviews, umami.prev.pageviews)}` : ''}</p>
      ${umami.prev ? '' : '<p style="margin:8px 0 0;font-size:13px;color:#6b7280">Nouveau compteur, plus complet (il compte aussi les visiteurs qui refusent les cookies) : comparaison possible dès le mois prochain.</p>'}
    </div>
` : ''}
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
    let umami = null
    try {
      const [cur, prev] = await Promise.all([
        umamiTotals(client.umamiWebsiteId, win.start, win.end),
        umamiTotals(client.umamiWebsiteId, win.prevStart, win.prevEnd),
      ])
      umami = { cur, prev }
    } catch (e) {
      console.warn(`   ⚠️ Umami ignoré : ${e.message}`)
    }
    const html = renderEmail(client, win, calls, gsc, seo, umami)

    const file = join(outDir, `${win.slug}-${client.id}.html`)
    writeFileSync(file, html)

    const contacts = calls.cur.phone_call + calls.cur.contact_form
    console.log(`✅ ${client.brand} — ${win.label}`)
    console.log(`   ${contacts} demande(s) : ${calls.cur.phone_call} appel(s) + ${calls.cur.contact_form} formulaire(s) · Google : ${gsc.cur.impressions} impr / ${gsc.cur.clicks} clics`)
    if (umami?.cur) console.log(`   Umami : ${umami.cur.visitors} visiteurs / ${umami.cur.pageviews} pages vues`)
    console.log(`   Brouillon : ${file}${seo.ready ? '' : '  ⚠️ topo SEO à compléter'}`)
  } catch (e) {
    console.error(`❌ ${client.brand} : ${e.message}`)
  }
}

console.log(`\nDestinataire de validation (toi) : ${VALIDATION.recipient}. Rien n'a été envoyé au client.`)
