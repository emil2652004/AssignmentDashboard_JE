# JoinEasy - Assignment Management Dashboard

A clean, responsive student-assignment management system with role-based functionality built with React and Tailwind CSS.

## 🌟 Features

### For Students

- **Assignment Overview**: View all assignments in a clean, organized dashboard
- **Progress Tracking**: See your overall completion percentage and assignment status
- **Double-Verification Submission**: Confirm submissions through a two-step verification flow
- **Filtering**: Filter assignments by All, Pending, or Submitted
- **Visual Progress Indicators**: Color-coded progress bars and status badges
- **Direct Drive Access**: Quick links to Google Drive submission folders

### For Professors (Admins)

- **Assignment Management**: Create, edit, and delete assignments
- **Student Progress Tracking**: View submission status for each student
- **Individual Progress Bars**: Visual representation of submission rates per assignment
- **Detailed Views**: Expandable assignment cards showing submitted/pending students
- **Dashboard Analytics**: Overview statistics for all assignments
- **Drive Link Integration**: Attach Google Drive links for student submissions

### General Features

- **Role-Based Access**: Students and professors see only their relevant data
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Mock Data**: No backend required - uses localStorage for data persistence
- **Clean UI**: Modern, intuitive interface with smooth animations
- **Component-Based Architecture**: Well-organized, reusable React components

## 🚀 Tech Stack

- **React.js 18.2** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage** - Client-side data persistence
- **React Hooks** - useState, useEffect for state management

## 📁 Project Structure

```
JoinEasy/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top navigation bar
│   │   ├── Login.jsx               # Login/account selection
│   │   ├── StudentView.jsx         # Student dashboard
│   │   ├── AdminView.jsx           # Professor dashboard
│   │   ├── AssignmentCard.jsx      # Assignment display card
│   │   ├── AssignmentForm.jsx      # Create/edit assignment form
│   │   ├── ConfirmSubmissionModal.jsx  # Double-verification modal
│   │   ├── Modal.jsx               # Reusable modal component
│   │   └── ProgressBar.jsx         # Progress indicator component
│   ├── data/
│   │   └── mockData.js             # Mock users and assignments
│   ├── utils/
│   │   └── storageUtils.js         # localStorage helper functions
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation Steps

1. **Navigate to the project directory**

```powershell
cd D:\JoinEasy
```

2. **Install dependencies**

```powershell
npm install
```

3. **Start the development server**

```powershell
npm run dev
```

The application will automatically open in your default browser at `http://localhost:3000`

### Build for Production

```powershell
npm run build
```

### Preview Production Build

```powershell
npm run preview
```

## 👥 Demo Accounts

### Students

- **Alice Johnson** - alice@student.edu
- **Bob Smith** - bob@student.edu
- **Carol Davis** - carol@student.edu
- **David Wilson** - david@student.edu

### Professors (Admins)

- **Dr. Emily Brown** - emily.brown@university.edu
- **Prof. Michael Chen** - michael.chen@university.edu

## 💡 How to Use

### As a Student

1. **Login**: Select a student account from the dropdown
2. **View Assignments**: See all assignments with due dates and submission status
3. **Filter Assignments**: Use filter buttons to view All, Pending, or Submitted assignments
4. **Submit Assignment**:
   - Click "Mark as Submitted" on an assignment
   - Confirm "Yes, I have submitted"
   - Final confirmation to complete submission
5. **Track Progress**: View your overall completion percentage in the overview cards

### As a Professor

1. **Login**: Select a professor account from the dropdown
2. **Create Assignment**:
   - Click "Create Assignment" button
   - Fill in title, description, due date, and Drive link
   - Submit the form
3. **View Student Progress**:
   - Click "View Details" on any assignment
   - See which students have submitted and who is pending
   - View individual progress bars
4. **Edit Assignment**: Click "Manage Assignment" → "Edit"
5. **Delete Assignment**: Click "Manage Assignment" → "Delete"

## 🎨 Design Highlights

- **Color-Coded Progress**:

  - Green (≥80%) - Excellent
  - Blue (≥50%) - Good
  - Yellow (≥25%) - Fair
  - Red (<25%) - Needs Attention

- **Responsive Breakpoints**:

  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

- **Accessibility**:
  - Clear color contrasts
  - Readable font sizes
  - Hover states for interactive elements
  - Focus indicators for keyboard navigation

## 🔧 Customization

### Adding New Mock Data

Edit `src/data/mockData.js` to add more users, assignments, or submissions.

### Styling

All styles use Tailwind CSS. Customize the theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize primary color shades
      }
    }
  }
}
```

### localStorage Schema

Data is stored in three keys:

- `users` - User accounts (students and admins)
- `assignments` - Assignment details
- `submissions` - Student submission records
- `currentUser` - Currently logged-in user

## 📱 Mobile Responsiveness

The dashboard is fully responsive with:

- Stacked cards on mobile devices
- Collapsible navigation
- Touch-friendly buttons and links
- Optimized grid layouts for different screen sizes

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is busy, Vite will automatically use the next available port (3001, 3002, etc.)

### localStorage Not Persisting

Make sure your browser allows localStorage. Check browser console for any security errors.

### Styles Not Loading

Ensure all dependencies are installed:

```powershell
npm install
```

Then restart the dev server:

```powershell
npm run dev
```

## 📄 License

This is a demo project for educational purposes.

## 🤝 Contributing

This is a portfolio/demo project. Feel free to fork and customize for your own needs!

---

**Built with ❤️ using React, Tailwind CSS, and Vite**
