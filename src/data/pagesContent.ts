/**
 * Textes de l'accueil, de /services, de /about et des blocs communs (en-tête
 * de page d'accueil, badges de confiance, avis Google, appel à l'action,
 * pied de page).
 *
 * Source unique : lu par les composants React (Home, Services, About, Hero,
 * TrustBadges, GoogleReviewsCarousel, ContactCTA, Footer) ET par
 * `scripts/prerender.mjs` (HTML statique servi aux robots, y compris ceux des
 * IA qui n'exécutent pas le JavaScript). Modifier le texte ici seulement, pour
 * que les deux versions restent identiques.
 */

// --- Accueil ---------------------------------------------------------------

export const homeHero = {
  badge: 'Artisans électriciens · plus de 25 ans de métier',
  // Le H1 de l'accueil = titleLead + ' ' + titleAccent (titleAccent en couleur).
  titleLead: "Électricien dans l'Oise,",
  titleAccent: "l'électricité dans les règles de l'art",
  subtitle:
    "Installation, dépannage, rénovation et domotique dans l'Oise — pour particuliers et professionnels. Deux artisans, un travail soigné, un devis gratuit.",
  ctaQuote: 'Demander un devis gratuit',
  rating: '5,0',
  ratingSuffix: 'sur Google',
  proofs: ['Assurance décennale', 'Devis gratuit sous 48 h'],
  // Photo de l'équipe : affichée par Hero.tsx et Home.tsx, et reprise en <img>
  // dans le HTML pré-rendu de l'accueil.
  photoUrl:
    'https://hgcpddzpqzfxrvfipsii.supabase.co/storage/v1/object/public/rplb-media/services/pagnier-bozo-photo-web.jpg',
  photoAlt: "Romain Pagnier et Ludovic Bozo, électriciens RPLB dans l'Oise",
  photoName: 'Romain & Ludovic',
  photoRole: 'Fondateurs — RPLB Électricité',
}

export const homeServices = {
  eyebrow: 'Nos services',
  headingLine1: 'Du dépannage à la domotique,',
  headingLine2: 'un seul interlocuteur',
  linkAll: 'Voir tous les services',
}

export const homeTeam = {
  eyebrow: 'Qui sommes-nous ?',
  heading: 'Deux artisans, plus de 25 ans de métier',
  text: "Romain Pagnier et Ludovic Bozo interviennent dans toute l'Oise pour vos travaux d'électricité, du simple dépannage à la rénovation complète. Une entreprise à taille humaine : ceux qui établissent le devis sont ceux qui font le chantier.",
  photoAlt: 'Romain Pagnier et Ludovic Bozo, électriciens RPLB Électricité',
  engagements: [
    'Un devis gratuit et détaillé, sans surprise',
    'Des installations conformes NF C 15-100, garanties 10 ans',
    'Un chantier propre, nettoyé au fur et à mesure',
    "Un point d'avancement chaque jour sur les chantiers longs",
  ],
}

export const homeZone = {
  eyebrow: "Zone d'intervention",
  heading: "Votre électricien dans l'Oise, à moins de 30 minutes de chez vous",
  text: "Basés à Longueil-Sainte-Marie, nous intervenons dans un rayon de 30 km : Compiègne, Creil, Senlis, Noyon, Crépy-en-Valois, Pont-Sainte-Maxence et toutes les communes alentour de l'Oise.",
}

// Communes mises en avant sur la page d'accueil.
// Doit rester aligné sur INDEXED_CITY_SLUGS (src/data/localCities.ts) : la home étant
// la page la plus autoritaire, ses liens internes doivent pointer vers les pages
// commune INDEXABLES (contenu unique, vrai potentiel de ranking), pas vers des pages
// noindex. Ordre = par demande de recherche décroissante (source DataForSEO 2026-07).
export const interventionCities = [
  { slug: 'compiegne', name: 'Compiègne' },
  { slug: 'creil', name: 'Creil' },
  { slug: 'senlis', name: 'Senlis' },
  { slug: 'noyon', name: 'Noyon' },
  { slug: 'crepy-en-valois', name: 'Crépy-en-Valois' },
  { slug: 'montataire', name: 'Montataire' },
  { slug: 'pont-sainte-maxence', name: 'Pont-Sainte-Maxence' },
  { slug: 'thourotte', name: 'Thourotte' },
  { slug: 'longueil-sainte-marie', name: 'Longueil-Sainte-Marie' },
]

export const homeBrands = {
  heading: 'Nous installons du matériel de grandes marques',
  brands: ['Schneider Electric', 'Legrand', 'Hager', 'Somfy', 'Siemens', 'ABB'],
}

export const homeArticles = {
  eyebrow: 'Conseils & actualités',
  heading: 'Nos derniers articles',
  linkAll: 'Voir tous les articles',
}

// --- Badges de confiance (accueil, /about) ---------------------------------

