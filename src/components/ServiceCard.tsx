import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { ComponentType } from 'react'

interface ServiceCardProps {
  id: string
  slug: string
  title: string
  icon?: ComponentType<{ className?: string }>
  iconName?: string
  shortDescription: string
  priceInfo?: string
  image?: string
}

export const ServiceCard = ({
  slug,
  title,
  icon: Icon,
  shortDescription,
  priceInfo,
  image
}: ServiceCardProps) => {
  return (
    <Link
      to={`/services/${slug}`}
      className="group block bg-white rounded-2xl border border-ink/10 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-secondary/50 transition-all duration-300 overflow-hidden"
    >
      {/* Image ou icône */}
      {image ? (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : Icon ? (
        <div className="h-48 bg-ink bg-circuit flex items-center justify-center">
          <div className="bg-secondary/15 border border-secondary/30 rounded-2xl p-6 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-12 h-12 text-accent" />
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-paper to-gray-200" />
      )}

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {shortDescription}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-ink/10">
          <span className="text-sm font-semibold text-secondary-dark">
            {priceInfo || 'Devis gratuit'}
          </span>
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-paper text-primary group-hover:bg-secondary group-hover:text-white group-hover:translate-x-1 transition-all">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
