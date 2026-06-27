import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { TrackingProvider } from './components/TrackingProvider'

// Lazy loading des pages pour améliorer les performances
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })))
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then(m => ({ default: m.ServiceDetail })))
const Realisations = lazy(() => import('./pages/Realisations').then(m => ({ default: m.Realisations })))
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })))
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })))
const Urgence = lazy(() => import('./pages/Urgence').then(m => ({ default: m.Urgence })))
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })))
const ArticleDetail = lazy(() => import('./pages/ArticleDetail').then(m => ({ default: m.ArticleDetail })))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales').then(m => ({ default: m.MentionsLegales })))
const LocalLanding = lazy(() => import('./pages/LocalLanding').then(m => ({ default: m.LocalLanding })))

// Composant de chargement
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-gray-600">Chargement...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <TrackingProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Home />
                </Suspense>
              } />
              <Route path="/services" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Services />
                </Suspense>
              } />
              <Route path="/services/:slug" element={
                <Suspense fallback={<LoadingFallback />}>
                  <ServiceDetail />
                </Suspense>
              } />
              <Route path="/realisations" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Realisations />
                </Suspense>
              } />
              <Route path="/about" element={
                <Suspense fallback={<LoadingFallback />}>
                  <About />
                </Suspense>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Contact />
                </Suspense>
              } />
              <Route path="/urgence" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Urgence />
                </Suspense>
              } />
              <Route path="/blog" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Blog />
                </Suspense>
              } />
              <Route path="/blog/:slug" element={
                <Suspense fallback={<LoadingFallback />}>
                  <ArticleDetail />
                </Suspense>
              } />
              <Route path="/mentions-legales" element={
                <Suspense fallback={<LoadingFallback />}>
                  <MentionsLegales />
                </Suspense>
              } />
              {/* Landing pages locales pour le SEO local */}
              <Route path="/electricien/:city" element={
                <Suspense fallback={<LoadingFallback />}>
                  <LocalLanding />
                </Suspense>
              } />
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-gray-600 mb-4">Page non trouvée</p>
                    <a href="/" className="text-primary hover:underline">Retour à l'accueil</a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </TrackingProvider>
    </Router>
  )
}

export default App
