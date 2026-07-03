import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../lib/tracking'
import { recordConversion } from '../lib/conversions'

interface TrackingProviderProps {
  children: ReactNode
}

/**
 * Provider pour initialiser le système de tracking
 * Suit automatiquement les changements de route
 * Note: Ce composant doit être utilisé à l'intérieur du Router
 */
export const TrackingProvider = ({ children }: TrackingProviderProps) => {
  const location = useLocation()

  useEffect(() => {
    // Suivre la page actuelle au chargement et aux changements
    trackPageView(location.pathname, document.title)
  }, [location.pathname])

  // Conversions : un seul écouteur délégué capte tous les clics sur les liens
  // d'appel (tel:) et d'email (mailto:) du site, où qu'ils soient — présents
  // comme futurs. Évite d'oublier un CTA et le double comptage.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="tel:"], a[href^="mailto:"]'
      ) as HTMLAnchorElement | null
      if (!link) return

      const href = link.getAttribute('href') || ''
      const path = window.location.pathname

      if (href.startsWith('tel:')) {
        recordConversion('phone_call', { number: href.slice(4), path })
      } else if (href.startsWith('mailto:')) {
        recordConversion('email_click', { email: href.slice(7), path })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return <>{children}</>
}
