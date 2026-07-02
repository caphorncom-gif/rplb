import { ShieldCheck, FileCheck, PlugZap, MapPin } from 'lucide-react'
import type { ComponentType } from 'react'

interface TrustItem {
  name: string
  description: string
  icon: ComponentType<{ className?: string }>
}

const defaultItems: TrustItem[] = [
  {
    name: 'Assurance décennale',
    description: 'Travaux garantis 10 ans',
    icon: ShieldCheck,
  },
  {
    name: 'Devis gratuit',
    description: 'Réponse sous 48 h ouvrées',
    icon: FileCheck,
  },
  {
    name: 'Normes NF C 15-100',
    description: 'Installations conformes',
    icon: PlugZap,
  },
  {
    name: 'Artisans locaux',
    description: 'Basés à Longueil-Sainte-Marie',
    icon: MapPin,
  },
]

interface TrustBadgesProps {
  items?: TrustItem[]
}

export const TrustBadges = ({ items = defaultItems }: TrustBadgesProps) => {
  return (
    <div className="bg-white border-y border-ink/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-ink/5">
          {items.map((item) => (
            <div key={item.name} className="flex items-center gap-3 py-6 px-4 lg:px-6">
              <div className="bg-secondary/10 rounded-xl p-2.5 shrink-0">
                <item.icon className="w-6 h-6 text-secondary-dark" />
              </div>
              <div>
                <p className="font-display font-bold text-ink leading-tight">{item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