export const trustItems = [
  { name: 'Assurance décennale', description: 'Travaux garantis 10 ans' },
  { name: 'Devis gratuit', description: 'Réponse sous 48 h ouvrées' },
  { name: 'Normes NF C 15-100', description: 'Installations conformes' },
  { name: 'Artisans locaux', description: 'Basés à Longueil-Sainte-Marie' },
]

// --- Avis Google (accueil) -------------------------------------------------

export interface GoogleReview {
  id: string
  reviewerName: string
  rating: number
  comment: string
  date?: string
  visitDate?: string
}

export const reviewsBlock = {
  heading: 'Nos Avis Google',
  linkAll: 'Voir tous nos avis sur Google',
  invite: 'Vous avez fait appel à nos services ? Laissez-nous un avis !',
  linkLeave: 'Laisser un avis sur Google',
}

export const googleReviews: GoogleReview[] = [
  {
    id: '0',
    reviewerName: 'Martine',
    rating: 5,
    comment: 'Excellentes prestations ! Dépannage rapide et efficace. Tarif raisonnable. Électricien à recommander. Martine de Verberie',
    date: 'il y a 6 mois',
    visitDate: 'Visité en décembre 2025'
  },
  {
    id: '1',
    reviewerName: 'Severine Leclercq',
    rating: 5,
    comment: 'Merci romain et ludo. Travail très professionnel pour ma cuisine et mon tableau électrique refait à neuf. Je recommande fortement travail très bien, propre et professionnel. Vous pouvez y aller les yeux fermés',
    date: 'il y a un an',
    visitDate: 'Visité en juillet 2024'
  },
  {
    id: '2',
    reviewerName: 'Marie-Christelle Chagot',
    rating: 5,
    comment: 'Entreprise sérieuse et très réactive à laquelle je fais appel sans hésiter régulièrement depuis l\'achat de mon appartement en 2020.',
    date: 'il y a un an',
    visitDate: 'Visité en novembre 2024'
  },
  {
    id: '3',
    reviewerName: 'Pierre AUBERT',
    rating: 5,
    comment: 'Merci Romain et Ludovic pour votre réactivité et votre professionnalisme. Intervention de qualité. Vous pouvez y aller les yeux fermés.',
    date: 'il y a 2 ans',
    visitDate: 'Visité en janvier 2024'
  },
  {
    id: '4',
    reviewerName: 'ANGELE POCTHIER',
    rating: 5,
    comment: 'Rénovation totale de l\'électricité. Travail très professionnel et donne de très bons conseils, nettoyage du chantier au fur et à mesure. Information chaque jour de l\'avancement des travaux. Rien à redire. Personnes très consciencieuses.',
    date: 'il y a 3 ans',
    visitDate: 'Visité en juin 2023'
  },
  {
    id: '5',
    reviewerName: 'Constance BARBIER',
    rating: 5,
    comment: 'Beaucoup de sérieux. De très bon conseils, très polis :) je les recommande à 100%',
    date: 'il y a 4 ans',
    visitDate: 'Visité en avril 2021'
  },
  {
    id: '6',
    reviewerName: 'Sandra Elisange',
    rating: 5,
    comment: 'Société sérieuse, de très bons conseils. Je recommande à 100%. Service au top !',
    date: 'il y a 4 ans',
    visitDate: 'Visité en janvier 2021'
  },
  {
    id: '7',
    reviewerName: 'Daniel Boivent',
    rating: 5,
    comment: 'Artisans sérieux et compétents, je les recommande très vivement.',
    date: 'il y a 4 ans',
    visitDate: 'Visité en juin 2021'
  },
  {
    id: '8',
    reviewerName: 'Ingrid 23',
    rating: 5,
    comment: 'Beaucoup de sérieux, très réactif, de bons conseils, je recommande vivement.',
    date: 'il y a 4 ans',
    visitDate: 'Visité en février 2021'
  }
]

// --- Appel à l'action (bas de la plupart des pages) ------------------------

export const contactCta = {
  headingLead: 'Un projet ? Une panne ?',
  headingAccent: 'Parlons-en.',
  text: 'Appelez-nous ou décrivez votre besoin en 2 minutes : devis gratuit, réponse sous 48 h ouvrées.',
  ctaQuote: 'Devis gratuit en ligne',
  footnote: 'Interventions du lundi au vendredi, 8h–18h · Longueil-Sainte-Marie et 30 km alentour',
}

// --- /services ---------------------------------------------------------------

export const servicesPage = {
  h1: "Nos services d'électricité",
  intro:
    "Solutions complètes pour tous vos besoins en électricité, de l'installation à la maintenance. Pour particuliers et professionnels.",
}

// --- /about ------------------------------------------------------------------

