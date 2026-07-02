import { Star } from 'lucide-react'

interface TestimonialCardProps {
  clientName: string
  clientLocation?: string
  rating: number
  comment: string
  serviceType?: string
  date?: string
}

export const TestimonialCard = ({
  clientName,
  clientLocation,
  rating,
  comment,
  serviceType,
  date
}: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-ink/10 shadow-card p-6 h-full flex flex-col">
      {/* Étoiles */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating
                ? 'fill-accent text-accent'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Commentaire */}
      <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
        «&nbsp;{comment}&nbsp;»
      </p>

      {/* Informations client */}
      <div className="border-t border-ink/10 pt-4">
        <div className="font-display font-bold text-ink">{clientName}</div>
        {clientLocation && (
          <div className="text-sm text-gray-500">{clientLocation}</div>
        )}
        <div className="flex items-center justify-between mt-2">
          {serviceType && (
            <span className="text-xs bg-secondary/10 text-secondary-dark font-medium px-2 py-1 rounded-full">
              {serviceType}
            </span>
          )}
          {date && (
            <span className="text-xs text-gray-400">{date}</span>
          )}
        </div>
      </div>
    </div>
  )
}
