# Système de Tracking - caphorncom.fr

Système de suivi et d'analytics pour collecter les données de navigation et d'événements utilisateur sur le site.

## Configuration

Ajoutez les variables suivantes dans votre fichier `.env` :

```env
VITE_TRACKING_ENABLED=true
VITE_TRACKING_API_URL=https://api.caphorncom.fr/tracking
VITE_TRACKING_SITE_ID=rplb-electricite
```

## Fonctionnalités

### Suivi automatique

Le système suit automatiquement :
- **Vues de pages** : Chaque changement de route est enregistré
- **Informations de session** : ID de session, ID utilisateur, informations du navigateur
- **Métadonnées** : URL, referrer, titre de la page, device info

### Suivi manuel des événements

#### Dans un composant React

```tsx
import { useTracking, useConversionTracking } from '../hooks/useTracking'

function MyComponent() {
  const { trackEvent } = useTracking()
  const { trackButtonClick, trackFormSubmission } = useConversionTracking()

  const handleClick = () => {
    trackButtonClick('contact_button', 'header')
    trackEvent('button_click', {
      button_name: 'contact',
      location: 'header'
    })
  }

  const handleSubmit = (formData: any) => {
    trackFormSubmission('newsletter', {
      source: 'homepage'
    })
  }

  return <button onClick={handleClick}>Contact</button>
}
```

#### Utilisation directe

```tsx
import { track, trackConversion } from '../lib/tracking'

// Événement simple
track('video_play', {
  video_id: '123',
  video_title: 'Tutoriel'
})

// Conversion
trackConversion('purchase', 99.99, {
  product_id: 'abc123',
  category: 'electricity'
})
```

## Types d'événements

### 1. Page View
Suivi automatique des changements de route.

### 2. Événements personnalisés
```tsx
track('event_name', {
  property1: 'value1',
  property2: 'value2'
})
```

### 3. Conversions
```tsx
trackConversion('form_submission', undefined, {
  form_name: 'contact',
  service_type: 'installation'
})
```

## Hooks disponibles

### `useTracking()`
Hook principal pour le tracking d'événements.

```tsx
const { trackEvent, trackPageView, trackConversion } = useTracking()
```

### `useConversionTracking()`
Hook spécialisé pour les conversions (formulaires, appels, emails, boutons).

```tsx
const {
  trackFormSubmission,
  trackPhoneCall,
  trackEmailClick,
  trackButtonClick
} = useConversionTracking()
```

## Données collectées

Chaque événement inclut automatiquement :
- **Session ID** : Identifiant unique de la session
- **User ID** : Identifiant unique de l'utilisateur (persistant)
- **Device Info** : User agent, taille d'écran, viewport, langue, timezone
- **Page Info** : URL, path, titre, referrer
- **Timestamp** : Date et heure de l'événement

## Gestion hors ligne

Le système gère automatiquement les périodes de déconnexion :
- Les événements sont mis en file d'attente lorsque l'utilisateur est hors ligne
- Les événements sont envoyés automatiquement lors de la reconnexion
- Envoi automatique toutes les 30 secondes pour les événements en attente

## Désactiver le tracking

Pour désactiver le tracking (développement, tests) :

```env
VITE_TRACKING_ENABLED=false
```

## Mode debug

En mode développement, les événements sont loggés dans la console :

```tsx
[Tracking] {
  type: 'page_view',
  page_path: '/contact',
  properties: { ... }
}
```

## API Endpoint

Le système envoie les données à l'endpoint configuré (`VITE_TRACKING_API_URL`) avec la structure suivante :

```json
{
  "site_id": "rplb-electricite",
  "type": "page_view",
  "event_name": "page_view",
  "page_path": "/contact",
  "page_title": "Contact",
  "properties": {
    "session_id": "session_123...",
    "user_id": "user_456...",
    "user_agent": "...",
    "screen_width": 1920,
    "screen_height": 1080,
    "viewport_width": 1920,
    "viewport_height": 937,
    "language": "fr-FR",
    "timezone": "Europe/Paris",
    "platform": "MacIntel",
    "url": "https://www.rplb-electricite.fr/contact",
    "referrer": "https://www.google.com"
  },
  "timestamp": 1703847600000
}
```

## Exemples d'utilisation

### Suivre un clic sur un bouton CTA
```tsx
import { useConversionTracking } from '../hooks/useTracking'

const { trackButtonClick } = useConversionTracking()

<button onClick={() => trackButtonClick('devis_gratuit', 'hero')}>
  Demander un devis
</button>
```

### Suivre un appel téléphonique
```tsx
const { trackPhoneCall } = useConversionTracking()

<a href="tel:0786172282" onClick={() => trackPhoneCall('07 86 17 22 82')}>
  Appeler maintenant
</a>
```

### Suivre une soumission de formulaire
```tsx
const { trackFormSubmission } = useConversionTracking()

const handleSubmit = async (formData) => {
  // ... logique du formulaire
  
  trackFormSubmission('contact_form', {
    service_type: formData.service_type,
    city: formData.city,
    urgency: formData.urgency
  })
}
```

## Notes

- Le tracking est asynchrone et n'affecte pas les performances de l'application
- Les données sont envoyées avec `keepalive: true` pour ne pas bloquer la navigation
- Le système respecte la vie privée en utilisant des IDs anonymes
- Les données sont stockées localement (sessionStorage/localStorage) pour la continuité du tracking

