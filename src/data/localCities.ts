// Liste complète des communes dans un rayon de 15 km autour de Longueil-Sainte-Marie (60126)
// Coordonnées : 49.2667°N, 2.8833°E

export interface CityData {
  slug: string
  name: string
  postalCode: string
  department: string
  lat: number
  lng: number
  description: string
  priority: number
  /** Titre document / Open Graph complet (sans suffixe automatique "| siteName") */
  meta_title?: string
  meta_description?: string
}

export const LOCAL_CITIES: Record<string, CityData> = {
  // Longueil-Sainte-Marie (centre)
  'longueil-sainte-marie': {
    slug: 'longueil-sainte-marie',
    name: 'Longueil-Sainte-Marie',
    postalCode: '60126',
    department: 'Oise',
    lat: 49.2667,
    lng: 2.8833,
    description: 'Notre ville d\'origine, Longueil-Sainte-Marie est au cœur de notre zone d\'intervention. Nous intervenons rapidement pour tous vos besoins électriques.',
    priority: 1.0
  },
  
  // Compiègne et environs
  'compiegne': {
    slug: 'compiegne',
    name: 'Compiègne',
    postalCode: '60200',
    department: 'Oise',
    lat: 49.4178,
    lng: 2.8261,
    description: 'Ville impériale de l\'Oise située à seulement 1h de Paris, Compiègne est une destination privilégiée pour nos services électriques professionnels. Avec son riche patrimoine historique, ses quartiers résidentiels modernes (Centre-ville, Royallieu, Clos des Roses, Saint-Lazare) et sa proximité avec la forêt de Compiègne, la ville nécessite des interventions électriques adaptées à chaque contexte. Que vous habitiez dans le centre historique nécessitant des rénovations électriques respectueuses du patrimoine, ou dans les quartiers récents demandant des installations modernes (domotique, borne de recharge, climatisation), RPLB Électricité intervient rapidement à Compiègne pour tous vos besoins : dépannage électrique urgent, installation électrique neuve, rénovation complète, mise aux normes NF C 15-100, domotique, alarme et vidéosurveillance. Nos électriciens certifiés Qualifelec et RGE sont disponibles du lundi au vendredi pour intervenir rapidement à Compiègne et dans tous ses quartiers.',
    priority: 0.9
  },
  'margny-les-compiegne': {
    slug: 'margny-les-compiegne',
    name: 'Margny-lès-Compiègne',
    postalCode: '60280',
    department: 'Oise',
    lat: 49.4167,
    lng: 2.8167,
    description: 'Commune limitrophe de Compiègne, Margny-lès-Compiègne bénéficie de nos services électriques de proximité.',
    priority: 0.8,
    meta_title: 'Électricien à Margny-lès-Compiègne (60) | SARL RPLB',
    meta_description:
      'RPLB, électricien à Margny-lès-Compiègne (60280). Installation, dépannage, rénovation. Devis gratuit — ☎ 07 86 17 22 82',
  },
  'venette': {
    slug: 'venette',
    name: 'Venette',
    postalCode: '60280',
    department: 'Oise',
    lat: 49.4000,
    lng: 2.8000,
    description: 'Village proche de Compiègne, Venette fait partie de notre zone d\'intervention privilégiée.',
    priority: 0.8
  },
  'jaux': {
    slug: 'jaux',
    name: 'Jaux',
    postalCode: '60880',
    department: 'Oise',
    lat: 49.3833,
    lng: 2.7833,
    description: 'Commune de l\'Oise, Jaux bénéficie de nos interventions électriques rapides et professionnelles.',
    priority: 0.8
  },
  'jonquieres': {
    slug: 'jonquieres',
    name: 'Jonquières',
    postalCode: '60680',
    department: 'Oise',
    lat: 49.3667,
    lng: 2.7333,
    description: 'Village de l\'Oise, Jonquières est desservi par nos électriciens qualifiés.',
    priority: 0.7
  },
  'lachelle': {
    slug: 'lachelle',
    name: 'Lachelle',
    postalCode: '60190',
    department: 'Oise',
    lat: 49.3500,
    lng: 2.7167,
    description: 'Commune de l\'Oise, Lachelle fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'armancourt': {
    slug: 'armancourt',
    name: 'Armancourt',
    postalCode: '60880',
    department: 'Oise',
    lat: 49.3500,
    lng: 2.7500,
    description: 'Village proche de Compiègne, Armancourt bénéficie de nos services électriques.',
    priority: 0.7
  },
  'clairoix': {
    slug: 'clairoix',
    name: 'Clairoix',
    postalCode: '60280',
    department: 'Oise',
    lat: 49.4500,
    lng: 2.8500,
    description: 'Commune de l\'Oise, Clairoix est desservie par nos électriciens professionnels.',
    priority: 0.8
  },
  'choisy-au-bac': {
    slug: 'choisy-au-bac',
    name: 'Choisy-au-Bac',
    postalCode: '60750',
    department: 'Oise',
    lat: 49.4333,
    lng: 2.8833,
    description: 'Village sur les bords de l\'Oise, Choisy-au-Bac fait partie de notre zone d\'intervention.',
    priority: 0.8
  },
  'janville': {
    slug: 'janville',
    name: 'Janville',
    postalCode: '60150',
    department: 'Oise',
    lat: 49.3833,
    lng: 2.9000,
    description: 'Commune de l\'Oise, Janville bénéficie de nos interventions électriques rapides.',
    priority: 0.7
  },
  'le-meux': {
    slug: 'le-meux',
    name: 'Le Meux',
    postalCode: '60880',
    department: 'Oise',
    lat: 49.3667,
    lng: 2.7500,
    description: 'Village de l\'Oise, Le Meux est desservi par nos électriciens qualifiés.',
    priority: 0.7,
    meta_title: 'Électricien au Meux (60) | SARL RPLB Électricité',
    meta_description:
      'Électricien à Le Meux et environs. Installation, dépannage, rénovation électrique. Devis gratuit sous 24h — SARL RPLB, artisan qualifié Oise. ☎ 07 86 17 22 82',
  },
  'lacroix-saint-ouen': {
    slug: 'lacroix-saint-ouen',
    name: 'Lacroix-Saint-Ouen',
    postalCode: '60610',
    department: 'Oise',
    lat: 49.3500,
    lng: 2.7833,
    description: 'Commune de l\'Oise, Lacroix-Saint-Ouen fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'saint-sauveur': {
    slug: 'saint-sauveur',
    name: 'Saint-Sauveur',
    postalCode: '60320',
    department: 'Oise',
    lat: 49.3167,
    lng: 2.7833,
    description: 'Village de l\'Oise, Saint-Sauveur bénéficie de nos services électriques professionnels.',
    priority: 0.7,
    meta_title: 'Électricien à Saint-Sauveur (60) | SARL RPLB Électricité',
    meta_description:
      'Votre électricien à Saint-Sauveur (60). Installation électrique, dépannage urgent, mise aux normes. Artisan certifié — Devis gratuit ☎ 07 86 17 22 82',
  },
  'saint-jean-aux-bois': {
    slug: 'saint-jean-aux-bois',
    name: 'Saint-Jean-aux-Bois',
    postalCode: '60350',
    department: 'Oise',
    lat: 49.3500,
    lng: 2.9000,
    description: 'Commune forestière de l\'Oise, Saint-Jean-aux-Bois est desservie par nos électriciens.',
    priority: 0.7
  },
  'saint-vaast-de-longmont': {
    slug: 'saint-vaast-de-longmont',
    name: 'Saint-Vaast-de-Longmont',
    postalCode: '60410',
    department: 'Oise',
    lat: 49.3000,
    lng: 2.7500,
    description: 'Village de l\'Oise, Saint-Vaast-de-Longmont fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'vieux-moulin': {
    slug: 'vieux-moulin',
    name: 'Vieux-Moulin',
    postalCode: '60350',
    department: 'Oise',
    lat: 49.3833,
    lng: 2.9333,
    description: 'Commune de l\'Oise, Vieux-Moulin bénéficie de nos interventions électriques rapides.',
    priority: 0.7
  },
  'nery': {
    slug: 'nery',
    name: 'Néry',
    postalCode: '60320',
    department: 'Oise',
    lat: 49.2833,
    lng: 2.7833,
    description: 'Village de l\'Oise, Néry est desservi par nos électriciens qualifiés.',
    priority: 0.7
  },
  'saintines': {
    slug: 'saintines',
    name: 'Saintines',
    postalCode: '60410',
    department: 'Oise',
    lat: 49.3000,
    lng: 2.7667,
    description: 'Commune de l\'Oise, Saintines fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'bethisy-saint-martin': {
    slug: 'bethisy-saint-martin',
    name: 'Béthisy-Saint-Martin',
    postalCode: '60320',
    department: 'Oise',
    lat: 49.2833,
    lng: 2.8167,
    description: 'Village de l\'Oise, Béthisy-Saint-Martin bénéficie de nos services électriques.',
    priority: 0.7
  },
  'bethisy-saint-pierre': {
    slug: 'bethisy-saint-pierre',
    name: 'Béthisy-Saint-Pierre',
    postalCode: '60320',
    department: 'Oise',
    lat: 49.3000,
    lng: 2.8167,
    description: 'Commune de l\'Oise, Béthisy-Saint-Pierre est desservie par nos électriciens professionnels.',
    priority: 0.7
  },
  'bienville': {
    slug: 'bienville',
    name: 'Bienville',
    postalCode: '60200',
    department: 'Oise',
    lat: 49.4500,
    lng: 2.8333,
    description: 'Village proche de Compiègne, Bienville fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  
  // Verberie et environs
  'verberie': {
    slug: 'verberie',
    name: 'Verberie',
    postalCode: '60410',
    department: 'Oise',
    lat: 49.3167,
    lng: 2.7333,
    description: 'Commune dynamique de l\'Oise, Verberie bénéficie de nos interventions électriques rapides et professionnelles.',
    priority: 0.9
  },
  'rivecourt': {
    slug: 'rivecourt',
    name: 'Rivecourt',
    postalCode: '60700',
    department: 'Oise',
    lat: 49.3500,
    lng: 2.7333,
    description: 'Village de l\'Oise, Rivecourt est desservi par nos électriciens qualifiés.',
    priority: 0.7
  },
  'le-plessis-brion': {
    slug: 'le-plessis-brion',
    name: 'Le Plessis-Brion',
    postalCode: '60150',
    department: 'Oise',
    lat: 49.4667,
    lng: 2.9000,
    description: 'Commune de l\'Oise, Le Plessis-Brion fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'thourotte': {
    slug: 'thourotte',
    name: 'Thourotte',
    postalCode: '60150',
    department: 'Oise',
    lat: 49.4833,
    lng: 2.8833,
    description: 'Ville de l\'Oise, Thourotte bénéficie de nos services électriques professionnels.',
    priority: 0.8
  },
  'ribecourt-dreslincourt': {
    slug: 'ribecourt-dreslincourt',
    name: 'Ribecourt-Dreslincourt',
    postalCode: '60170',
    department: 'Oise',
    lat: 49.5167,
    lng: 2.9167,
    description: 'Commune de l\'Oise, Ribecourt-Dreslincourt est desservie par nos électriciens.',
    priority: 0.7
  },
  
  // Pont-Sainte-Maxence et environs
  'pont-sainte-maxence': {
    slug: 'pont-sainte-maxence',
    name: 'Pont-Sainte-Maxence',
    postalCode: '60700',
    department: 'Oise',
    lat: 49.3000,
    lng: 2.6000,
    description: 'Située sur les bords de l\'Oise entre Creil et Compiègne, Pont-Sainte-Maxence (60700) compte un centre-ville traversé par la rivière et des quartiers pavillonnaires en développement sur les coteaux. Les habitations anciennes y nécessitent fréquemment une mise aux normes NF C 15-100 et un remplacement de tableau électrique, tandis que les constructions récentes appellent installations neuves, domotique et bornes de recharge. RPLB Électricité intervient à Pont-Sainte-Maxence pour le dépannage électrique urgent, l\'installation, la rénovation complète et la mise en sécurité de votre logement ou local. Artisan certifié Qualifelec et RGE, devis gratuit.',
    priority: 0.9,
    meta_title: 'Électricien à Pont-Sainte-Maxence (60) | Dépannage & Rénovation | RPLB',
    meta_description:
      'RPLB, électricien à Pont-Sainte-Maxence (60700). Dépannage, installation, rénovation, mise aux normes, tableau électrique. Devis gratuit — ☎ 07 86 17 22 82',
  },
  'saint-martin-longueau': {
    slug: 'saint-martin-longueau',
    name: 'Saint-Martin-Longueau',
    postalCode: '60700',
    department: 'Oise',
    lat: 49.3333,
    lng: 2.6000,
    description: 'Commune de l\'Oise, Saint-Martin-Longueau bénéficie de nos interventions électriques.',
    priority: 0.7
  },
  'sacy-le-grand': {
    slug: 'sacy-le-grand',
    name: 'Sacy-le-Grand',
    postalCode: '60700',
    department: 'Oise',
    lat: 49.3500,
    lng: 2.5500,
    description: 'Village de l\'Oise, Sacy-le-Grand est desservi par nos électriciens qualifiés.',
    priority: 0.7
  },
  'sacy-le-petit': {
    slug: 'sacy-le-petit',
    name: 'Sacy-le-Petit',
    postalCode: '60190',
    department: 'Oise',
    lat: 49.3667,
    lng: 2.6167,
    description: 'Commune de l\'Oise, Sacy-le-Petit fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  
  // Crépy-en-Valois et environs
  'crepy-en-valois': {
    slug: 'crepy-en-valois',
    name: 'Crépy-en-Valois',
    postalCode: '60800',
    department: 'Oise',
    lat: 49.2333,
    lng: 2.9000,
    description: 'Ancienne capitale du Valois, Crépy-en-Valois (60800) conjugue un centre historique riche en bâtisses anciennes et des quartiers résidentiels en expansion vers la gare et les zones pavillonnaires. Les logements anciens du centre demandent souvent une rénovation électrique complète et une mise aux normes NF C 15-100, avec remplacement de tableaux vétustes ; les maisons récentes privilégient installations neuves, domotique et bornes de recharge. RPLB Électricité intervient à Crépy-en-Valois pour le dépannage électrique, l\'installation, la rénovation et la mise en sécurité, chez les particuliers comme dans le tertiaire. Artisan certifié Qualifelec et RGE, devis gratuit.',
    priority: 0.9,
    meta_title: 'Électricien à Crépy-en-Valois (60) | Installation & Dépannage | RPLB',
    meta_description:
      'RPLB, électricien à Crépy-en-Valois (60800). Dépannage, installation, rénovation, mise aux normes NF C 15-100. Artisan certifié — Devis gratuit ☎ 07 86 17 22 82',
  },
  'vaumoise': {
    slug: 'vaumoise',
    name: 'Vaumoise',
    postalCode: '60117',
    department: 'Oise',
    lat: 49.2333,
    lng: 2.9833,
    description: 'Village de l\'Oise, Vaumoise est desservi par nos électriciens professionnels.',
    priority: 0.7
  },
  'orrouy': {
    slug: 'orrouy',
    name: 'Orrouy',
    postalCode: '60129',
    department: 'Oise',
    lat: 49.2833,
    lng: 2.9500,
    description: 'Commune de l\'Oise, Orrouy fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'gondreville': {
    slug: 'gondreville',
    name: 'Gondreville',
    postalCode: '60117',
    department: 'Oise',
    lat: 49.2167,
    lng: 2.9500,
    description: 'Village de l\'Oise, Gondreville bénéficie de nos services électriques.',
    priority: 0.7
  },
  
  // Senlis et environs
  'senlis': {
    slug: 'senlis',
    name: 'Senlis',
    postalCode: '60300',
    department: 'Oise',
    lat: 49.2000,
    lng: 2.5833,
    description: 'Cité médiévale prisée pour son patrimoine, Senlis (60300) se distingue par ses ruelles pavées, ses maisons de caractère et un cœur historique classé. Ces bâtiments anciens exigent une rénovation électrique soignée et respectueuse du bâti, avec mise aux normes NF C 15-100 et remplacement de tableaux souvent vétustes ; les quartiers résidentiels plus récents demandent quant à eux des installations neuves, de la domotique et des bornes de recharge. RPLB Électricité intervient à Senlis pour le dépannage électrique, la rénovation, l\'installation et la mise en sécurité, chez les particuliers comme dans les locaux professionnels. Artisan certifié Qualifelec et RGE, devis gratuit.',
    priority: 0.9,
    meta_title: 'Électricien à Senlis (60) | SARL RPLB Électricité',
    meta_description:
      'Électricien à Senlis (60300). Installation, dépannage et rénovation électrique. Artisan qualifié, devis gratuit, intervention sous 48h ☎ 07 86 17 22 82',
  },
  'chamant': {
    slug: 'chamant',
    name: 'Chamant',
    postalCode: '60300',
    department: 'Oise',
    lat: 49.2167,
    lng: 2.6167,
    description: 'Village proche de Senlis, Chamant fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'aumont-en-halatte': {
    slug: 'aumont-en-halatte',
    name: 'Aumont-en-Halatte',
    postalCode: '60300',
    department: 'Oise',
    lat: 49.2333,
    lng: 2.5667,
    description: 'Commune de l\'Oise, Aumont-en-Halatte est desservie par nos électriciens.',
    priority: 0.7
  },
  'fleurines': {
    slug: 'fleurines',
    name: 'Fleurines',
    postalCode: '60700',
    department: 'Oise',
    lat: 49.2667,
    lng: 2.5833,
    description: 'Village de l\'Oise, Fleurines bénéficie de nos interventions électriques rapides.',
    priority: 0.7
  },
  'barbery': {
    slug: 'barbery',
    name: 'Barbery',
    postalCode: '60810',
    department: 'Oise',
    lat: 49.2333,
    lng: 2.6333,
    description: 'Commune de l\'Oise, Barbery fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  
  // Noyon et environs
  'noyon': {
    slug: 'noyon',
    name: 'Noyon',
    postalCode: '60400',
    department: 'Oise',
    lat: 49.5833,
    lng: 3.0000,
    description: 'Ancienne capitale du Vermandois dominée par sa cathédrale Notre-Dame, Noyon (60400) associe un centre historique aux bâtisses anciennes et des secteurs pavillonnaires plus récents en périphérie. Les logements anciens du cœur de ville demandent souvent une rénovation électrique complète et une mise aux normes NF C 15-100, tandis que les maisons récentes appellent installations neuves, domotique et bornes de recharge. RPLB Électricité intervient à Noyon pour le dépannage électrique rapide, le remplacement de tableau, la rénovation, l\'installation de prises et points lumineux, ainsi que la mise en sécurité des installations. Artisan certifié Qualifelec et RGE, devis gratuit.',
    priority: 0.9,
    meta_title: 'Électricien à Noyon (60) | Dépannage & Installation | RPLB',
    meta_description:
      'RPLB électricien à Noyon (60400). Dépannage électrique, installation, rénovation, tableaux, prises. Intervention rapide — Devis gratuit ☎ 07 86 17 22 82',
  },
  'sempigny': {
    slug: 'sempigny',
    name: 'Sempigny',
    postalCode: '60400',
    department: 'Oise',
    lat: 49.5500,
    lng: 2.9833,
    description: 'Village proche de Noyon, Sempigny est desservi par nos électriciens qualifiés.',
    priority: 0.7
  },
  'suzoy': {
    slug: 'suzoy',
    name: 'Suzoy',
    postalCode: '60400',
    department: 'Oise',
    lat: 49.5667,
    lng: 2.9500,
    description: 'Commune de l\'Oise, Suzoy bénéficie de nos services électriques.',
    priority: 0.7
  },
  
  // Montataire et environs
  'montataire': {
    slug: 'montataire',
    name: 'Montataire',
    postalCode: '60160',
    department: 'Oise',
    lat: 49.2500,
    lng: 2.4333,
    description: 'Commune industrielle de l\'Oise, Montataire bénéficie de nos services électriques pour particuliers et professionnels.',
    priority: 0.9
  },
  'creil': {
    slug: 'creil',
    name: 'Creil',
    postalCode: '60100',
    department: 'Oise',
    lat: 49.2667,
    lng: 2.4833,
    description: 'Pôle urbain majeur du sud de l\'Oise, Creil (60100) mêle un centre-ville dense, des quartiers résidentiels comme le Plateau Rouher et de nombreux logements collectifs autour de la gare. Ce tissu varié appelle des interventions électriques précises : remise aux normes NF C 15-100 d\'appartements anciens, remplacement de tableaux électriques vétustes, sécurisation d\'installations en copropriété, mais aussi installations neuves et domotique dans les programmes récents. RPLB Électricité intervient à Creil pour le dépannage électrique urgent, l\'installation, la rénovation complète et la mise en sécurité de votre logement ou local professionnel. Devis gratuit et conseils par un artisan certifié Qualifelec et RGE.',
    priority: 0.8,
    meta_title: 'Électricien à Creil (60) | Installation & Dépannage | RPLB',
    meta_description:
      'Votre électricien à Creil (60100). Mise aux normes, tableau électrique, domotique. SARL RPLB — Artisan certifié Oise ☎ 07 86 17 22 82',
  },
  'nogent-sur-oise': {
    slug: 'nogent-sur-oise',
    name: 'Nogent-sur-Oise',
    postalCode: '60180',
    department: 'Oise',
    lat: 49.2667,
    lng: 2.4667,
    description: 'Commune de l\'Oise, Nogent-sur-Oise fait partie de notre zone d\'intervention.',
    priority: 0.8
  },
  'villers-saint-paul': {
    slug: 'villers-saint-paul',
    name: 'Villers-Saint-Paul',
    postalCode: '60870',
    department: 'Oise',
    lat: 49.2833,
    lng: 2.4833,
    description: 'Village de l\'Oise, Villers-Saint-Paul bénéficie de nos interventions électriques.',
    priority: 0.7
  },
  'saint-leu-d-esserent': {
    slug: 'saint-leu-d-esserent',
    name: 'Saint-Leu-d\'Esserent',
    postalCode: '60340',
    department: 'Oise',
    lat: 49.2167,
    lng: 2.4167,
    description: 'Commune de l\'Oise, Saint-Leu-d\'Esserent est desservie par nos électriciens qualifiés.',
    priority: 0.7
  },
  
  // Autres communes dans le rayon
  'coudun': {
    slug: 'coudun',
    name: 'Coudun',
    postalCode: '60150',
    department: 'Oise',
    lat: 49.4667,
    lng: 2.8167,
    description: 'Village de l\'Oise, Coudun fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'giraumont': {
    slug: 'giraumont',
    name: 'Giraumont',
    postalCode: '60150',
    department: 'Oise',
    lat: 49.4667,
    lng: 2.8500,
    description: 'Commune de l\'Oise, Giraumont bénéficie de nos services électriques.',
    priority: 0.7
  },
  'cuvilly': {
    slug: 'cuvilly',
    name: 'Cuvilly',
    postalCode: '60490',
    department: 'Oise',
    lat: 49.5500,
    lng: 2.7000,
    description: 'Village de l\'Oise, Cuvilly est desservi par nos électriciens professionnels.',
    priority: 0.7
  },
  'lassigny': {
    slug: 'lassigny',
    name: 'Lassigny',
    postalCode: '60310',
    department: 'Oise',
    lat: 49.5833,
    lng: 2.8333,
    description: 'Commune de l\'Oise, Lassigny fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'ressons-sur-matz': {
    slug: 'ressons-sur-matz',
    name: 'Ressons-sur-Matz',
    postalCode: '60490',
    department: 'Oise',
    lat: 49.5333,
    lng: 2.7500,
    description: 'Village de l\'Oise, Ressons-sur-Matz bénéficie de nos interventions électriques.',
    priority: 0.7,
    meta_title: 'Électricien à Ressons-sur-Matz (60) | SARL RPLB Électricité',
    meta_description:
      'RPLB, électricien à Ressons-sur-Matz (60). Dépannage, rénovation électrique, tableau électrique. Intervention rapide — Devis gratuit ☎ 07 86 17 22 82',
  },
  'elincourt-sainte-marguerite': {
    slug: 'elincourt-sainte-marguerite',
    name: 'Élincourt-Sainte-Marguerite',
    postalCode: '60157',
    department: 'Oise',
    lat: 49.5167,
    lng: 2.8167,
    description: 'Commune de l\'Oise, Élincourt-Sainte-Marguerite est desservie par nos électriciens.',
    priority: 0.7
  },
  'cannectancourt': {
    slug: 'cannectancourt',
    name: 'Cannectancourt',
    postalCode: '60310',
    department: 'Oise',
    lat: 49.5667,
    lng: 2.9000,
    description: 'Village de l\'Oise, Cannectancourt fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'sermaize': {
    slug: 'sermaize',
    name: 'Sermaize',
    postalCode: '60400',
    department: 'Oise',
    lat: 49.6000,
    lng: 2.9500,
    description: 'Commune de l\'Oise, Sermaize bénéficie de nos services électriques.',
    priority: 0.7
  },
  'salency': {
    slug: 'salency',
    name: 'Salency',
    postalCode: '60400',
    department: 'Oise',
    lat: 49.5833,
    lng: 3.0500,
    description: 'Village de l\'Oise, Salency est desservi par nos électriciens qualifiés.',
    priority: 0.7
  },
  'beaurains-les-noyon': {
    slug: 'beaurains-les-noyon',
    name: 'Beaurains-lès-Noyon',
    postalCode: '60400',
    department: 'Oise',
    lat: 49.6167,
    lng: 3.0000,
    description: 'Commune de l\'Oise, Beaurains-lès-Noyon fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'genvry': {
    slug: 'genvry',
    name: 'Genvry',
    postalCode: '60400',
    department: 'Oise',
    lat: 49.6000,
    lng: 3.0167,
    description: 'Village de l\'Oise, Genvry bénéficie de nos interventions électriques.',
    priority: 0.7
  },
  'grandfresnoy': {
    slug: 'grandfresnoy',
    name: 'Grandfresnoy',
    postalCode: '60680',
    department: 'Oise',
    lat: 49.4167,
    lng: 2.7000,
    description: 'Commune de l\'Oise, Grandfresnoy est desservie par nos électriciens professionnels.',
    priority: 0.7
  },
  'hautefontaine': {
    slug: 'hautefontaine',
    name: 'Hautefontaine',
    postalCode: '60350',
    department: 'Oise',
    lat: 49.3500,
    lng: 2.9667,
    description: 'Village de l\'Oise, Hautefontaine fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'tracy-le-mont': {
    slug: 'tracy-le-mont',
    name: 'Tracy-le-Mont',
    postalCode: '60170',
    department: 'Oise',
    lat: 49.4667,
    lng: 2.7833,
    description: 'Village de l\'Oise, Tracy-le-Mont est desservi par nos électriciens qualifiés.',
    priority: 0.7
  },
  'tracy-le-val': {
    slug: 'tracy-le-val',
    name: 'Tracy-le-Val',
    postalCode: '60170',
    department: 'Oise',
    lat: 49.4833,
    lng: 2.7833,
    description: 'Commune de l\'Oise, Tracy-le-Val fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'villers-sur-coudun': {
    slug: 'villers-sur-coudun',
    name: 'Villers-sur-Coudun',
    postalCode: '60150',
    department: 'Oise',
    lat: 49.4833,
    lng: 2.8000,
    description: 'Village de l\'Oise, Villers-sur-Coudun bénéficie de nos interventions électriques.',
    priority: 0.7
  },
  'bailly': {
    slug: 'bailly',
    name: 'Bailly',
    postalCode: '60170',
    department: 'Oise',
    lat: 49.5000,
    lng: 2.9500,
    description: 'Commune de l\'Oise, Bailly est desservie par nos électriciens professionnels.',
    priority: 0.7
  },
  'cambronne-les-ribecourt': {
    slug: 'cambronne-les-ribecourt',
    name: 'Cambronne-lès-Ribecourt',
    postalCode: '60170',
    department: 'Oise',
    lat: 49.5167,
    lng: 2.9000,
    description: 'Village de l\'Oise, Cambronne-lès-Ribecourt fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'carlepont': {
    slug: 'carlepont',
    name: 'Carlepont',
    postalCode: '60170',
    department: 'Oise',
    lat: 49.5167,
    lng: 2.9333,
    description: 'Commune de l\'Oise, Carlepont bénéficie de nos services électriques.',
    priority: 0.7
  },
  'machemont': {
    slug: 'machemont',
    name: 'Machemont',
    postalCode: '60150',
    department: 'Oise',
    lat: 49.5000,
    lng: 2.8667,
    description: 'Village de l\'Oise, Machemont est desservi par nos électriciens qualifiés.',
    priority: 0.7
  },
  'monchy-humieres': {
    slug: 'monchy-humieres',
    name: 'Monchy-Humières',
    postalCode: '60113',
    department: 'Oise',
    lat: 49.4667,
    lng: 2.8333,
    description: 'Commune de l\'Oise, Monchy-Humières fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'pimprez': {
    slug: 'pimprez',
    name: 'Pimprez',
    postalCode: '60150',
    department: 'Oise',
    lat: 49.5167,
    lng: 2.8833,
    description: 'Village de l\'Oise, Pimprez bénéficie de nos interventions électriques.',
    priority: 0.7
  },
  'saint-leger-aux-bois': {
    slug: 'saint-leger-aux-bois',
    name: 'Saint-Léger-aux-Bois',
    postalCode: '60170',
    department: 'Oise',
    lat: 49.4833,
    lng: 2.9500,
    description: 'Commune de l\'Oise, Saint-Léger-aux-Bois est desservie par nos électriciens professionnels.',
    priority: 0.7
  },
  'saint-pierre-es-champs': {
    slug: 'saint-pierre-es-champs',
    name: 'Saint-Pierre-es-Champs',
    postalCode: '60850',
    department: 'Oise',
    lat: 49.4000,
    lng: 2.6333,
    description: 'Village de l\'Oise, Saint-Pierre-es-Champs fait partie de notre zone d\'intervention.',
    priority: 0.7
  },
  'villers-vicomte': {
    slug: 'villers-vicomte',
    name: 'Villers-Vicomte',
    postalCode: '60120',
    department: 'Oise',
    lat: 49.6167,
    lng: 2.8333,
    description: 'Village de l\'Oise, Villers-Vicomte est desservi par nos électriciens qualifiés.',
    priority: 0.7
  }
}

// Fonction pour obtenir toutes les villes
export const getAllCities = (): CityData[] => {
  return Object.values(LOCAL_CITIES)
}

// Fonction pour obtenir une ville par slug
export const getCityBySlug = (slug: string): CityData | undefined => {
  return LOCAL_CITIES[slug]
}

// Fonction pour obtenir les villes par priorité
export const getCitiesByPriority = (minPriority: number = 0): CityData[] => {
  return Object.values(LOCAL_CITIES).filter(city => city.priority >= minPriority)
}

