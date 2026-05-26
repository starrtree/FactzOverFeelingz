# Factz Over Feelingz storefront

## White screen troubleshooting (mobile + desktop)
If you only see a white/blank page, the browser is usually loading the wrong Pages location or stale deploy.

### 1) Confirm the correct URL
- If this repository name is exactly `starrtree.github.io`, open: `https://starrtree.github.io/`
- If this is a project repo (any other name), open: `https://starrtree.github.io/<repo-name>/`

### 2) Confirm Pages source and deploy
1. GitHub → **Settings → Pages**
2. **Build and deployment → Source = GitHub Actions**
3. Merge/push to `main`
4. GitHub → **Actions** and verify latest deploy run is green

### 3) New fallback behavior
`index.html` now includes a visible boot fallback message so users no longer see an empty white screen when JS/assets fail to load.

## Local run
```bash
npm install
npm run dev
```
