import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../lib/tracking'

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

  return <>{children}</>
}

