/**
 * Registre des sites clients pour le rapport mensuel (rapport-mensuel.mjs).
 *
 * Copier ce fichier en `scripts/clients.config.mjs` (gitignoré, car il contient
 * les emails clients) et compléter. Ajouter un site = une entrée ci-dessous,
 * aucune ligne de code à écrire.
 */

export const CLIENTS = [
  {
    id: 'rplb',
    brand: 'RPLB Électricité',
    // GA4 : ID de propriété (chiffres seuls). Voir ga4-report.mjs.
    ga4PropertyId: '470461392',
    // Search Console : propriété (souvent sc-domain:<domaine>).
    gscDomain: 'sc-domain:rplb-electricite.fr',
    siteUrl: 'https://www.rplb-electricite.fr',
    // Destinataire FINAL (client) — envoi manuel après ta validation.
    clientEmail: 'client@example.com',
    clientName: 'Prénom(s) du client',
  },
  // {
  //   id: 'cap-horn', brand: 'Cap Horn Communications',
  //   ga4PropertyId: '…', gscDomain: 'sc-domain:caphorncom.fr',
  //   siteUrl: 'https://www.caphorncom.fr',
  //   clientEmail: '…', clientName: '…',
  // },
]

/**
 * Où arrive le BROUILLON à valider : toi. Rien n'est jamais envoyé
 * automatiquement au client (mode « brouillon à valider d'abord »).
 */
export const VALIDATION = {
  from: 'Cap Horn Communications <rapport@caphorncom.fr>',
  recipient: 'toi@example.com',
}
