import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Phone, FileText, Star, ShieldCheck, Zap } from 'lucide-react'
import { homeHero } from '../data/pagesContent'

interface HeroProps {
  title?: ReactNode
  subtitle?: string
  image?: string
  showBadge?: boolean
}

const TEAM_PHOTO = homeHero.photoUrl

export const Hero = ({
  title = (
    <>
      L'électricité <span className="text-accent">dans les règles de l'art</span>, près de chez vous
    </>
  ),
  subtitle = homeHero.subtitle,
  image = TEAM_PHOTO,
  showBadge = true
}: HeroProps) => {
  const phoneNumber = import.meta.env.VITE_URGENCE_PHONE || '06 XX XX XX XX'

  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Texture schéma électrique + halo ambré */}
      <div className="absolute inset-0 bg-circuit" aria-hidden="true" />
      <div
        className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-secondary/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-52 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary-light/25 blur-[100px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center py-16 lg:py-24">
          {/* Colonne texte */}
          <div className="lg:col-span-7 text-white">
            {showBadge && (
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                {homeHero.badge}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6 text-balance">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              {subtitle}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-3 bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                {phoneNumber}
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 border-2 border-white/25 hover:border-white/60 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                <FileText className="w-5 h-5" />
                {homeHero.ctaQuote}
              </Link>
            </div>

            {/* Preuves */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/75">
              <span className="flex items-center gap-2">
                <span className="flex" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </span>
                <strong className="text-white">{homeHero.rating}</strong> {homeHero.ratingSuffix}
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                {homeHero.proofs[0]}
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                {homeHero.proofs[1]}
              </span>
            </div>
          </div>

          {/* Colonne photo */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative max-w-md ml-auto">
              {/* Cadre décalé ambré */}
              <div
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-2 border-secondary/60"
                aria-hidden="true"
              />
              <img
                src={image}
                alt={homeHero.photoAlt}
                className="relative rounded-2xl w-full object-cover shadow-card-hover"
                loading="eager"
              />
              <div className="absolute -bottom-5 left-6 bg-white text-ink rounded-xl shadow-card-hover px-5 py-3">
                <p className="font-display font-bold leading-tight">{homeHero.photoName}</p>
                <p className="text-sm text-gray-600">{homeHero.photoRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
