import { Link } from 'react-router-dom'
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
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border-2 border-transparent hover:border-primary"
    >
      {/* Image ou icône */}
      {image ? (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      ) : Icon ? (
        <div className="h-48 bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
          <Icon className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="w-20 h-20 bg-primary rounded-full opacity-50" />
        </div>
      )}

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {shortDescription}
        </p>
        
        {priceInfo && (
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm font-semibold text-primary">
              {priceInfo}
            </span>
            <span className="text-primary group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

