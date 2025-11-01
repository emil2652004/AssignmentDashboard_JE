# 🚀 Deployment Guide for JoinEasy

This guide covers multiple deployment options for the JoinEasy application.

## Table of Contents

- [Netlify Deployment](#netlify-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Docker Deployment](#docker-deployment)
- [Manual Deployment](#manual-deployment)

---

## 📦 Netlify Deployment

### Method 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/JoinEasy.git
git push -u origin main
```

2. **Connect to Netlify**

   - Visit [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Select "GitHub" and authorize Netlify
   - Choose the `JoinEasy` repository

3. **Configure Build Settings**

   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 16 or higher

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `https://your-site-name.netlify.app`

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Environment Variables (if needed in future)

Go to: Site settings → Build & deploy → Environment → Environment variables

---

## ▲ Vercel Deployment

### Method 1: Deploy from GitHub (Recommended)

1. **Push to GitHub** (same as Netlify step 1)

2. **Import to Vercel**

   - Visit [Vercel](https://vercel.com/)
   - Click "Add New..." → "Project"
   - Import your `JoinEasy` repository

3. **Configure Project**

   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🐳 Docker Deployment

### Create Dockerfile

Create a file named `Dockerfile` in the project root:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Create .dockerignore

Create a file named `.dockerignore`:

```
node_modules
dist
.git
.gitignore
README.md
*.md
.env
.DS_Store
```

### Build and Run

```bash
# Build the Docker image
docker build -t joineasy-app .

# Run the container
docker run -d -p 3000:80 --name joineasy joineasy-app

# Access at http://localhost:3000
```

### Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "3000:80"
    container_name: joineasy-app
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

### Stop and Remove

```bash
# Stop container
docker stop joineasy

# Remove container
docker rm joineasy

# Remove image
docker rmi joineasy-app
```

---

## 📤 Manual Deployment

For traditional web hosting (cPanel, shared hosting, etc.):

### Step 1: Build the Project

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Step 2: Upload Files

Upload all contents of the `dist/` folder to your web server:

- Via FTP/SFTP client (FileZilla, Cyberduck)
- Via hosting control panel file manager
- Via SSH/SCP

### Step 3: Configure Server

Make sure your server is configured to:

- Serve `index.html` for all routes (SPA routing)
- Serve static files from the upload directory

**Apache (.htaccess)**:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx**:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## 🔄 Continuous Deployment

### GitHub Actions (for any hosting)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy JoinEasy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=dist
```

---

## ✅ Post-Deployment Checklist

- [ ] Test all routes work correctly
- [ ] Verify student login functionality
- [ ] Verify professor login functionality
- [ ] Test assignment creation
- [ ] Test assignment submission
- [ ] Check responsive design on mobile
- [ ] Verify localStorage persistence
- [ ] Test all filtering options
- [ ] Check all modals and forms
- [ ] Verify logout functionality

---

## 🐛 Common Deployment Issues

### Issue: Blank page after deployment

**Solution**: Check browser console for errors. Ensure build completed successfully.

### Issue: 404 on page refresh

**Solution**: Configure server for SPA routing (see Manual Deployment section).

### Issue: Assets not loading

**Solution**: Check base URL in `vite.config.js`. For subdirectory hosting, set:

```js
export default defineConfig({
  base: "/your-subdirectory/",
  // ...
});
```

### Issue: localStorage not persisting

**Solution**: Ensure HTTPS is enabled. Some browsers restrict localStorage on HTTP.

---

## 📊 Monitoring and Analytics

### Add Google Analytics (Optional)

1. Install package:

```bash
npm install react-ga4
```

2. Add to `main.jsx`:

```javascript
import ReactGA from "react-ga4";

ReactGA.initialize("G-XXXXXXXXXX"); // Your tracking ID
```

---

## 🔒 Security Considerations

- All data is stored in browser localStorage (client-side only)
- No sensitive data is transmitted over network
- For production use, consider adding:
  - Real authentication system
  - Backend API for data persistence
  - HTTPS enforcement
  - Input validation and sanitization

---

## 📝 Update Deployment

To update your deployed app:

**Netlify/Vercel (GitHub integration)**:

```bash
git add .
git commit -m "Update description"
git push
# Automatically deploys!
```

**Docker**:

```bash
docker-compose down
docker-compose build
docker-compose up -d
```

**Manual**:

```bash
npm run build
# Upload new dist/ folder contents
```
