/**
 * Contenu de la page /mise-aux-normes-electrique.
 *
 * Source unique : lu par `src/pages/MiseAuxNormes.tsx` (rendu React) ET par
 * `scripts/prerender.mjs` (HTML statique servi aux robots). Modifier le texte
 * ici seulement, pour que les deux versions restent identiques.
 *
 * Requête visée : « mise aux normes électrique » (~480 recherches/mois en
 * France, concurrence faible — DataForSEO, août 2026). Aucun tarif ni
 * engagement chiffré : uniquement des faits déjà publiés sur le site
 * (Qualifelec, RGE, décennale, 25 ans, devis gratuit, rayon 30 km) et des
 * généralités réglementaires.
 */

export const MISE_AUX_NORMES_PATH = '/mise-aux-normes-electrique'

export interface Section {
  heading: string
  paragraphs?: string[]
  items?: string[]
}

export const miseAuxNormes = {
  title: "Mise aux normes électrique dans l'Oise (NF C 15-100)",
  description:
    "Mise aux normes électrique dans l'Oise : diagnostic, tableau, différentiels 30 mA, prise de terre. RPLB, électricien certifié Qualifelec et RGE. Devis gratuit.",
  h1: "Mise aux normes électrique dans l'Oise",
  intro:
    "Tableau à fusibles, prises sans terre, disjoncteur qui saute : une installation électrique ancienne n'offre plus le niveau de sécurité attendu aujourd'hui. RPLB Électricité, artisan électricien basé à Longueil-Sainte-Marie, remet votre installation en conformité avec la norme NF C 15-100, de Compiègne à Senlis et dans tout l'Oise.",
  sections: [
    {
      heading: 'Quand faut-il mettre son installation aux normes ?',
      items: [
        "Votre installation a plus de 15 ans : c'est aussi le seuil à partir duquel un diagnostic électricité est obligatoire pour vendre ou louer un logement.",
        "Le diagnostic électricité d'une vente ou d'une location a relevé des anomalies.",
        "Vous rénovez une pièce, une maison entière ou aménagez des combles.",
        "Vous ajoutez un équipement puissant : borne de recharge, pompe à chaleur, climatisation, plaque à induction.",
        "Votre assureur vous le demande, ou après un sinistre (dégât des eaux, surtension, début d'incendie).",
      ],
    },
    {
      heading: 'Les signes qui doivent alerter',
      items: [
        'Un tableau à fusibles à broches ou en porcelaine, sans disjoncteur divisionnaire.',
        'Des prises à deux trous, sans broche de terre.',
        'Un disjoncteur qui saute régulièrement.',
        'Des prises ou des interrupteurs qui chauffent, noircissent ou grésillent.',
        'Des fils gainés de tissu, des conducteurs apparents ou des boîtiers sans couvercle.',
        'Des multiprises branchées en cascade faute de prises en nombre suffisant.',
      ],
    },
    {
      heading: 'Ce que comprend une mise aux normes',
      paragraphs: [
        "La mise en sécurité porte d'abord sur les six points contrôlés lors d'un diagnostic électricité. La mise aux normes complète va plus loin et adapte l'installation à la norme NF C 15-100 en vigueur : nombre de prises et de circuits par pièce, circuits spécialisés pour les gros appareils, règles propres à la salle de bains.",
      ],
      items: [
        "Un appareil général de commande et de protection accessible, pour couper tout le courant d'un geste.",
        'Des dispositifs différentiels 30 mA, qui coupent le courant en cas de fuite vers la terre.',
        "Une prise de terre et des conducteurs de protection reliés à chaque circuit.",
        'Une liaison équipotentielle dans la salle de bains et le respect des volumes autour de la baignoire et de la douche.',
        'Des protections adaptées à la section de chaque câble (disjoncteurs divisionnaires).',
        'Le remplacement des matériels vétustes et la suppression des conducteurs nus accessibles.',
      ],
    },
    {
      heading: 'Comment se déroule une mise aux normes avec RPLB Électricité',
      paragraphs: [
        "Nous commençons par une visite de l'installation : tableau, circuits, prise de terre, pièces d'eau. Vous recevez ensuite un devis gratuit et détaillé, qui distingue ce qui relève de la sécurité immédiate de ce qui peut être programmé plus tard.",
        "Les travaux sont réalisés par nos électriciens, certifiés Qualifelec et RGE et couverts par une assurance décennale, avec plus de 25 ans d'expérience en électricité résidentielle et tertiaire. Pour une installation neuve ou une rénovation complète qui a nécessité de couper le raccordement, une attestation de conformité visée par le Consuel est exigée avant la remise sous tension.",
      ],
    },
  ] as Section[],
  faq: [
    {
      q: 'La mise aux normes électrique est-elle obligatoire ?',
      a: "Aucune loi n'impose de refaire une installation existante à chaque évolution de la norme. En revanche, une installation neuve ou entièrement rénovée doit respecter la norme NF C 15-100, et un diagnostic électricité est obligatoire pour vendre ou louer un logement dont l'installation a plus de 15 ans. Dans tous les cas, la mise en sécurité reste la priorité.",
    },
    {
      q: 'Quelle différence entre mise en sécurité et mise aux normes ?',
      a: "La mise en sécurité corrige les défauts dangereux : absence de différentiel 30 mA, de prise de terre, matériel vétuste. La mise aux normes adapte en plus l'installation à la norme NF C 15-100 actuelle : nombre de prises, circuits spécialisés, règles de la salle de bains.",
    },
    {
      q: "Combien coûte une mise aux normes électrique ?",
      a: "Le prix dépend de la surface, de l'état de l'installation et des travaux à prévoir : un simple remplacement de tableau n'a rien à voir avec une rénovation complète. Nous établissons un devis gratuit et détaillé après visite.",
    },
    {
      q: 'Intervenez-vous près de chez moi ?',
      a: "RPLB Électricité intervient dans un rayon de 30 km autour de Longueil-Sainte-Marie : Compiègne, Creil, Senlis, Noyon, Crépy-en-Valois, Pont-Sainte-Maxence, Montataire, Thourotte et les communes voisines, du lundi au vendredi de 8h à 18h.",
    },
  ],
}
