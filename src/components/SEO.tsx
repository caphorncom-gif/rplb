import { useEffect } from 'react'

interface SEOProps {
  title?: string
  /** Si true, <title> et og:title utilisent `title` tel quel (sans ajout "| siteName") */
  documentTitleVerbatim?: boolean
  description?: string
  keywords?: string
  image?: string
  url?: string
  noindex?: boolean
  nofollow?: boolean
  breadcrumbs?: Array<{ name: string; url: string }>
  type?: 'website' | 'article' | 'service'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export const SEO = ({ 
  title, 
  documentTitleVerbatim = false,
  description, 
  keywords, 
  image, 
  url,
  noindex = false,
  nofollow = false,
  breadcrumbs,
  type = 'website',
  publishedTime,
  modifiedTime,
  author
}: SEOProps) => {
  const siteName = import.meta.env.VITE_COMPANY_NAME || 'RPLB Électricité'
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.rplb-electricite.fr'
  const defaultTitle = `${siteName} - Électricien Longueil-Sainte-Marie (60)`
  const defaultDescription = 'Électricien professionnel à Longueil-Sainte-Marie. Installation, dépannage, rénovation électrique. Intervention rapide dans l\'Oise. Devis gratuit.'

  const pageTitle = title
    ? documentTitleVerbatim
      ? title
      : `${title} | ${siteName}`
    : defaultTitle
  const pageDescription = description || defaultDescription
  
  // Normaliser l'URL canonique : enlever les paramètres de requête, trailing slash, etc.
  const normalizeUrl = (rawUrl: string): string => {
    try {
      const url = new URL(rawUrl)
      // Enlever les paramètres de requête (sauf si nécessaire pour le SEO)
      url.search = ''
      // Enlever le trailing slash sauf pour la racine
      if (url.pathname !== '/' && url.pathname.endsWith('/')) {
        url.pathname = url.pathname.slice(0, -1)
      }
      // Forcer www pour la cohérence
      if (!url.hostname.startsWith('www.')) {
        url.hostname = 'www.' + url.hostname.replace(/^www\./, '')
      }
      // Forcer HTTPS
      url.protocol = 'https:'
      return url.toString()
    } catch {
      // Si l'URL est invalide, utiliser l'URL de base
      return siteUrl
    }
  }
  
  const pageUrl = url 
    ? normalizeUrl(url.startsWith('http') ? url : `${siteUrl}${url.startsWith('/') ? url : '/' + url}`)
    : (typeof window !== 'undefined' 
        ? normalizeUrl(window.location.href) 
        : siteUrl)
  const pageImage = image || `${siteUrl}/og-image.jpg`

  useEffect(() => {
    document.title = pageTitle

    // Fonction helper pour mettre à jour ou créer des meta tags
    const updateMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
      const selector = isProperty 
        ? `meta[property="${nameOrProperty}"]` 
        : `meta[name="${nameOrProperty}"]`
      
      let element = document.querySelector(selector) as HTMLMetaElement
      if (element) {
        element.setAttribute('content', content)
      } else {
        element = document.createElement('meta')
        if (isProperty) {
          element.setAttribute('property', nameOrProperty)
        } else {
          element.setAttribute('name', nameOrProperty)
        }
        element.setAttribute('content', content)
        document.head.appendChild(element)
      }
    }

    // Fonction helper pour mettre à jour ou créer des link tags
    const updateLinkTag = (rel: string, href: string, attributes?: Record<string, string>) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement
      if (element) {
        element.setAttribute('href', href)
      } else {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        element.setAttribute('href', href)
        if (attributes) {
          Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value)
          })
        }
        document.head.appendChild(element)
      }
    }

    // Meta description
    updateMetaTag('description', pageDescription)
    
    // Keywords (optionnel, moins important aujourd'hui)
    if (keywords) {
      updateMetaTag('keywords', keywords)
    }

    // Robots
    const robotsContent = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow'
    ].join(', ')
    updateMetaTag('robots', robotsContent)

    // Canonical URL
    updateLinkTag('canonical', pageUrl)

    // Open Graph
    updateMetaTag('og:title', pageTitle, true)
    updateMetaTag('og:description', pageDescription, true)
    updateMetaTag('og:url', pageUrl, true)
    updateMetaTag('og:image', pageImage, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', siteName, true)
    updateMetaTag('og:locale', 'fr_FR', true)
    
    if (type === 'article' && publishedTime) {
      updateMetaTag('og:published_time', publishedTime, true)
    }
    if (type === 'article' && modifiedTime) {
      updateMetaTag('og:modified_time', modifiedTime, true)
    }
    if (type === 'article' && author) {
      updateMetaTag('article:author', author, true)
    }

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', pageTitle)
    updateMetaTag('twitter:description', pageDescription)
    updateMetaTag('twitter:image', pageImage)

    // Theme color pour mobile
    updateMetaTag('theme-color', '#2563eb')

    // Viewport (déjà dans index.html mais on s'assure qu'il est présent)
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0')

  }, [pageTitle, pageDescription, pageUrl, pageImage, keywords, noindex, nofollow, type, publishedTime, modifiedTime, author, siteName])

  // Schema.org JSON-LD - Organisation principale
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': `${siteUrl}#organization`,
    name: siteName,
    image: pageImage,
    telephone: import.meta.env.VITE_CONTACT_PHONE || '',
    email: 'rplb.electricite@gmail.com',
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Longueil-Sainte-Marie',
      addressLocality: 'Longueil-Sainte-Marie',
      postalCode: '60126',
      addressRegion: 'Hauts-de-France',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: import.meta.env.VITE_BUSINESS_LAT || '49.2667',
      longitude: import.meta.env.VITE_BUSINESS_LNG || '2.8833'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Longueil-Sainte-Marie'
      },
      {
        '@type': 'City',
        name: 'Compiègne'
      },
      {
        '@type': 'State',
        name: 'Oise'
      }
    ],
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '12:00'
      }
    ],
    sameAs: []
  }

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  } : null

  // Article Schema (si type article)
  const articleSchema = type === 'article' && publishedTime ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageTitle,
    description: pageDescription,
    image: pageImage,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author || siteName
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    }
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </>
  )
}

