# 🚀 Quick Setup Guide

Get JoinEasy running in 5 minutes!

## Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

Check your versions:
```bash
node --version  # Should be v16 or higher
npm --version   # Should be 8 or higher
```

## Installation

### Step 1: Clone or Download

**Option A: Clone with Git**
```bash
git clone https://github.com/yourusername/JoinEasy.git
cd JoinEasy
```

**Option B: Download ZIP**
1. Download the project ZIP
2. Extract it
3. Open terminal in the extracted folder

### Step 2: Install Dependencies

```bash
npm install
```

This installs React, Vite, Tailwind CSS, and all required packages.

### Step 3: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open in Browser

Navigate to: **http://localhost:5173**

## 🎮 Using the App

### Login as Student

1. Click the **"Student"** toggle (should be selected by default)
2. Select any student from the dropdown:
   - Alice Johnson
   - Bob Smith
   - Carol Davis
   - David Wilson
3. Or click **"Try Demo Account"** for quick access
4. Click **"Continue to Dashboard"**

### Login as Professor

1. Click the **"Professor"** toggle
2. Select a professor from the dropdown:
   - Dr. Emily Brown
   - Prof. Michael Chen
3. Or click **"Try Demo Account"**
4. Click **"Continue to Dashboard"**

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build in `dist/` folder |
| `npm run preview` | Preview production build locally |

## 📂 What's Inside?

After installation, your folder structure:
```
JoinEasy/
├── node_modules/       # Dependencies (auto-generated)
├── src/               # Source code
├── public/            # Static files
├── dist/             # Production build (after npm run build)
├── package.json       # Project config
└── README.md         # Documentation
```

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is busy:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or change port in vite.config.js
server: {
  port: 3000  // Use different port
}
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 🎯 Next Steps

- ✅ Read [README.md](README.md) for full documentation
- ✅ Check [ARCHITECTURE.md](ARCHITECTURE.md) for design details
- ✅ See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options
- ✅ Review [TESTING_REPORT.md](TESTING_REPORT.md) for test results

## 🚀 Deploy Your Own

**Netlify** (Easiest):
```bash
npm run build
# Drag and drop 'dist' folder to netlify.app/drop
```

**Vercel**:
```bash
npm install -g vercel
vercel
```

**Docker**:
```bash
docker build -t joineasy .
docker run -p 3000:80 joineasy
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guides.

## 💡 Tips

- **Auto-reload**: Changes to source files automatically refresh the browser
- **Mock Data**: Pre-loaded with demo users and assignments
- **localStorage**: Data persists in your browser (clear browser data to reset)
- **Responsive**: Try resizing browser or open on mobile

## 📞 Need Help?

- Check [README.md](README.md) for full documentation
- Review [ARCHITECTURE.md](ARCHITECTURE.md) for component details
- See existing [issues](https://github.com/yourusername/JoinEasy/issues)

---

**Happy Coding! 🎉**