export const aboutPage = {
  h1: 'À propos de RPLB Électricité',
  intro:
    'Votre partenaire de confiance pour tous vos projets électriques - Particuliers et professionnels',
  historyHeading: 'Notre Histoire',
  // Le premier paragraphe porte « RPLB Électricité » en gras : texte découpé en
  // avant / nom / après pour que React et le pré-rendu restent identiques.
  historyFirst: {
    before: 'Fondée il y a plus de 10 ans, ',
    strong: 'RPLB Électricité',
    after:
      " est devenue une référence dans le domaine de l'électricité dans l'Oise. Basée à Longueil-Sainte-Marie, notre entreprise intervient dans toute la région pour répondre aux besoins des particuliers et des professionnels.",
  },
  history: [
    "Notre mission est de fournir des services électriques de haute qualité, en respectant les normes les plus strictes et en garantissant la satisfaction de nos clients. Que ce soit pour une installation neuve, une rénovation complète ou une intervention d'urgence, nous mettons notre expertise à votre service.",
    'Notre équipe de professionnels certifiés est formée régulièrement aux dernières technologies et normes en vigueur. Nous sommes fiers de notre réputation basée sur la qualité, la ponctualité et l\'écoute de nos clients.',
  ],
  figuresHeading: 'En Quelques Chiffres',
  figures: [
    { value: '10+', label: "Années d'expérience" },
    { value: '500+', label: 'Clients satisfaits' },
    { value: '100%', label: 'Conformité normes' },
    { value: 'Lun-Ven', label: 'Disponibilité urgences' },
  ],
  valuesHeading: 'Nos Valeurs',
  values: [
    {
      title: 'Qualité',
      text: 'Nous utilisons uniquement des matériaux de qualité et respectons scrupuleusement les normes NF C 15-100.',
    },
    {
      title: 'Réactivité',
      text: 'Intervention rapide pour les urgences, délais respectés pour les projets. Votre temps compte.',
    },
    {
      title: 'Transparence',
      text: 'Devis détaillés et transparents, pas de surprise. Nous vous conseillons toujours la meilleure solution.',
    },
  ],
  zoneHeading: "Zone d'Intervention",
  zoneText: 'Nous intervenons dans un rayon de 30km autour de Longueil-Sainte-Marie',
  zoneCities: [
    'Longueil-Sainte-Marie',
    'Compiègne',
    'Verberie',
    'Pont-Sainte-Maxence',
    'Crépy-en-Valois',
    'Senlis',
    'Noyon',
    'Montataire',
  ],
}

// --- Pied de page --------------------------------------------------------------

export const footerContent = {
  description:
    "Artisans électriciens dans l'Oise depuis plus de 25 ans. Installation, dépannage, rénovation électrique et domotique — travail soigné, devis gratuit.",
  servicesHeading: 'Nos services',
  serviceLinks: [
    { path: '/services/depannage-electrique', label: 'Dépannage électrique' },
    { path: '/services/installation-electrique-neuve', label: 'Installation neuve' },
    { path: '/services/renovation-electrique', label: 'Rénovation' },
    { path: '/mise-aux-normes-electrique', label: 'Mise aux normes' },
    { path: '/services/domotique', label: 'Domotique' },
    { path: '/services/climatisation', label: 'Climatisation' },
  ],
  extraLinks: [
    { path: '/urgence', label: 'Dépannage urgent' },
    { path: '/realisations', label: 'Nos réalisations' },
    { path: '/blog', label: 'Blog & conseils' },
    { path: '/about', label: 'À propos' },
  ],
  zoneHeading: "Zone d'intervention",
  // Maillage interne vers les pages locales (SEO)
  cityLinks: [
    { slug: 'longueil-sainte-marie', name: 'Longueil-Sainte-Marie' },
    { slug: 'compiegne', name: 'Compiègne' },
    { slug: 'verberie', name: 'Verberie' },
    { slug: 'pont-sainte-maxence', name: 'Pont-Sainte-Maxence' },
    { slug: 'crepy-en-valois', name: 'Crépy-en-Valois' },
    { slug: 'senlis', name: 'Senlis' },
    { slug: 'noyon', name: 'Noyon' },
    { slug: 'montataire', name: 'Montataire' },
  ],
  contactHeading: 'Contact',
  email: 'rplb.electricite@gmail.com',
  // Repli si VITE_BUSINESS_ADDRESS est absente.
  defaultAddress: 'Longueil-Sainte-Marie, 60126',
  phoneNames: { contact: 'Romain Pagnier', urgence: 'Ludovic Bozo' },
  legalLink: 'Mentions légales',
}

// --- Page introuvable (404) --------------------------------------------------

// Lu par src/pages/NotFound.tsx et par scripts/prerender.mjs, qui écrit
// `dist/404.html` : Vercel sert ce fichier avec le statut 404 pour toute
// adresse qui ne correspond à aucune page.
export const notFoundPage = {
  title: 'Page introuvable',
  h1: 'Page introuvable',
  text: "La page que vous cherchez n'existe pas ou a été déplacée. Voici où trouver ce dont vous avez besoin :",
  links: [
    { path: '/', label: "Retour à l'accueil" },
    { path: '/services', label: "Nos services d'électricité" },
    { path: '/urgence', label: 'Dépannage électrique urgent' },
    { path: '/contact', label: 'Contact et devis gratuit' },
    { path: '/blog', label: "Conseils d'électricien (blog)" },
  ],
  callLead: 'Une panne ou une question ? Appelez-nous :',
}
