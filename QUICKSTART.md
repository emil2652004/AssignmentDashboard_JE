# 🚀 Quick Start Guide

## Getting Started in 3 Simple Steps

### 1. Install Dependencies

```powershell
npm install
```

### 2. Start Development Server

```powershell
npm run dev
```

The app will open automatically at `http://localhost:3000`

### 3. Login with Demo Account

**Quick Access Buttons:**

- Click "👨‍🎓 Student Demo" for student view (Alice Johnson)
- Click "👨‍🏫 Professor Demo" for professor view (Dr. Emily Brown)

## 📋 What You Can Do

### As a Student

1. View all assignments with due dates
2. Filter by: All, Pending, or Submitted
3. Click "Mark as Submitted" on any assignment
4. Complete the double-verification process
5. Track your overall progress percentage

### As a Professor

1. Click "Create Assignment" to add new assignments
2. Fill in: Title, Description, Due Date, and Drive Link
3. View "Details" to see which students submitted
4. Edit or Delete assignments using "Manage Assignment"
5. Track submission progress with visual progress bars

## 🎨 Key Features

✅ **Role-based dashboards** - Students and professors see different views
✅ **Double-verification** - Prevents accidental submissions
✅ **Progress tracking** - Visual indicators for completion status
✅ **Responsive design** - Works on desktop, tablet, and mobile
✅ **localStorage** - Data persists across browser sessions
✅ **No backend needed** - Everything runs in the browser

## 📱 Responsive Testing

Test on different screen sizes:

- **Desktop**: Full grid layout with 3 columns
- **Tablet**: 2 columns layout
- **Mobile**: Single column, stacked cards

## 🔧 Troubleshooting

**Server won't start?**

```powershell
# Make sure you're in the right directory
cd D:\JoinEasy

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

**Port 3000 already in use?**

- Vite will automatically use the next available port (3001, 3002, etc.)

**Data not saving?**

- Check if your browser allows localStorage
- Open DevTools → Application → Local Storage

## 📚 Learn More

See `README.md` for:

- Complete feature list
- Project structure
- Customization options
- Build and deployment instructions

---

**Enjoy building with JoinEasy! 🎉**
