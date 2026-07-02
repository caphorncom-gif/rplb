import { Link } from 'react-router-dom'
import { Phone, FileText } from 'lucide-react'

export const ContactCTA = () => {
  const phoneNumber = import.meta.env.VITE_URGENCE_PHONE || '06 XX XX XX XX'

  return (
    <section className="relative bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-circuit" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full bg-secondary/20 blur-[110px]"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 py-16 lg:py-20 text-center relative text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
          Un projet ? Une panne ?{' '}
          <span className="text-accent">Parlons-en.</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 text-white/75 max-w-2xl mx-auto">
          Appelez-nous ou décrivez votre besoin en 2 minutes : devis gratuit, réponse sous 48 h ouvrées.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
          >
            <Phone className="w-5 h-5" />
            {phoneNumber}
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-white text-ink hover:bg-paper px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-card"
          >
            <FileText className="w-5 h-5" />
            Devis gratuit en ligne
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/50">
          Interventions du lundi au vendredi, 8h–18h · Longueil-Sainte-Marie et 30 km alentour
        </p>
      </div>
    </section>
  )
}
