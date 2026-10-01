import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import "./index.css";
import App from './App.jsx'

const container = document.getElementById('root')
const initialLanguage = window.location.pathname.startsWith('/tr') ? 'tr' : 'en'
const app = (
  <StrictMode>
    <App initialLanguage={initialLanguage} />
  </StrictMode>
)

if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
