import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles.css'

const rootElement = document.getElementById('root')

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} catch (error) {
  rootElement.innerHTML = `
    <div style="min-height:100vh;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Arial,sans-serif;">
      <div style="max-width:640px;text-align:center;line-height:1.5;">
        <h1 style="margin-bottom:12px;">Factz Over Feelingz</h1>
        <p style="margin-bottom:8px;">The app failed to load. Rebuild/deploy and verify JS assets were published.</p>
        <p style="opacity:.75;font-size:14px;">${error?.message ?? 'Unknown startup error'}</p>
      </div>
    </div>
  `
}
