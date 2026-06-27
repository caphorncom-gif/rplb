import { Star, ExternalLink } from 'lucide-react'

interface GoogleReviewsProps {
  googleReviewsUrl?: string
  averageRating?: number
  totalReviews?: number
}

export const GoogleReviews = ({
  googleReviewsUrl = 'https://www.google.com/search?sa=X&sca_esv=7a941e0d451f7f12&hl=fr-FR&tbm=lcl&q=RPLB+Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDS2NDE2NrE0sjQwNTYyszQwMtvAyPiKkTMowMdJwbEss3gRK4INAOA0f1QzAAAA&rldimm=11394334929053269026&ved=2ahUKEwiLyurDgdeQAxV2VqQEHRigAucQ9fQKegQIQxAF&biw=1722&bih=913&dpr=2#lkt=LocalPoiReviews',
  averageRating = 4.8,
  totalReviews = 0
}: GoogleReviewsProps) => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary-dark/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* En-tête avec note moyenne */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <svg
                className="w-12 h-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <h2 className="text-3xl font-bold text-gray-900">
                Nos Avis Google
              </h2>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRating)
                        ? 'fill-accent text-accent'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
                {totalReviews > 0 && (
                  <p className="text-sm text-gray-600">{totalReviews} avis</p>
                )}
              </div>
            </div>
          </div>

          {/* Widget Google Reviews intégré avec commentaires */}
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-8">
            <div className="mb-6 text-center">
              <p className="text-gray-600 mb-4">
                Découvrez ce que nos clients disent de nos services
              </p>
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                <span>Voir tous nos avis sur Google</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* Widget Google Reviews - Avis avec commentaires */}
            <div className="mt-8">
              <iframe
                src={googleReviewsUrl}
                width="100%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Avis Google RPLB Électricité"
              />
            </div>

            {/* Alternative: Lien direct vers les avis si l'iframe ne fonctionne pas */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Vous avez fait appel à nos services ? Laissez-nous un avis !
              </p>
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark font-medium"
              >
                <span>Laisser un avis sur Google</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

