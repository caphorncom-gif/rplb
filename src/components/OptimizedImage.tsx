import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  width?: number
  height?: number
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

export const OptimizedImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  objectFit = 'cover'
}: OptimizedImageProps) => {
  const [imageError, setImageError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleError = () => {
    setImageError(true)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  if (imageError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Image non disponible</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectFit }}
        decoding="async"
        fetchPriority={loading === 'eager' ? 'high' : 'auto'}
      />
    </div>
  )
}


