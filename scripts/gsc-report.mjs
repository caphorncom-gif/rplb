#!/usr/bin/env node
/**
 * Rapport Google Search Console pour RPLB Électricité.
 * Sort un rapport markdown sur stdout : top requêtes/pages, évolution
 * 28 j vs 28 j précédents, opportunités "page 2" (position 11-20).
 *
 * Auth : compte de service (même clé que l'Indexing API), scope lecture seule.
 * Usage : node scripts/gsc-report.mjs
 * Propriété ciblée : sc-domain:rplb-electricite.fr
 */
import { google } from 'googleapis'

const KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || './google-service-account-key.json'
const SITE = process.env.GSC_SITE_URL || 'sc-domain:rplb-electricite.fr'

const iso = (d) => d.toISOString().slice(0, 10)
const daysAgo = (n) => { const d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d }

// Fenêtres : GSC a ~3 j de latence. 28 j courants vs 28 j précédents.
const end = daysAgo(3)
const start = daysAgo(3 + 27)
const prevEnd = daysAgo(3 + 28)
const prevStart = daysAgo(3 + 28 + 27)

const auth = new google.auth.GoogleAuth({
  keyFile: KEY,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
})
const sc = google.searchconsole({ version: 'v1', auth })

async function query(startDate, endDate, dimensions, rowLimit = 25) {
  const res = await sc.searchanalytics.query({
    siteUrl: SITE,
    requestBody: { startDate, endDate, dimensions, rowLimit },
  })
  return res.data.rows || []
}

function totals(rows) {
  return rows.reduce((a, r) => ({ clicks: a.clicks + r.clicks, impressions: a.impressions + r.impressions }), { clicks: 0, impressions: 0 })
}

const out = []
try {
  const [curQ, prevQ, curPages] = await Promise.all([
    query(iso(start), iso(end), ['query'], 200),
    query(iso(prevStart), iso(prevEnd), ['query'], 200),
    query(iso(start), iso(end), ['page'], 25),
  ])

  const tCur = totals(curQ), tPrev = totals(prevQ)
  out.push(`# Rapport Search Console — RPLB`)
  out.push(`Propriété : ${SITE} · Période : ${iso(start)} → ${iso(end)} (vs 28 j précédents)\n`)
  out.push(`**Total** : ${tCur.clicks} clics / ${tCur.impressions} impressions ` +
    `(préc. : ${tPrev.clicks} clics / ${tPrev.impressions} impr.)\n`)

  out.push(`## Top requêtes (clics)`)
  curQ.sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions).slice(0, 10)
    .forEach(r => out.push(`- ${r.clicks} clics · ${r.impressions} impr · pos ${r.position.toFixed(1)} · « ${r.keys[0]} »`))

  out.push(`\n## Opportunités page 2 (position 11–20, ≥10 impr — quick wins)`)
  const p2 = curQ.filter(r => r.position > 10.5 && r.position <= 20 && r.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions).slice(0, 10)
  if (p2.length) p2.forEach(r => out.push(`- pos ${r.position.toFixed(1)} · ${r.impressions} impr · « ${r.keys[0]} »`))
  else out.push(`- (aucune pour l'instant)`)

  out.push(`\n## Top pages (impressions)`)
  curPages.sort((a, b) => b.impressions - a.impressions).slice(0, 10)
    .forEach(r => out.push(`- ${r.impressions} impr · ${r.clicks} clics · pos ${r.position.toFixed(1)} · ${r.keys[0]}`))

  console.log(out.join('\n'))
} catch (e) {
  console.error('Erreur GSC :', e.message)
  process.exit(1)
}
