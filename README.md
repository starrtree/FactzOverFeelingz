# Factz Over Feelingz storefront

## Why GitHub may show old timestamps
If the repo front page still says "7 hours ago," the new commits likely have **not been pushed/merged to `main` yet**.

Check these in GitHub:
1. **Branch selector**: confirm you're on `main`.
2. **Pull Requests tab**: confirm a newer PR exists and is merged.
3. **Commits tab**: verify latest commit hash exists on `main`.

## Pages deployment
This repo now includes `.github/workflows/deploy-pages.yml` to auto-build and deploy on every push to `main`.

### Required one-time repo settings
1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source = GitHub Actions**.
3. Ensure `main` branch receives merged commits.

## Local run
```bash
npm install
npm run dev
```
