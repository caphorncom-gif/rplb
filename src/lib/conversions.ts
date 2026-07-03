import { track as vercelTrack } from '@vercel/analytics'

/**
 * Événements de conversion « canoniques » du site RPLB.
 * - Dans **GA4** : événements nommés, à marquer comme « Événement clé »
 *   (Admin → Événements) une fois qu'ils remontent.
 * - Dans **Vercel Web Analytics** : visibles comme *Custom Events*.
 */
export type ConversionName = 'phone_call' | 'contact_form' | 'email_click'

type ConversionProps = Record<string, string | number | boolean | null>

/**
 * Enregistre une conversion à la fois dans Google Analytics 4 (gtag) et dans
 * Vercel Web Analytics. Point d'entrée unique : on ne branche qu'ici pour
 * éviter les oublis et le double comptage.
 */
export const recordConversion = (name: ConversionName, props: ConversionProps = {}) => {
  // Google Analytics 4 — événement nommé
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, props)
  }

  // Vercel Web Analytics — événement personnalisé (no-op hors production)
  try {
    vercelTrack(name, props)
  } catch {
    /* Vercel Analytics indisponible (dev / bloqueur de pub) — on ignore */
  }

  if (import.meta.env.DEV) {
    console.log('[Conversion]', name, props)
  }
}
