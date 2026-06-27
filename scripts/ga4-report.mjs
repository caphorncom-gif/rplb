#!/usr/bin/env node
/**
 * Rapport Google Analytics 4 pour RPLB Électricité.
 * Sort un rapport markdown sur stdout : trafic 28 j vs 28 j précédents,
 * top pages, canaux d'acquisition, villes.
 *
 * Auth : compte de service (même clé que GSC/Indexing), scope analytics.readonly.
 * Usage : node scripts/ga4-report.mjs
 */
import { google } from 'googleapis'

const KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || './google-service-account-key.json'
const PROPERTY = `properties/${process.env.GA4_PROPERTY_ID || '470461392'}`

const auth = new google.auth.GoogleAuth({
  keyFile: KEY,
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
})
const data = google.analyticsdata({ version: 'v1beta', auth })

async function report({ dimensions = [], metrics, start = '28daysAgo', end = 'yesterday', limit = 10, orderMetric }) {
  const res = await data.properties.runReport({
    property: PROPERTY,
    requestBody: {
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      limit,
      ...(orderMetric ? { orderBys: [{ metric: { metricName: orderMetric }, desc: true }] } : {}),
    },
  })
  return res.data.rows || []
}

const num = (rows, i = 0) => (rows[0]?.metricValues?.[i]?.value ?? '0')

try {
  const M = ['activeUsers', 'sessions', 'screenPageViews', 'keyEvents']
  const [cur, prev, pages, channels, cities] = await Promise.all([
    report({ metrics: M }),
    report({ metrics: M, start: '56daysAgo', end: '29daysAgo' }),
    report({ dimensions: ['pagePath'], metrics: ['screenPageViews', 'activeUsers'], orderMetric: 'screenPageViews', limit: 10 }),
    report({ dimensions: ['sessionDefaultChannelGroup'], metrics: ['sessions', 'activeUsers'], orderMetric: 'sessions', limit: 8 }),
    report({ dimensions: ['city'], metrics: ['activeUsers'], orderMetric: 'activeUsers', limit: 8 }),
  ])

  const out = []
  out.push(`# Rapport GA4 — RPLB`)
  out.push(`Propriété : ${PROPERTY} · 28 derniers jours (vs 28 j précédents)\n`)
  out.push(`**Trafic** : ${num(cur, 0)} utilisateurs · ${num(cur, 1)} sessions · ${num(cur, 2)} pages vues · ${num(cur, 3)} conversions`)
  out.push(`(préc. : ${num(prev, 0)} util. · ${num(prev, 1)} sessions · ${num(prev, 2)} pages vues · ${num(prev, 3)} conv.)\n`)

  out.push(`## Top pages (pages vues)`)
  pages.forEach((r) => out.push(`- ${r.metricValues[0].value} vues · ${r.metricValues[1].value} util. · ${r.dimensionValues[0].value}`))

  out.push(`\n## Canaux d'acquisition (sessions)`)
  channels.forEach((r) => out.push(`- ${r.metricValues[0].value} sessions · ${r.dimensionValues[0].value}`))

  out.push(`\n## Villes (utilisateurs)`)
  cities.forEach((r) => out.push(`- ${r.metricValues[0].value} · ${r.dimensionValues[0].value}`))

  console.log(out.join('\n'))
} catch (e) {
  console.error('Erreur GA4 :', e.message)
  process.exit(1)
}
