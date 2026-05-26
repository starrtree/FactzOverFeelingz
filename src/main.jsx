import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles.css'

const rootElement = document.getElementById('root')
const fallbackElement = document.getElementById('boot-fallback')

if (!rootElement) {
  throw new Error('Missing #root mount node in index.html')
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  if (fallbackElement) {
    fallbackElement.remove()
  }
} catch (error) {
  if (fallbackElement) {
    fallbackElement.innerHTML = `
      <div class="box">
        <h1>Factz Over Feelingz</h1>
        <p>The app failed to load. Rebuild/deploy and verify JS assets were published.</p>
        <p style="opacity:.75;font-size:14px;">${error?.message ?? 'Unknown startup error'}</p>
      </div>
    `
  }
}
