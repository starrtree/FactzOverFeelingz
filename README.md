# Factz Over Feelingz storefront

## Blank white screen fix
If the website showed only a white screen, the most likely cause was a failed GitHub Pages build pipeline.

This repo now deploys from GitHub Actions using `npm install` (not `npm ci`), because there is currently no committed lockfile. That prevents Pages from failing at install time.

## Required repo settings
1. Go to **Settings → Pages**.
2. Set **Build and deployment → Source = GitHub Actions**.
3. Merge/push changes into `main` to trigger deploy.
4. Check **Actions** tab for the latest run status.

## Local run
```bash
npm install
npm run dev
```
