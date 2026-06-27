import { SEO } from '../components/SEO'
import { ContactCTA } from '../components/ContactCTA'

export const MentionsLegales = () => {
  const companyName = 'RPLB Électricité'
  const email = 'rplb.electricite@gmail.com'
  const address = 'Longueil-Sainte-Marie, 60126'
  const phone = import.meta.env.VITE_CONTACT_PHONE || '03 XX XX XX XX'
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.rplb-electricite.fr'

  return (
    <>
      <SEO
        title="Mentions Légales & RGPD - RPLB Électricité"
        description="Mentions légales, politique de confidentialité et RGPD de RPLB Électricité. Informations sur la collecte et le traitement des données personnelles."
        keywords="mentions légales, RGPD, confidentialité, protection des données, RPLB Électricité"
      />

      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mentions Légales & RGPD
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Informations légales et protection des données personnelles
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-12 text-gray-700">
            
            {/* 1. Identification de l'entreprise */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">1. Identification de l'Entreprise</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Dénomination sociale :</strong> {companyName}</p>
                <p className="mb-2"><strong>Forme juridique :</strong> Entreprise individuelle / SARL</p>
                <p className="mb-2"><strong>Adresse :</strong> {address}</p>
                <p className="mb-2"><strong>Téléphone :</strong> {phone}</p>
                <p className="mb-2"><strong>Email :</strong> {email}</p>
                <p className="mb-2"><strong>Directeur de la publication :</strong> Romain Pagnier et Ludovic Bozo</p>
                <p className="mb-2"><strong>Hébergeur du site :</strong> OVH</p>
              </div>
            </div>

            {/* 2. Protection des données personnelles (RGPD) */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">2. Protection des Données Personnelles (RGPD)</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">2.1. Responsable du traitement</h3>
              <p className="mb-4">
                {companyName}, située à {address}, est responsable du traitement des données personnelles collectées sur ce site.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">2.2. Données collectées</h3>
              <p className="mb-4">Nous collectons les données personnelles suivantes :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Données d'identification :</strong> nom, prénom</li>
                <li><strong>Données de contact :</strong> adresse email, numéro de téléphone, adresse postale</li>
                <li><strong>Données de navigation :</strong> adresse IP, cookies, données de connexion</li>
                <li><strong>Données relatives à votre demande :</strong> type de service demandé, message, informations sur votre projet</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">2.3. Finalités du traitement</h3>
              <p className="mb-4">Vos données personnelles sont traitées pour les finalités suivantes :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Traitement de vos demandes de devis et de contact</li>
                <li>Réponse à vos questions et sollicitations</li>
                <li>Gestion de la relation client</li>
                <li>Amélioration de nos services et de notre site web</li>
                <li>Respect de nos obligations légales et réglementaires</li>
                <li>Établissement de statistiques de fréquentation du site (données anonymisées)</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">2.4. Base légale du traitement</h3>
              <p className="mb-4">
                Le traitement de vos données personnelles est basé sur :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Votre consentement</strong> : lorsque vous nous contactez via le formulaire</li>
                <li><strong>L'exécution d'un contrat</strong> : pour la réalisation des devis et prestations</li>
                <li><strong>Notre intérêt légitime</strong> : pour l'amélioration de nos services et la gestion de la relation client</li>
                <li><strong>Le respect d'une obligation légale</strong> : pour la conservation des données comptables et fiscales</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">2.5. Durée de conservation</h3>
              <p className="mb-4">Vos données personnelles sont conservées :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Données de contact :</strong> 3 ans à compter du dernier contact</li>
                <li><strong>Données clients :</strong> Durée de la relation contractuelle + 10 ans (obligations comptables)</li>
                <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                <li><strong>Cookies :</strong> 13 mois maximum</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">2.6. Destinataires des données</h3>
              <p className="mb-4">Vos données personnelles peuvent être transmises à :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Notre équipe interne autorisée</li>
                <li>Nos prestataires techniques (hébergeur, développeur web) sous contrat de confidentialité</li>
                <li>Nos partenaires commerciaux (uniquement avec votre consentement explicite)</li>
                <li>Les autorités compétentes en cas d'obligation légale</li>
              </ul>
              <p className="mb-4">
                <strong>Important :</strong> Vos données ne sont jamais vendues à des tiers à des fins commerciales.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">2.7. Vos droits</h3>
              <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Droit d'accès :</strong> Vous pouvez obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> Vous pouvez corriger vos données inexactes ou incomplètes</li>
                <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données dans certains cas</li>
                <li><strong>Droit à la limitation :</strong> Vous pouvez demander la limitation du traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> Vous pouvez récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données</li>
                <li><strong>Droit de retirer votre consentement :</strong> À tout moment, sans affecter la licéité du traitement basé sur le consentement effectué avant le retrait</li>
              </ul>
              <p className="mb-4">
                Pour exercer ces droits, contactez-nous à l'adresse : <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
              </p>
              <p className="mb-4">
                Vous avez également le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : 
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  www.cnil.fr
                </a>
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">2.8. Sécurité des données</h3>
              <p className="mb-4">
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>L'accès non autorisé</li>
                <li>La perte ou la destruction accidentelle</li>
                <li>La divulgation, la modification ou la destruction non autorisées</li>
              </ul>
              <p className="mb-4">
                Vos données sont stockées de manière sécurisée sur des serveurs hébergés en Europe, conformément à la réglementation européenne.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-gray-900">2.9. Transfert de données hors UE</h3>
              <p className="mb-4">
                Vos données personnelles sont hébergées en Europe. Aucun transfert de données personnelles n'est effectué vers des pays situés en dehors de l'Union Européenne sans garanties appropriées.
              </p>
            </div>

            {/* 3. Cookies */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">3. Cookies</h2>
              <p className="mb-4">
                Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic du site.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">3.1. Types de cookies utilisés</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Cookies techniques :</strong> Nécessaires au fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> Pour mesurer l'audience du site (Google Analytics, etc.)</li>
                <li><strong>Cookies de préférences :</strong> Pour mémoriser vos choix</li>
              </ul>
              <p className="mb-4">
                Vous pouvez désactiver les cookies via les paramètres de votre navigateur. Cependant, cela peut affecter certaines fonctionnalités du site.
              </p>
            </div>

            {/* 4. Propriété intellectuelle */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">4. Propriété Intellectuelle</h2>
              <p className="mb-4">
                L'ensemble du contenu de ce site (textes, images, logos, graphismes, etc.) est la propriété exclusive de {companyName} ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
              </p>
              <p className="mb-4">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de {companyName}.
              </p>
            </div>

            {/* 5. Limitation de responsabilité */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">5. Limitation de Responsabilité</h2>
              <p className="mb-4">
                {companyName} ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site {siteUrl}.
              </p>
              <p className="mb-4">
                {companyName} s'engage à sécuriser le site au mieux, cependant sa responsabilité ne pourra être mise en cause en cas d'émission de données indésirables (virus, chevaux de Troie, etc.) malgré les précautions prises.
              </p>
            </div>

            {/* 6. Liens hypertextes */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">6. Liens Hypertextes</h2>
              <p className="mb-4">
                Le site {siteUrl} peut contenir des liens hypertextes vers d'autres sites. {companyName} n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu et leur accessibilité.
              </p>
            </div>

            {/* 7. Droit applicable */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">7. Droit Applicable et Juridiction Compétente</h2>
              <p className="mb-4">
                Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
              </p>
            </div>

            {/* 8. Contact */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">8. Contact</h2>
              <p className="mb-4">
                Pour toute question relative aux présentes mentions légales ou à la protection de vos données personnelles, vous pouvez nous contacter :
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Email :</strong> <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a></p>
                <p className="mb-2"><strong>Téléphone :</strong> {phone}</p>
                <p className="mb-2"><strong>Adresse :</strong> {address}</p>
              </div>
            </div>

            {/* Date de mise à jour */}
            <div className="border-t pt-6 mt-12">
              <p className="text-sm text-gray-500">
                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

