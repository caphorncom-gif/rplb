/**
 * Service de tracking pour caphorncom.fr
 * Version simplifiée - fonctionne même si le tracking est désactivé
 * Intégration Google Analytics 4
 */

export interface TrackingEvent {
  type: 'page_view' | 'event' | 'conversion'
  event_name?: string
  page_path?: string
  page_title?: string
  properties?: Record<string, any>
  timestamp?: number
}

// Déclaration globale pour gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// Fonctions de tracking simplifiées avec Google Analytics
export const track = (eventName: string, properties?: Record<string, any>) => {
  // Envoyer à Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties || {})
  }

  // Tracking personnalisé si activé
  if (import.meta.env.VITE_TRACKING_ENABLED === 'true') {
    if (import.meta.env.DEV) {
      console.log('[Tracking]', eventName, properties)
    }
  }
}

export const trackPageView = (path: string, title?: string) => {
  const pageTitle = title || (typeof document !== 'undefined' ? document.title : '')
  
  // Envoyer à Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-B8JB2LC790', {
      page_path: path,
      page_title: pageTitle
    })
  }

  // Tracking personnalisé si activé
  if (import.meta.env.VITE_TRACKING_ENABLED === 'true') {
    if (import.meta.env.DEV) {
      console.log('[Tracking] page_view', { page_path: path, page_title: pageTitle })
    }
  }
}

export const trackConversion = (conversionName: string, value?: number, properties?: Record<string, any>) => {
  // Envoyer à Google Analytics comme événement de conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      event_category: 'conversion',
      event_label: conversionName,
      value: value,
      ...properties
    })
  }

  // Tracking personnalisé
  track(conversionName, {
    ...properties,
    conversion_value: value
  })
}

// Export d'un service factice pour compatibilité
export const trackingService = {
  track,
  trackPageView,
  trackConversion
}

