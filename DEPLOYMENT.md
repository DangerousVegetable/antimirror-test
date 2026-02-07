# Simple GitHub Pages Deployment Guide

To deploy your Antimirror app to GitHub Pages, follow these steps:

## 1. Create a GitHub Repository
- Go to [GitHub](https://github.com) and create a new public repository named `antimirror`.
- Do not initialize with README or License.

## 2. Push your code to GitHub
Run these commands in your terminal:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/antimirror.git
git push -u origin main
```

## 3. Configure GitHub Actions (Recommended)
I have already added the necessary configuration to your project:
- `vite.config.js` is set to use relative paths (`base: './'`).
- You can now use a GitHub Action to automate the deployment.

### Create the Workflow File
Create a file at `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm install
      - run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 4. Enable GitHub Pages in Settings
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.

Once you push your code, GitHub will automatically build and deploy your site!

## 5. Telegram Preview Tracking (Optional)

To log the IP addresses of Telegram datacenters that fetch previews, you need a hosting provider that supports **Serverless Functions** (like Vercel or Netlify).

### Using Vercel (Recommended for Tracking)
1. Import your GitHub repository to [Vercel](https://vercel.com).
2. Vercel will automatically detect Vite and the `/api/track.js` function.
3. Once deployed, sharing the site will trigger the function, and you can see the IPs in the **Vercel Logs dashboard**.

### How it works
The `og:image` in `index.html` is set to `/api/track`. When Telegram fetches the preview image, it hits our serverless function first, allowing us to capture the IP before redirecting it to the actual image.
