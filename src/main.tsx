import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Vérifier que le DOM est prêt avant de rendre
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a <div id="root"></div> in your HTML.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
