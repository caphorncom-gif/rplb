import { SEO } from '../components/SEO'
import { ContactCTA } from '../components/ContactCTA'
import { TrustBadges } from '../components/TrustBadges'
import { Zap, Users, Award, Heart } from 'lucide-react'
import { aboutPage } from '../data/pagesContent'

// Textes dans src/data/pagesContent.ts (partagés avec le pré-rendu), icônes ici.
const figureIcons = [Zap, Users, Award, Heart]

export const About = () => {
  return (
    <>
      <SEO
        title="À propos de RPLB Électricité, électricien dans l'Oise"
        description="RPLB Électricité, artisan électricien à Longueil-Sainte-Marie (60126). Plus de 25 ans d'expérience, certifié Qualifelec et RGE, assurance décennale."
        keywords="à propos, électricien Longueil-Sainte-Marie, histoire RPLB, équipe électricien Oise"
      />

      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {aboutPage.h1}
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            {aboutPage.intro}
          </p>
        </div>
      </div>

      {/* Histoire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
            {aboutPage.historyHeading}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              {aboutPage.historyFirst.before}<strong>{aboutPage.historyFirst.strong}</strong>{aboutPage.historyFirst.after}
            </p>
            {aboutPage.history.map((paragraph, i) => (
              <p
                key={i}
                className={`text-lg leading-relaxed${i < aboutPage.history.length - 1 ? ' mb-4' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
            {aboutPage.figuresHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {aboutPage.figures.map((figure, i) => {
              const Icon = figureIcons[i] ?? Zap
              return (
                <div key={figure.label} className="text-center">
                  <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{figure.value}</div>
                  <div className="text-gray-700">{figure.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
            {aboutPage.valuesHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutPage.values.map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <TrustBadges />

      {/* Zone d'intervention */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            {aboutPage.zoneHeading}
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">
              {aboutPage.zoneText}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
              {aboutPage.zoneCities.map((city) => (
                <div key={city} className="bg-white p-3 rounded shadow-sm">
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

