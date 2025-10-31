# 🚀 Quick Reference Card

One-page quick reference for the JoinEasy project.

## 📋 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build
# → Creates dist/ folder

# Preview production build
npm run preview

# Docker build and run
docker build -t joineasy .
docker run -p 3000:80 joineasy
```

---

## 🔑 Demo Accounts

### Students
- alice@student.com - Alice Johnson
- bob@student.com - Bob Smith
- carol@student.com - Carol Davis
- david@student.com - David Wilson

### Professors
- emily@professor.com - Dr. Emily Brown
- michael@professor.com - Prof. Michael Chen

---

## 📂 Key Files

| File | Location | Purpose |
|------|----------|---------|
| Main app | `src/App.jsx` | App container & routing |
| Entry point | `src/main.jsx` | React initialization |
| Student view | `src/components/StudentView.jsx` | Student dashboard |
| Professor view | `src/components/AdminView.jsx` | Professor dashboard |
| Data utils | `src/utils/storageUtils.js` | localStorage operations |
| Mock data | `src/data/mockData.js` | Initial seed data |
| Styles | `src/index.css` | Global styles + Tailwind |

---

## 🎯 Component Map

```
App
├── Login (Toggle: Student/Professor)
├── Header (Logo, User Info, Logout)
├── StudentView
│   ├── Progress Cards
│   ├── AssignmentCard (reusable)
│   ├── ConfirmSubmissionModal
│   └── ProgressBar (reusable)
└── AdminView
    ├── Statistics Cards
    ├── AssignmentCard (reusable)
    ├── AssignmentForm
    └── ProgressBar (reusable)
```

---

## 📚 Documentation Files

| File | What's Inside |
|------|--------------|
| `README.md` | Main project overview |
| `SETUP.md` | 5-minute setup guide |
| `ARCHITECTURE.md` | Component structure & design decisions |
| `DEPLOYMENT.md` | Netlify, Vercel, Docker guides |
| `FOLDER_STRUCTURE.md` | Complete file breakdown |
| `GIT_GUIDE.md` | Git setup & commit history |
| `DELIVERABLES.md` | Complete deliverables checklist |

---

## 🚀 Deploy Options

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Vercel
```bash
vercel --prod
```

### Docker
```bash
docker-compose up -d
```

---

## 🔧 Tech Stack

- React 18.2
- Vite 5.0
- Tailwind CSS 3.4
- localStorage (no backend)

---

## ✅ Features Checklist

**Student:**
- [x] View assignments
- [x] Filter by status
- [x] Submit assignments
- [x] Double-verification
- [x] Progress tracking

**Professor:**
- [x] Create assignments
- [x] Edit/delete assignments
- [x] Track student progress
- [x] View submission stats
- [x] Detailed student views

---

## 🐛 Troubleshooting

### Dev server won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build fails
```bash
rm -rf node_modules/.vite
npm run build
```

### Port already in use
Change port in `vite.config.js`:
```javascript
server: { port: 3000 }
```

---

## 📊 Project Stats

- **Components**: 9
- **Utils**: 2
- **Mock Users**: 6 (4 students, 2 professors)
- **Mock Assignments**: 4
- **Build Size**: ~170 KB (~60 KB gzipped)

---

## 🌐 URLs After Deployment

- **Local Dev**: http://localhost:5173
- **Docker**: http://localhost:3000
- **Netlify**: https://your-app.netlify.app
- **Vercel**: https://your-app.vercel.app

---

## 📝 Git Quick Start

```bash
# Initialize
git init
git add .
git commit -m "chore: initial commit"

# Connect to GitHub
git remote add origin https://github.com/user/JoinEasy.git
git push -u origin main
```

See `GIT_GUIDE.md` for detailed commit structure.

---

## 🎓 Learning Resources

- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Tailwind Docs: https://tailwindcss.com
- Git Guide: https://git-scm.com

---

**Need more details? Check the full documentation files above!**
