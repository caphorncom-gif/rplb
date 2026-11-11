/**
 * Contenu éditorial des fiches /services/<slug> : ce que couvre la prestation,
 * son déroulé, les cas fréquents, la zone et une FAQ propre à chaque service.
 *
 * Source unique : lu par `src/pages/ServiceDetail.tsx` (rendu React) ET par
 * `scripts/prerender.mjs` (HTML statique servi aux robots, y compris ceux des
 * IA qui n'exécutent pas le JavaScript). Modifier le texte ici seulement, pour
 * que les deux versions restent identiques.
 *
 * Le titre, la description courte, le tarif et l'image restent dans la table
 * Supabase `services` ; ce fichier les complète, clé = `slug` du service.
 *
 * RÈGLE DE RÉDACTION : aucun fait inventé. Ne figurent ici que
 *  - des faits déjà publiés ailleurs sur le site (devis gratuit, réponse sous
 *    48 h ouvrées, lundi-vendredi 8h-18h, rayon de 30 km autour de
 *    Longueil-Sainte-Marie, norme NF C 15-100, assurance décennale, marques
 *    citées à l'accueil, chantier nettoyé, point d'avancement quotidien) ;
 *  - des généralités techniques ou réglementaires vérifiables.
 * Pas de prix, pas de délai d'intervention, pas de certification ni de
 * garantie nouvelle : tout ajout de ce type doit d'abord être confirmé par
 * RPLB (voir la liste « à confirmer » de la PR qui a créé ce fichier).
 */
import type { Section } from './miseAuxNormes'

export interface ServiceFaqItem {
  q: string
  a: string
}

export interface ServiceLink {
  path: string
  label: string
}

export interface ServiceContent {
  sections: Section[]
  faq: ServiceFaqItem[]
  /** Liens internes « Pour aller plus loin » (pages et articles existants). */
  links?: ServiceLink[]
}

/** Textes fixes de la fiche, communs à tous les services. */
export const serviceDetailLabels = {
  subtitle: 'Service pour particuliers et professionnels',
  pricePrefix: 'Tarif :',
  featuresHeading: 'Nos prestations',
  linksHeading: 'Pour aller plus loin',
  faqHeading: 'Questions fréquentes',
  ctaHeading: 'Intéressé par ce service ?',
  ctaText: 'Demandez un devis gratuit et sans engagement',
  ctaButton: 'Demander un devis',
}

/** Libellé du tarif tel qu'il est saisi en base (« Sur devis », « À partir de 60€ »). */
export const servicePriceLabel = (priceInfo?: string | null): string =>
  priceInfo ? `${serviceDetailLabels.pricePrefix} ${priceInfo}` : ''

/**
 * FAQ de repli pour un service ajouté en base sans contenu dédié ici : deux
 * questions dont les réponses sont vraies pour toutes les prestations.
 */
export const defaultServiceFaq: ServiceFaqItem[] = [
  {
    q: 'Le devis est-il gratuit ?',
    a: 'Oui, nos devis sont gratuits, détaillés et sans engagement. Nous répondons sous 48 h ouvrées.',
  },
  {
    q: 'Dans quel secteur intervenez-vous ?',
    a: "Nous intervenons dans un rayon de 30 km autour de Longueil-Sainte-Marie, dans l'Oise : Compiègne, Creil, Senlis, Noyon, Crépy-en-Valois, Pont-Sainte-Maxence et les communes voisines, du lundi au vendredi de 8h à 18h.",
  },
]

