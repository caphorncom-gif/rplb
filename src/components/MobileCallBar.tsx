import { Link, useLocation } from 'react-router-dom'
import { Phone, FileText } from 'lucide-react'

/**
 * Barre d'action fixe en bas d'écran (mobile uniquement) :
 * l'appel et le devis restent accessibles en permanence.
 */
export const MobileCallBar = () => {
  const phoneNumber = import.meta.env.VITE_URGENCE_PHONE || '06 XX XX XX XX'
  const location = useLocation()

  // Inutile sur la page contact (le formulaire y est déjà)
  if (location.pathname === '/contact') return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-ink/95 backdrop-blur border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={`tel:${phoneNumber.replace(/\s/g, '')}`}
          className="flex items-center justify-center gap-2 bg-secondary text-white font-bold py-3 rounded-xl"
        >
          <Phone className="w-5 h-5" />
          Appeler
        </a>
        <Link
          to="/contact"
          className="flex items-center justify-center gap-2 bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/15"
        >
          <FileText className="w-5 h-5" />
          Devis gratuit
        </Link>
      </div>
    </div>
  )
}
