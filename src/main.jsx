import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
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

const beaconToken = import.meta.env.VITE_CF_BEACON_TOKEN
if (beaconToken && !import.meta.env.DEV) {
  const script = document.createElement('script')
  script.defer = true
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
  script.dataset.cfBeacon = JSON.stringify({ token: beaconToken })
  document.head.appendChild(script)
}