export const SERVICES_CONTENT: Record<string, ServiceContent> = {
  // ---------------------------------------------------------------------------
  'depannage-electrique': {
    sections: [
      {
        heading: 'Les pannes pour lesquelles on nous appelle le plus',
        items: [
          'Une coupure générale, alors que les voisins ont toujours du courant.',
          'Un disjoncteur ou un interrupteur différentiel qui saute, tout de suite ou au bout de quelques heures.',
          'Une prise ou un interrupteur qui ne fonctionne plus, qui chauffe, noircit ou grésille.',
          "Une odeur de brûlé près d'une prise ou du tableau électrique.",
          "Un circuit entier hors service : l'éclairage d'un étage, les prises de la cuisine, le chauffe-eau.",
          'Un tableau électrique ancien dont un élément ne tient plus.',
        ],
      },
      {
        heading: 'Comment se déroule un dépannage',
        paragraphs: [
          "Au téléphone, nous vous demandons ce que vous constatez : ce qui ne fonctionne plus, ce qui a sauté au tableau, depuis quand. Cela suffit souvent à savoir si la panne vient de votre installation ou du réseau. Si tout le quartier est coupé et que votre disjoncteur général est resté enclenché, c'est Enedis qu'il faut appeler, pas un électricien.",
          "Sur place, nous recherchons l'origine du défaut : appareil en cause, circuit surchargé, fuite de courant vers la terre, connexion desserrée ou matériel usé. Nous remettons l'installation en sécurité, puis nous réparons ou remplaçons l'élément défectueux.",
          "Quand la panne révèle un problème plus large, par exemple un tableau vétuste ou l'absence de protection différentielle, nous vous l'expliquons et vous remettons un devis gratuit et sans engagement pour la suite.",
        ],
      },
      {
        heading: "En attendant l'électricien",
        items: [
          "Cessez d'utiliser l'installation ou l'appareil concerné.",
          'Si vous le pouvez sans risque, coupez le disjoncteur général.',
          'Ne touchez ni aux fils apparents ni au matériel endommagé.',
          "En cas de fumée ou de début d'incendie, sortez et appelez les pompiers au 18 ou au 112.",
        ],
      },
      {
        heading: 'Où et quand nous intervenons',
        paragraphs: [
          'Basés à Longueil-Sainte-Marie, nous dépannons les particuliers et les professionnels dans un rayon de 30 km : Compiègne, Creil, Senlis, Noyon, Crépy-en-Valois, Pont-Sainte-Maxence et les communes voisines, du lundi au vendredi de 8h à 18h.',
        ],
      },
    ],
    faq: [
      {
        q: 'Mon disjoncteur saute dès que je le réenclenche, que faire ?',
        a: "Ne le forcez pas. Débranchez les appareils du circuit concerné, puis réenclenchez. S'il tient, rebranchez les appareils un par un pour trouver celui qui provoque la coupure. S'il saute encore sans rien de branché, le défaut vient de l'installation elle-même : il faut un électricien.",
      },
      {
        q: 'Comment savoir si la panne vient de chez moi ou du réseau ?',
        a: "Regardez votre disjoncteur général et demandez à un voisin. S'il est resté enclenché et que le voisinage est aussi privé de courant, la coupure vient du réseau : dans l'Oise, le dépannage d'Enedis est joignable 24 h/24 au 09 72 67 50 60. Si vous êtes seul concerné, ou si une protection a sauté au tableau, la panne vient de votre installation.",
      },
      {
        q: 'Combien coûte un dépannage électrique ?',
        a: "Le prix dépend de la panne : le temps de recherche et la pièce à remplacer ne sont pas les mêmes pour une prise défectueuse et pour un défaut d'isolement. Pour toute réparation qui dépasse le simple dépannage, nous établissons un devis gratuit et détaillé, sans surprise.",
      },
      {
        q: 'Intervenez-vous le soir ou le week-end ?',
        a: "Nos interventions ont lieu du lundi au vendredi, de 8h à 18h. En dehors de ces horaires, si la situation présente un danger (odeur de brûlé, étincelles, fumée), coupez le disjoncteur général et, en cas de début d'incendie, appelez les pompiers.",
      },
    ],
    links: [
      { path: '/urgence', label: "Dépannage électrique urgent dans l'Oise" },
      {
        path: '/blog/disjoncteur-qui-saute-causes-solutions',
        label: 'Disjoncteur qui saute : les causes et quand appeler un électricien',
      },
      { path: '/mise-aux-normes-electrique', label: 'Mise aux normes électrique' },
    ],
  },

  // ---------------------------------------------------------------------------
  'installation-electrique-neuve': {
    sections: [
      {
        heading: 'Ce que comprend une installation neuve',
        paragraphs: [
          "Dans une construction neuve, une extension ou un local professionnel, l'installation électrique se conçoit avant de se poser. Nous partons de vos plans et de vos usages pour dimensionner l'ensemble, dans le respect de la norme NF C 15-100.",
        ],
        items: [
          'Le tableau électrique : disjoncteurs divisionnaires, interrupteurs différentiels 30 mA, place en réserve pour de futurs circuits.',
          'Les circuits spécialisés des gros appareils : plaques de cuisson, four, lave-linge, lave-vaisselle, chauffe-eau.',
          "Les prises, les interrupteurs et les points d'éclairage, pièce par pièce.",
          'Le chauffage électrique et sa régulation.',
          'La prise de terre et les liaisons équipotentielles, notamment dans la salle de bains.',
          'Le réseau de communication : prises RJ45 et coffret de communication.',
          'Les attentes pour les équipements à venir : borne de recharge, volets roulants, climatisation, portail.',
        ],
      },
      {
        heading: 'Comment se déroule le chantier',
        paragraphs: [
          "Tout commence par un échange sur plans : emplacement des prises et des commandes, éclairage, équipements prévus. Vous recevez ensuite un devis gratuit et détaillé. Ceux qui établissent le devis sont ceux qui réalisent le chantier.",
          "Sur place, le travail se fait en deux temps. D'abord le passage des gaines et la pose des boîtiers, avant la fermeture des cloisons et des plafonds. Ensuite, une fois les finitions faites, la pose de l'appareillage, le raccordement du tableau et les essais de chaque circuit.",
          "Une installation neuve doit obtenir une attestation de conformité visée par le Consuel avant sa mise sous tension : elle est réalisée pour satisfaire à ce contrôle.",
        ],
      },
      {
        heading: 'Pour quels projets ?',
        items: [
          'Une maison individuelle en construction.',
          'Une extension, une surélévation, des combles ou un garage aménagés.',
          'Une dépendance, un atelier ou un abri de jardin à alimenter.',
          'Un commerce, un bureau ou un local professionnel.',
        ],
      },
      {
        heading: "Installation électrique neuve dans l'Oise",
        paragraphs: [
          'RPLB Électricité réalise des installations neuves pour les particuliers et les professionnels dans un rayon de 30 km autour de Longueil-Sainte-Marie, de Compiègne à Senlis, Creil, Noyon et Crépy-en-Valois. Nos installations sont couvertes par une assurance décennale.',
        ],
      },
    ],
    faq: [
      {
        q: "À quel moment faire intervenir l'électricien dans une construction ?",
        a: "Le plus tôt possible : l'emplacement des prises, des commandes et de l'éclairage se décide sur plans, avant le début des travaux. Sur le chantier, les gaines se passent avant la fermeture des cloisons et des plafonds, puis l'appareillage est posé après les finitions.",
      },
      {
        q: "Qu'est-ce que l'attestation Consuel ?",
        a: "C'est le document qui atteste que l'installation électrique respecte les règles de sécurité en vigueur. Elle est exigée pour la mise sous tension d'une installation neuve. Le Consuel peut contrôler l'installation sur place avant de viser l'attestation.",
      },
      {
        q: 'Combien de prises et de circuits faut-il prévoir ?',
        a: "La norme NF C 15-100 fixe un minimum par pièce et impose des circuits dédiés pour les gros appareils. Au-delà de ce minimum, tout dépend de vos usages : bureau, cuisine équipée, atelier. Nous le définissons avec vous sur plans, en gardant de la place dans le tableau pour les besoins futurs.",
      },
      {
        q: 'Le devis est-il gratuit ?',
        a: 'Oui. Le devis est gratuit et détaillé, établi à partir de vos plans. Nous répondons sous 48 h ouvrées.',
      },
    ],
    links: [
      {
        path: '/blog/installation-electrique-normes-nf-c-15-100',
        label: 'Installation électrique : les normes NF C 15-100 à connaître',
      },
      { path: '/services/borne-recharge-vehicule-electrique', label: 'Borne de recharge pour véhicule électrique' },
      { path: '/services/domotique', label: 'Domotique et maison connectée' },
    ],
  },

  // ---------------------------------------------------------------------------
  'renovation-electrique': {
    sections: [
      {
        heading: 'Rénovation partielle ou complète : ce que nous faisons',
        paragraphs: [
          "Rénover l'électricité ne veut pas toujours dire tout refaire. Selon l'état de l'installation et votre projet, nous intervenons sur une partie ou sur l'ensemble.",
        ],
        items: [
          'Le remplacement du tableau électrique : disjoncteurs divisionnaires et interrupteurs différentiels 30 mA à la place des anciens fusibles.',
          'La création ou la reprise de la prise de terre, et le raccordement des circuits à la terre.',
          "L'ajout de prises et de circuits, pour en finir avec les multiprises en cascade.",
          "Les circuits spécialisés d'une cuisine refaite : plaques, four, lave-vaisselle.",
          'La remise en conformité de la salle de bains.',
          "Le remplacement des câbles et de l'appareillage vétustes, en encastré ou en apparent selon les murs.",
          "La reprise de l'éclairage : nouveaux points lumineux, commandes mieux placées.",
        ],
      },
      {
        heading: 'Comment se déroule une rénovation',
        paragraphs: [
          "Nous commençons par une visite : tableau, circuits, prise de terre, pièces d'eau. Elle permet de distinguer ce qui relève de la sécurité, à traiter en premier, de ce qui relève du confort. Vous recevez ensuite un devis gratuit et détaillé.",
          "Pendant les travaux, nous nettoyons le chantier au fur et à mesure et, sur les chantiers longs, nous faisons un point d'avancement chaque jour. Ceux qui ont établi le devis sont ceux qui réalisent les travaux.",
          "Quand la rénovation est complète et qu'elle a nécessité de couper le raccordement, une attestation de conformité visée par le Consuel est exigée avant la remise sous tension.",
        ],
      },
      {
        heading: 'Les situations les plus fréquentes',
        items: [
          "L'achat d'une maison ancienne dont l'électricité n'a jamais été refaite.",
          'Un diagnostic électricité défavorable avant une vente ou une location.',
          "La rénovation d'une cuisine ou d'une salle de bains.",
          "L'aménagement de combles ou d'une extension.",
          'Un tableau à fusibles, des prises sans terre, un disjoncteur qui saute régulièrement.',
        ],
      },
      {
        heading: "Rénovation électrique dans l'Oise",
        paragraphs: [
          'Nous rénovons les installations des maisons, des appartements et des locaux professionnels dans un rayon de 30 km autour de Longueil-Sainte-Marie : Compiègne, Senlis, Creil, Noyon, Crépy-en-Valois, Pont-Sainte-Maxence. Les travaux sont conformes à la norme NF C 15-100 et couverts par notre assurance décennale.',
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il refaire toute l'installation ?",
        a: "Pas forcément. Si les câbles sont en bon état, le remplacement du tableau et l'ajout de la terre et de protections différentielles suffisent parfois à remettre l'installation en sécurité. Quand les conducteurs sont anciens ou sous-dimensionnés, une réfection complète est plus sûre. La visite permet de trancher.",
      },
      {
        q: 'Peut-on rénover sans casser les murs ?',
        a: "En partie. On peut réutiliser les gaines existantes quand elles sont en bon état, passer par les combles ou les plinthes, ou poser en apparent sous moulures. L'encastré demande des saignées, donc des reprises de plâtre et de peinture.",
      },
      {
        q: 'Quelle différence entre rénovation et mise aux normes ?',
        a: "La mise en sécurité corrige les défauts dangereux ; la mise aux normes adapte l'installation à la norme NF C 15-100 actuelle. Une rénovation peut aller plus loin et repenser l'installation selon vos usages : nouvelle cuisine, bureau, domotique.",
      },
      {
        q: 'Combien coûte une rénovation électrique ?',
        a: "Le prix dépend de la surface, de l'état de l'existant et du type de pose (encastrée ou apparente). C'est pourquoi nous établissons un devis gratuit et détaillé après visite.",
      },
    ],
    links: [
      { path: '/mise-aux-normes-electrique', label: "Mise aux normes électrique dans l'Oise" },
      {
        path: '/blog/renovation-electrique-maison-ancienne-guide',
        label: "Rénovation électrique d'une maison ancienne : le guide",
      },
      { path: '/services/depannage-electrique', label: 'Dépannage électrique' },
    ],
  },

  // ---------------------------------------------------------------------------
  domotique: {
    sections: [
      {
        heading: 'Ce que la domotique permet de piloter',
        paragraphs: [
          'Depuis un interrupteur, une télécommande ou votre smartphone, chez vous comme à distance, la domotique permet de commander :',
        ],
        items: [
          "L'éclairage : allumage, extinction et variation, par pièce ou par scénario.",
          'Les volets roulants et les stores : ouverture programmée, fermeture centralisée en partant.',
          'Le chauffage : thermostat connecté et programmation pièce par pièce.',
          "La consommation d'énergie : suivi des usages et délestage des appareils les plus gourmands.",
          'Les accès et la sécurité : portail, alarme, caméras.',
        ],
      },
      {
        heading: 'Neuf ou rénovation : deux façons de faire',
        paragraphs: [
          "Dans une construction neuve ou une rénovation complète, la domotique se prévoit dès le câblage : elle s'intègre au tableau électrique et aux circuits.",
          "Dans un logement existant, des modules radio se placent derrière les interrupteurs ou dans le tableau, sans refaire les murs. On peut commencer par une pièce ou par une fonction, les volets par exemple, et compléter plus tard.",
        ],
      },
      {
        heading: "Comment se déroule l'installation",
        paragraphs: [
          "Nous partons de vos habitudes plutôt que d'un catalogue : ce que vous voulez automatiser, ce que vous préférez garder manuel. Nous vous proposons ensuite une solution et un devis gratuit et détaillé. Viennent enfin la pose, puis le paramétrage des commandes et des scénarios.",
          'Nous installons du matériel de grandes marques, parmi lesquelles Somfy, Legrand, Schneider Electric et Hager.',
        ],
      },
      {
        heading: "Domotique dans l'Oise",
        paragraphs: [
          'RPLB Électricité installe des solutions domotiques chez les particuliers et les professionnels dans un rayon de 30 km autour de Longueil-Sainte-Marie : Compiègne, Senlis, Creil, Noyon, Crépy-en-Valois et les communes voisines.',
        ],
      },
    ],
    faq: [
      {
        q: 'Peut-on installer de la domotique dans une maison ancienne ?',
        a: "Oui. Les modules radio évitent de tirer de nouveaux câbles : ils se placent derrière les interrupteurs existants ou dans le tableau. Il faut seulement que l'installation électrique soit saine ; si ce n'est pas le cas, nous vous le signalons avant.",
      },
      {
        q: 'La domotique fonctionne-t-elle sans Internet ?',
        a: "Les commandes locales (interrupteurs, télécommandes, scénarios programmés) continuent en général de fonctionner sans connexion. Internet est nécessaire pour le pilotage à distance depuis un smartphone. Cela varie selon le matériel : nous vous le précisons au moment du choix.",
      },
      {
        q: 'Par quoi commencer ?',
        a: 'Souvent par les volets roulants ou le chauffage, dont on se sert tous les jours. Une installation domotique peut ensuite s\'étendre par étapes : éclairage, portail, alarme.',
      },
      {
        q: 'La domotique fait-elle baisser la facture ?',
        a: "Elle aide à mieux régler le chauffage et à repérer les appareils qui consomment le plus. L'économie réelle dépend du logement et des habitudes : nous ne promettons pas de pourcentage.",
      },
    ],
    links: [
      {
        path: '/blog/domotique-maison-intelligente-avantages',
        label: 'Domotique et maison intelligente : avantages et installation',
      },
      { path: '/services/alarme-videosurveillance', label: 'Alarme et vidéosurveillance' },
      { path: '/services/installation-electrique-neuve', label: 'Installation électrique neuve' },
    ],
  },

  // ---------------------------------------------------------------------------
  climatisation: {
    sections: [
      {
        heading: 'Ce que comprend la prestation',
        paragraphs: [
          "Une climatisation réversible rafraîchit en été et chauffe en hiver : c'est une pompe à chaleur air-air.",
        ],
        items: [
          'Le choix du système : un appareil pour une seule pièce (monosplit) ou plusieurs unités intérieures reliées à un même groupe extérieur (multisplit).',
          "Le dimensionnement selon la surface, l'isolation et l'exposition des pièces.",
          "La pose des unités intérieures et du groupe extérieur, les liaisons et l'évacuation des condensats.",
          "L'alimentation électrique : un circuit dédié depuis le tableau, avec sa protection.",
          'La mise en service et les réglages.',
          "L'entretien et le dépannage des systèmes existants.",
        ],
      },
      {
        heading: "Comment se déroule l'installation",
        paragraphs: [
          "Nous venons voir les pièces à équiper : surface, orientation, emplacement possible du groupe extérieur, passage des liaisons, état du tableau électrique. Vous recevez ensuite un devis gratuit et détaillé.",
          "L'emplacement des appareils se décide avec vous. L'unité intérieure doit souffler sans gêner ; le groupe extérieur doit rester accessible pour l'entretien et ne pas déranger le voisinage.",
        ],
      },
      {
        heading: 'Les demandes les plus fréquentes',
        items: [
          'Rafraîchir des chambres sous les toits ou une pièce de vie exposée au sud.',
          'Chauffer et rafraîchir une extension, une véranda ou un bureau.',
          'Climatiser un commerce ou un local professionnel.',
          'Faire entretenir ou dépanner une climatisation déjà en place.',
        ],
      },
      {
        heading: "Climatisation réversible dans l'Oise",
        paragraphs: [
          'RPLB Électricité installe et entretient des climatisations réversibles pour les particuliers et les professionnels dans un rayon de 30 km autour de Longueil-Sainte-Marie : Compiègne, Senlis, Creil, Noyon, Crépy-en-Valois, Pont-Sainte-Maxence et les communes voisines.',
        ],
      },
    ],
    faq: [
      {
        q: 'Une climatisation réversible peut-elle remplacer le chauffage ?',
        a: "Elle chauffe bien en mi-saison et peut assurer le chauffage principal dans un logement bien isolé. Dans une maison ancienne peu isolée, elle vient plutôt en complément. Nous regardons cela pièce par pièce lors de la visite.",
      },
      {
        q: 'Monosplit ou multisplit ?',
        a: "Un monosplit équipe une seule pièce, avec une unité intérieure et un groupe extérieur. Un multisplit relie plusieurs unités intérieures à un seul groupe extérieur : c'est utile pour équiper plusieurs pièces sans multiplier les appareils en façade.",
      },
      {
        q: 'Faut-il une autorisation pour poser le groupe extérieur ?',
        a: "En copropriété, la pose d'un groupe extérieur en façade demande l'accord de la copropriété. En maison, une déclaration préalable en mairie peut être nécessaire, selon la commune et l'emplacement. Mieux vaut se renseigner avant de lancer le projet.",
      },
      {
        q: 'À quelle fréquence faut-il entretenir une climatisation ?',
        a: "Les filtres des unités intérieures se nettoient régulièrement, par vos soins. Pour les appareils d'une puissance comprise entre 4 et 70 kW, un entretien par un professionnel est obligatoire tous les deux ans.",
      },
    ],
    links: [
      { path: '/mise-aux-normes-electrique', label: 'Mise aux normes électrique' },
      { path: '/services/domotique', label: 'Domotique et thermostat connecté' },
    ],
  },

  // ---------------------------------------------------------------------------
  'alarme-videosurveillance': {
    sections: [
      {
        heading: 'Ce que nous installons',
        items: [
          "Une centrale d'alarme connectée et ses sirènes.",
          "Des détecteurs d'ouverture sur les portes et les fenêtres, des détecteurs de mouvement dans les pièces de passage.",
          'Des caméras IP, intérieures ou extérieures.',
          'La consultation à distance : alertes et images sur votre smartphone.',
          "Le câblage et l'alimentation des équipements, en filaire ou en radio selon le bâtiment.",
        ],
      },
      {
        heading: "Comment se déroule l'installation",
        paragraphs: [
          "Nous faisons d'abord le tour des lieux avec vous : accès à protéger, pièces sensibles, habitudes de la maison (animaux, horaires, personnes à prévenir). Nous vous proposons ensuite un système adapté et un devis gratuit et détaillé.",
          "Viennent ensuite la pose, puis le paramétrage du système et de l'application : codes, zones, notifications. En tant qu'électriciens, nous prenons aussi en charge l'alimentation et le câblage des équipements.",
        ],
      },
      {
        heading: 'Pour quels lieux ?',
        items: [
          'Une maison ou un appartement, en résidence principale ou secondaire.',
          'Un garage, un atelier ou une dépendance.',
          'Un commerce, un bureau, un entrepôt ou un local professionnel.',
        ],
      },
      {
        heading: 'Ce que dit la réglementation',
        paragraphs: [
          "Chez un particulier, les caméras ne doivent filmer que la propriété : ni la voie publique, ni le terrain du voisin. Dans un commerce ou des locaux professionnels, les personnes filmées doivent être informées par un panneau, et les lieux ouverts au public sont soumis à une autorisation préfectorale. Nous en tenons compte au moment de choisir l'emplacement des caméras.",
        ],
      },
      {
        heading: "Alarme et vidéosurveillance dans l'Oise",
        paragraphs: [
          'RPLB Électricité installe des alarmes et des systèmes de vidéosurveillance dans un rayon de 30 km autour de Longueil-Sainte-Marie : Compiègne, Senlis, Creil, Noyon, Crépy-en-Valois, Pont-Sainte-Maxence et les communes voisines.',
        ],
      },
    ],
    faq: [
      {
        q: 'Alarme filaire ou sans fil ?',
        a: "Le sans-fil (radio) se pose sans travaux dans un logement existant. Le filaire demande de passer des câbles : il se prévoit plutôt dans le neuf ou lors d'une rénovation. Les deux peuvent se combiner.",
      },
      {
        q: 'Ai-je le droit de filmer devant chez moi ?',
        a: 'Vous pouvez filmer votre propriété : jardin, allée, entrée. En revanche, une caméra privée ne doit filmer ni la rue ni la propriété voisine. Nous orientons les caméras en conséquence.',
      },
      {
        q: 'Peut-on voir les images à distance ?',
        a: 'Oui. Les systèmes connectés envoient les alertes et les images sur votre smartphone, à condition que le lieu dispose d\'une connexion Internet.',
      },
      {
        q: "L'alarme fonctionne-t-elle pendant une coupure de courant ?",
        a: "Les centrales sont en général équipées d'une batterie de secours qui prend le relais pendant une coupure. L'autonomie dépend du matériel : nous vous l'indiquons au moment du choix.",
      },
    ],
    links: [
      { path: '/services/domotique', label: 'Domotique et maison connectée' },
      { path: '/services/depannage-electrique', label: 'Dépannage électrique' },
    ],
  },

  // ---------------------------------------------------------------------------
  'borne-recharge-vehicule-electrique': {
    sections: [
      {
        heading: "Ce que comprend l'installation d'une borne",
        paragraphs: [
          "Recharger une voiture électrique sur une prise ordinaire sollicite l'installation pendant des heures. Une borne murale (wallbox) ou une prise renforcée, sur un circuit dédié, permet de recharger plus vite et en sécurité.",
        ],
        items: [
          "La vérification de votre installation : puissance de l'abonnement, tableau électrique, prise de terre.",
          'Le choix de la solution : prise renforcée ou borne murale, en monophasé ou en triphasé.',
          "La création d'un circuit dédié depuis le tableau, avec sa protection différentielle.",
          'La pose de la borne dans le garage, sous un abri ou en extérieur.',
          'Le réglage de la recharge : heures creuses, limitation de puissance pour ne pas faire disjoncter la maison.',
          'La mise en service et les essais.',
        ],
      },
      {
        heading: "Comment se déroule l'installation",
        paragraphs: [
          "Nous regardons d'abord où vous garez le véhicule, la distance jusqu'au tableau et la puissance disponible. Si l'abonnement ou le tableau ne suffisent pas, nous vous le disons avant : une borne ne se pose pas sur une installation fragile. Vous recevez ensuite un devis gratuit et détaillé.",
          'Les bornes que nous posons sont compatibles avec toutes les marques de véhicules.',
        ],
      },
      {
        heading: 'Pour quels usages ?',
        items: [
          "En maison individuelle : dans le garage, sous un carport ou en façade, près de la place où dort la voiture.",
          "En entreprise : pour les véhicules de la société ou ceux des salariés.",
          'Pour un véhicule 100 % électrique comme pour un hybride rechargeable.',
        ],
      },
      {
        heading: 'Les aides',
        paragraphs: [
          "Les aides à l'installation d'une borne changent régulièrement et dépendent du logement et du matériel. Nous faisons le point avec vous, au moment du devis, sur celles auxquelles votre projet peut prétendre.",
        ],
      },
      {
        heading: "Borne de recharge dans l'Oise",
        paragraphs: [
          'RPLB Électricité installe des bornes de recharge chez les particuliers et les professionnels dans un rayon de 30 km autour de Longueil-Sainte-Marie : Compiègne, Senlis, Creil, Noyon, Crépy-en-Valois, Pont-Sainte-Maxence et les communes voisines.',
        ],
      },
    ],
    faq: [
      {
        q: 'Prise renforcée ou borne murale ?',
        a: "Une prise renforcée convient à un petit kilométrage quotidien ou à un véhicule hybride rechargeable. Une borne murale recharge plus vite et permet de programmer et de piloter la recharge. Le choix dépend du véhicule et de l'usage.",
      },
      {
        q: 'Mon installation électrique est-elle suffisante ?',
        a: "Cela dépend de la puissance de votre abonnement et de l'état du tableau. Une borne de 7,4 kW en monophasé demande de la marge sur l'abonnement, ou un dispositif qui réduit la recharge quand la maison consomme beaucoup. Nous le vérifions avant de vous proposer une solution.",
      },
      {
        q: 'Faut-il passer en triphasé ?',
        a: "Pas dans la plupart des cas : une borne monophasée de 7,4 kW suffit le plus souvent pour une recharge de nuit. Le triphasé (11 ou 22 kW) ne se justifie que si votre véhicule l'accepte et que votre usage le demande.",
      },
      {
        q: 'Existe-t-il des aides pour installer une borne ?',
        a: "Oui, mais elles évoluent régulièrement et dépendent du type de logement et de l'installation. Nous faisons le point sur les aides en vigueur au moment du devis.",
      },
    ],
    links: [
      {
        path: '/blog/borne-recharge-vehicule-electrique-installation',
        label: 'Borne de recharge pour véhicule électrique : installation et subventions',
      },
      { path: '/mise-aux-normes-electrique', label: 'Mise aux normes électrique' },
    ],
  },
}

/** Contenu d'un service ; sections vides et FAQ de repli si le slug n'a pas de contenu dédié. */
export const getServiceContent = (slug: string): ServiceContent =>
  SERVICES_CONTENT[slug] ?? { sections: [], faq: defaultServiceFaq }
