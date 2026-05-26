import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves project sites from /FactzOverFeelingz/.
  // Vite needs this base path so built JS/CSS assets resolve instead of loading from the domain root.
  base: mode === 'production' ? '/FactzOverFeelingz/' : '/',
  plugins: [react()]
}))
