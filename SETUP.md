# 🚀 Quick Setup Guide# 🚀 Quick Setup Guide

Get JoinEasy running in 5 minutes!Get JoinEasy running in 5 minutes!

## Prerequisites## Prerequisites

Make sure you have installed:Make sure you have installed:

- [Node.js](https://nodejs.org/) (v16 or higher)

- npm (comes with Node.js)- [Node.js](https://nodejs.org/) (v16 or higher)

- npm (comes with Node.js)

Check your versions:

````bashCheck your versions:

node --version  # Should be v16 or higher

npm --version   # Should be 8 or higher```bash

```node --version  # Should be v16 or higher

npm --version   # Should be 8 or higher

## Installation```



### Step 1: Clone the Repository## Installation



```bash### Step 1: Clone or Download

git clone https://github.com/emil2652004/AssignmentDashboard_JE.git

cd AssignmentDashboard_JE**Option A: Clone with Git**

````

```````bash

### Step 2: Install Dependenciesgit clone https://github.com/yourusername/JoinEasy.git

cd JoinEasy

```bash```

npm install

```**Option B: Download ZIP**



This installs React, Vite, Tailwind CSS, and all required packages.1. Download the project ZIP

2. Extract it

### Step 3: Start Development Server3. Open terminal in the extracted folder



```bash### Step 2: Install Dependencies

npm run dev

``````bash

npm install

You should see:```

```````

VITE v5.0.0 ready in XXX msThis installs React, Vite, Tailwind CSS, and all required packages.

➜ Local: http://localhost:5173/### Step 3: Start Development Server

➜ Network: use --host to expose

```````bash

npm run dev

### Step 4: Open in Browser```



Navigate to: **http://localhost:5173**You should see:



## 🎮 Using the App```

  VITE v5.0.0  ready in XXX ms

### Login as Student

  ➜  Local:   http://localhost:5173/

1. The **"Student"** toggle is selected by default  ➜  Network: use --host to expose

2. Select any student from the dropdown:```

   - Alice Johnson

   - Bob Smith### Step 4: Open in Browser

   - Carol Davis

   - David WilsonNavigate to: **http://localhost:5173**

3. Or click **"Try Demo Account"** for quick access

4. Click **"Continue to Dashboard"**## 🎮 Using the App



### Login as Professor### Login as Student



1. Click the **"Professor"** toggle1. Click the **"Student"** toggle (should be selected by default)

2. Select a professor from the dropdown:2. Select any student from the dropdown:

   - Dr. Emily Brown   - Alice Johnson

   - Prof. Michael Chen   - Bob Smith

3. Or click **"Try Demo Account"**   - Carol Davis

4. Click **"Continue to Dashboard"**   - David Wilson

3. Or click **"Try Demo Account"** for quick access

## 🔧 Available Commands4. Click **"Continue to Dashboard"**



| Command | Description |### Login as Professor

|---------|-------------|

| `npm run dev` | Start development server with hot reload |1. Click the **"Professor"** toggle

| `npm run build` | Create production build in `dist/` folder |2. Select a professor from the dropdown:

| `npm run preview` | Preview production build locally |   - Dr. Emily Brown

   - Prof. Michael Chen

## 📂 What's Inside?3. Or click **"Try Demo Account"**

4. Click **"Continue to Dashboard"**

After installation, your folder structure:

```## 🔧 Available Commands

AssignmentDashboard_JE/

├── node_modules/       # Dependencies (auto-generated)| Command           | Description                               |

├── src/               # Source code| ----------------- | ----------------------------------------- |

│   ├── components/    # React components| `npm run dev`     | Start development server with hot reload  |

│   ├── data/         # Mock data| `npm run build`   | Create production build in `dist/` folder |

│   └── utils/        # Utility functions| `npm run preview` | Preview production build locally          |

├── public/            # Static files

├── dist/             # Production build (after npm run build)## 📂 What's Inside?

├── package.json       # Project config

└── README.md         # DocumentationAfter installation, your folder structure:

```

```

## 🐛 TroubleshootingJoinEasy/

├── node_modules/       # Dependencies (auto-generated)

### Port Already in Use├── src/               # Source code

├── public/            # Static files

If port 5173 is busy:├── dist/             # Production build (after npm run build)

```bash├── package.json       # Project config

# Windows└── README.md         # Documentation

netstat -ano | findstr :5173```

taskkill /PID <PID> /F

## 🐛 Troubleshooting

# Or change port in vite.config.js

```### Port Already in Use



### Module Not Found ErrorsIf port 5173 is busy:



```bash```bash

# Clear cache and reinstall# Windows

rm -rf node_modules package-lock.jsonnetstat -ano | findstr :5173

npm installtaskkill /PID <PID> /F

```

# Or change port in vite.config.js

### Build Errorsserver: {

  port: 3000  // Use different port

```bash}

# Clear Vite cache```

rm -rf node_modules/.vite

npm run dev### Module Not Found Errors

```

```bash

## 💡 Tips# Clear cache and reinstall

rm -rf node_modules package-lock.json

- **Auto-reload**: Changes to source files automatically refresh the browsernpm install

- **Mock Data**: Pre-loaded with demo users and assignments```

- **localStorage**: Data persists in your browser (clear browser data to reset)

- **Responsive**: Try resizing browser or open on mobile### Build Errors



## 📚 Next Steps```bash

# Clear Vite cache

- ✅ Explore student dashboard featuresrm -rf node_modules/.vite

- ✅ Test professor dashboard (create/edit assignments)npm run dev

- ✅ Review `ARCHITECTURE.md` for component details```

- ✅ Check `FOLDER_STRUCTURE.md` for complete file breakdown

## 🎯 Next Steps

## 🚀 Build for Production

- ✅ Read [README.md](README.md) for full documentation

```bash- ✅ Check [ARCHITECTURE.md](ARCHITECTURE.md) for design details

# Build the project- ✅ See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting options

npm run build- ✅ Review [TESTING_REPORT.md](TESTING_REPORT.md) for test results



# Preview the build## 🚀 Deploy Your Own

npm run preview

**Netlify** (Easiest):

# The dist/ folder contains production-ready files

``````bash

npm run build

---# Drag and drop 'dist' folder to netlify.app/drop

```

**Happy Coding! 🎉**

**Vercel**:

For detailed documentation, see [README.md](README.md)

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
```````
