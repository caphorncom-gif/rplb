#!/usr/bin/env node
/**
 * Rapport Google Analytics 4 pour RPLB Électricité.
 * Sort un rapport markdown sur stdout : trafic 28 j vs 28 j précédents,
 * contacts réels, top pages, canaux d'acquisition, villes.
 *
 * Auth : compte de service (même clé que GSC/Indexing), scope analytics.readonly.
 * Usage : node scripts/ga4-report.mjs
 */
import { google } from 'googleapis'

const KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || './google-service-account-key.json'
const PROPERTY = `properties/${process.env.GA4_PROPERTY_ID || '470461392'}`

// Événements de prise de contact posés dans le code (cf. src/lib/analytics).
// On les compte directement : se fier au seul `keyEvents` renvoie 0 tant qu'ils
// ne sont pas cochés « événement clé » dans l'interface GA4 (constaté le 04/09/2026).
const CONTACT_EVENTS = ['phone_call', 'contact_form', 'email_click']

const auth = new google.auth.GoogleAuth({
  keyFile: KEY,
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
})
const data = google.analyticsdata({ version: 'v1beta', auth })

async function report({ dimensions = [], metrics, start = '28daysAgo', end = 'yesterday', limit = 10, orderMetric, filter }) {
  const res = await data.properties.runReport({
    property: PROPERTY,
    requestBody: {
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      limit,
      ...(orderMetric ? { orderBys: [{ metric: { metricName: orderMetric }, desc: true }] } : {}),
      ...(filter ? { dimensionFilter: filter } : {}),
    },
  })
  return res.data.rows || []
}

const num = (rows, i = 0) => (rows[0]?.metricValues?.[i]?.value ?? '0')
const eq = (fieldName, value) => ({ filter: { fieldName, stringFilter: { value } } })
const organic = eq('sessionDefaultChannelGroup', 'Organic Search')
const france = eq('country', 'France')

try {
  const M = ['activeUsers', 'sessions', 'screenPageViews', 'keyEvents']
  const [cur, prev, curFR, prevFR, contactsCur, contactsPrev, pages, channels, cities] = await Promise.all([
    report({ metrics: M }),
    report({ metrics: M, start: '56daysAgo', end: '29daysAgo' }),
    report({ metrics: M, filter: france }),
    report({ metrics: M, start: '56daysAgo', end: '29daysAgo', filter: france }),
    report({ dimensions: ['eventName'], metrics: ['eventCount'], limit: 50 }),
    report({ dimensions: ['eventName'], metrics: ['eventCount'], start: '56daysAgo', end: '29daysAgo', limit: 50 }),
    report({ dimensions: ['pagePath'], metrics: ['screenPageViews', 'activeUsers'], orderMetric: 'screenPageViews', limit: 10 }),
    report({ dimensions: ['sessionDefaultChannelGroup'], metrics: ['sessions', 'activeUsers'], orderMetric: 'sessions', limit: 8 }),
    report({ dimensions: ['city'], metrics: ['sessions'], orderMetric: 'sessions', limit: 12, filter: organic }),
  ])

  const contacts = (rows) => Object.fromEntries(
    rows.filter((r) => CONTACT_EVENTS.includes(r.dimensionValues[0].value))
      .map((r) => [r.dimensionValues[0].value, Number(r.metricValues[0].value)]))
  const cNow = contacts(contactsCur), cPrev = contacts(contactsPrev)
  const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0)

  const out = []
  out.push(`# Rapport GA4 — RPLB`)
  out.push(`Propriété : ${PROPERTY} · 28 derniers jours (vs 28 j précédents)\n`)
  out.push(`**Trafic (tout)** : ${num(cur, 0)} utilisateurs · ${num(cur, 1)} sessions · ${num(cur, 2)} pages vues`)
  out.push(`(préc. : ${num(prev, 0)} util. · ${num(prev, 1)} sessions · ${num(prev, 2)} pages vues)\n`)
  out.push(`**Trafic France** (hors bruit datacenters/bots étrangers) : ` +
    `${num(curFR, 0)} utilisateurs · ${num(curFR, 1)} sessions (préc. : ${num(prevFR, 0)} util. · ${num(prevFR, 1)} sessions)\n`)

  out.push(`## Prises de contact (le vrai KPI)`)
  out.push(`**${sum(cNow)} contact(s)** sur 28 j (préc. : ${sum(cPrev)})`)
  CONTACT_EVENTS.forEach((e) => out.push(`- ${cNow[e] ?? 0} · ${e} (préc. ${cPrev[e] ?? 0})`))
  if (num(cur, 3) === '0' && sum(cNow) > 0) {
    out.push(`\n> ⚠️ GA4 déclare 0 « événement clé » alors que ${sum(cNow)} contact(s) ont eu lieu :`)
    out.push(`> ces événements ne sont pas cochés comme événements clés dans GA4`)
    out.push(`> (Admin → Événements → marquer \`phone_call\`, \`contact_form\`, \`email_click\`).`)
  }

  out.push(`\n## Top pages (pages vues)`)
  pages.forEach((r) => out.push(`- ${r.metricValues[0].value} vues · ${r.metricValues[1].value} util. · ${r.dimensionValues[0].value}`))

  out.push(`\n## Canaux d'acquisition (sessions)`)
  channels.forEach((r) => out.push(`- ${r.metricValues[0].value} sessions · ${r.dimensionValues[0].value}`))

  out.push(`\n## Villes — trafic organique uniquement (sessions)`)
  cities.forEach((r) => out.push(`- ${r.metricValues[0].value} · ${r.dimensionValues[0].value}`))

  console.log(out.join('\n'))
} catch (e) {
  console.error('Erreur GA4 :', e.message)
  process.exit(1)
}
