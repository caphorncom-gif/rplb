import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView, track, trackConversion } from '../lib/tracking'

/**
 * Hook pour utiliser le système de tracking
 * 
 * @example
 * ```tsx
 * const { trackEvent, trackConversion } = useTracking()
 * 
 * const handleClick = () => {
 *   trackEvent('button_click', { button_name: 'contact' })
 * }
 * ```
 */
export const useTracking = () => {
  const location = useLocation()

  // Suivre automatiquement les changements de page
  useEffect(() => {
    trackPageView(location.pathname, document.title)
  }, [location.pathname])

  return {
    trackEvent: (eventName: string, properties?: Record<string, any>) => {
      track(eventName, properties)
    },
    trackPageView: (path: string, title?: string) => {
      trackPageView(path, title)
    },
    trackConversion: (conversionName: string, value?: number, properties?: Record<string, any>) => {
      trackConversion(conversionName, value, properties)
    }
  }
}

/**
 * Hook pour suivre les conversions spécifiques (formulaires, appels, etc.)
 */
export const useConversionTracking = () => {
  return {
    trackFormSubmission: (formName: string, formData?: Record<string, any>) => {
      trackConversion('form_submission', undefined, {
        form_name: formName,
        ...formData
      })
    },
    trackPhoneCall: (phoneNumber: string) => {
      trackConversion('phone_call', undefined, {
        phone_number: phoneNumber
      })
    },
    trackEmailClick: (email: string) => {
      trackConversion('email_click', undefined, {
        email: email
      })
    },
    trackButtonClick: (buttonName: string, buttonLocation?: string) => {
      track('button_click', {
        button_name: buttonName,
        button_location: buttonLocation || window.location.pathname
      })
    }
  }
}

