# 📁 Folder Structure Overview

Complete breakdown of the JoinEasy project structure with explanations.

## Root Directory

```
JoinEasy/
├── 📄 Configuration Files
│   ├── package.json              # Project metadata and dependencies
│   ├── package-lock.json         # Locked dependency versions
│   ├── vite.config.js           # Vite build configuration
│   ├── tailwind.config.js       # Tailwind CSS customization
│   ├── postcss.config.js        # PostCSS plugins config
│   ├── index.html               # HTML entry point
│   ├── .gitignore               # Git ignore rules
│   ├── Dockerfile               # Docker container config
│   ├── .dockerignore            # Docker ignore rules
│   └── docker-compose.yml       # Docker Compose setup
│
├── 📚 Documentation
│   ├── README.md                # Main project documentation
│   ├── SETUP.md                 # Quick setup guide
│   ├── ARCHITECTURE.md          # Architecture & design decisions
│   ├── DEPLOYMENT.md            # Deployment guides
│   ├── TESTING_REPORT.md        # Test results
│   ├── VERIFICATION_COMPLETE.md # Feature verification
│   ├── NAVIGATION_MAP.md        # User flow documentation
│   └── QUICKSTART.md            # Quick reference guide
│
├── 📂 src/                      # Source code directory
├── 📂 public/                   # Static assets
├── 📂 node_modules/             # Dependencies (auto-generated)
└── 📂 dist/                     # Production build (generated)
```

---

## Source Directory (`src/`)

### Complete Structure

```
src/
├── 🎨 Styling
│   └── index.css                # Global styles, Tailwind directives, custom CSS
│
├── 🚀 Entry Points
│   ├── main.jsx                 # React app entry point
│   └── App.jsx                  # Main app component with routing logic
│
├── 🧩 components/               # React components (UI building blocks)
│   ├── Header.jsx               # Top navigation bar (shared)
│   ├── Login.jsx                # Login/authentication page
│   ├── StudentView.jsx          # Student dashboard
│   ├── AdminView.jsx            # Professor dashboard
│   ├── AssignmentCard.jsx       # Assignment display card (reusable)
│   ├── AssignmentForm.jsx       # Create/Edit assignment form modal
│   ├── ConfirmSubmissionModal.jsx  # Double-verification submission modal
│   ├── Modal.jsx                # Base modal component (reusable)
│   └── ProgressBar.jsx          # Progress indicator (reusable)
│
├── 📊 data/                     # Data management
│   └── mockData.js              # Initial seed data (users, assignments)
│
└── 🛠️ utils/                    # Utility functions
    └── storageUtils.js          # localStorage CRUD operations
```

---

## Detailed File Breakdown

### 📄 Configuration Files

#### `package.json`

```json
{
  "name": "joineasy",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.7"
    // ... more dev dependencies
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**Purpose**: Defines project dependencies, scripts, and metadata.

#### `vite.config.js`

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Dev server port
  },
});
```

**Purpose**: Configures Vite build tool (plugins, server settings, build options).

#### `tailwind.config.js`

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          /* blue palette */
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
};
```

**Purpose**: Customizes Tailwind CSS (colors, animations, purge settings).

#### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JoinEasy - Assignment Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Purpose**: HTML entry point. Vite injects React app into `#root`.

---

### 🧩 Components Directory

#### `Header.jsx` (Shared Component)

**Location**: `src/components/Header.jsx`  
**Used by**: StudentView, AdminView  
**Props**: `user`, `onLogout`  
**Features**:

- Blue logo (JE) - consistent across roles
- User name and role display
- Avatar with user initials
- Logout button
- Sticky positioning

**Key Code**:

```jsx
<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600">
  <span className="text-white">JE</span>
</div>
```

#### `Login.jsx` (Entry Page)

**Location**: `src/components/Login.jsx`  
**State**: `selectedUser`, `userType` (student/professor)  
**Features**:

- Animated toggle between student/professor
- Dropdown user selection
- "Try Demo Account" quick access
- Role-based styling

**Key Code**:

```jsx
const [userType, setUserType] = useState("student");
// Toggle changes available users
const currentUsers = userType === "student" ? studentUsers : adminUsers;
```

#### `StudentView.jsx` (Student Dashboard)

**Location**: `src/components/StudentView.jsx`  
**State**: `assignments`, `filter`, `showConfirmModal`, `selectedAssignment`  
**Features**:

- Progress cards (Total, Completed, Pending)
- Assignment filtering (All/Pending/Submitted)
- Assignment submission
- Progress tracking

**Data Flow**:

1. `useEffect` → `getAssignments()` → populate assignments
2. Filter → update displayed assignments
3. Submit → `ConfirmSubmissionModal` → `addSubmission()`

#### `AdminView.jsx` (Professor Dashboard)

**Location**: `src/components/AdminView.jsx`  
**State**: `assignments`, `students`, `expandedAssignment`, `showCreateForm`, `editingAssignment`  
**Features**:

- Statistics cards (Total assignments, students, avg completion)
- Create assignment button
- Assignment list with edit/delete
- Student progress tracking
- Expandable detail views

**Data Flow**:

1. `useEffect` → `getAssignments()`, `getUsers()` → populate data
2. Create → `AssignmentForm` → `addAssignment()`
3. Edit → `AssignmentForm` (pre-filled) → `updateAssignment()`
4. View Details → Calculate submitted/pending students

#### `AssignmentCard.jsx` (Reusable Component)

**Location**: `src/components/AssignmentCard.jsx`  
**Props**: `assignment`, `onSubmit`, `onEdit`, `onDelete`, `showProgress`  
**Used by**: StudentView, AdminView  
**Variants**:

- **Student**: Shows submit button, status badge
- **Professor**: Shows edit/delete, progress bar, student stats

**Conditional Rendering**:

```jsx
{onSubmit && <button onClick={onSubmit}>Submit</button>}
{onEdit && <button onClick={onEdit}>Edit</button>}
{showProgress && <ProgressBar percentage={...} />}
```

#### `AssignmentForm.jsx` (Form Modal)

**Location**: `src/components/AssignmentForm.jsx`  
**Props**: `isOpen`, `onClose`, `onSuccess`, `assignment` (optional), `userId`  
**State**: `formData`, `errors`  
**Fields**:

- Title (required)
- Description (required)
- Due Date (required)
- Drive Link (required, URL format)

**Validation**:

```javascript
if (!formData.driveLink.startsWith("http")) {
  errors.driveLink = "Please enter a valid URL";
}
```

#### `ConfirmSubmissionModal.jsx` (Confirmation Modal)

**Location**: `src/components/ConfirmSubmissionModal.jsx`  
**Props**: `isOpen`, `onClose`, `onConfirm`, `assignmentTitle`  
**Purpose**: Double-verification before submission  
**Flow**: User clicks Submit → Modal opens → User confirms → Submission recorded

#### `Modal.jsx` (Base Modal)

**Location**: `src/components/Modal.jsx`  
**Props**: `isOpen`, `onClose`, `title`, `children`, `size`  
**Used by**: AssignmentForm, ConfirmSubmissionModal  
**Features**:

- Backdrop overlay
- Click outside to close
- Escape key support
- Responsive sizing

#### `ProgressBar.jsx` (Visual Indicator)

**Location**: `src/components/ProgressBar.jsx`  
**Props**: `percentage`, `label`, `showLabel`  
**Used by**: StudentView (progress cards), AdminView (assignment progress)  
**Features**:

- Color-coded by percentage (red < 33%, yellow < 66%, green ≥ 66%)
- Animated fill
- Optional label display

---

### 📊 Data Directory

#### `mockData.js`

**Location**: `src/data/mockData.js`  
**Purpose**: Seed initial data for demo  
**Contains**:

- 6 users (4 students, 2 professors)
- 4 sample assignments
- 6 sample submissions

**Function**:

```javascript
export const initializeData = () => {
  if (!localStorage.getItem("users")) {
    // Populate localStorage with mock data
  }
};
```

**Called in**: `App.jsx` on mount

---

### 🛠️ Utils Directory

#### `storageUtils.js`

**Location**: `src/utils/storageUtils.js`  
**Purpose**: localStorage CRUD operations  
**Functions**:

| Function                               | Purpose                    |
| -------------------------------------- | -------------------------- |
| `getUsers()`                           | Retrieve all users         |
| `getAssignments()`                     | Retrieve all assignments   |
| `getSubmissions()`                     | Retrieve all submissions   |
| `addAssignment(data)`                  | Create new assignment      |
| `updateAssignment(id, data)`           | Update assignment          |
| `deleteAssignment(id)`                 | Delete assignment          |
| `addSubmission(data)`                  | Record submission          |
| `isSubmitted(studentId, assignmentId)` | Check submission status    |
| `getStudentProgress(studentId)`        | Calculate student progress |
| `getCurrentUser()`                     | Get logged-in user         |
| `setCurrentUser(user)`                 | Set logged-in user         |
| `clearCurrentUser()`                   | Logout                     |

**Example**:

```javascript
export const addAssignment = (assignment) => {
  const assignments = getAssignments();
  const newAssignment = {
    id: Date.now().toString(),
    ...assignment,
    createdAt: new Date().toISOString(),
  };
  assignments.push(newAssignment);
  localStorage.setItem("assignments", JSON.stringify(assignments));
};
```

---

### 🎨 Styling

#### `index.css`

**Location**: `src/index.css`  
**Contains**:

1. Tailwind directives
2. Custom CSS classes
3. Animations

**Structure**:

```css
/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component classes */
@layer components {
  .btn-primary {
    /* ... */
  }
  .btn-secondary {
    /* ... */
  }
  .card {
    /* ... */
  }
  .input-field {
    /* ... */
  }
  .label {
    /* ... */
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Generated Directories

### `node_modules/`

**Auto-generated**: By `npm install`  
**Contents**: All project dependencies (React, Vite, Tailwind, etc.)  
**Size**: ~200 MB (should be in `.gitignore`)  
**Do not edit**: Managed by npm

### `dist/`

**Generated by**: `npm run build`  
**Contents**: Production-ready optimized files  
**Structure**:

```
dist/
├── index.html          # Entry HTML
├── assets/
│   ├── index-[hash].js    # Bundled JS (minified)
│   └── index-[hash].css   # Bundled CSS (purged)
└── ...
```

**Usage**: Deploy this folder to hosting service

---

## Public Directory

### `public/`

**Purpose**: Static assets served as-is  
**Common files**:

- Favicon
- Logo images
- Static JSON files
- robots.txt

**Access in code**:

```jsx
<img src="/logo.png" /> // Served from public/
```

---

## Documentation Files

| File                       | Purpose                                  |
| -------------------------- | ---------------------------------------- |
| `README.md`                | Main project overview, features, setup   |
| `SETUP.md`                 | Quick 5-minute setup guide               |
| `ARCHITECTURE.md`          | Component structure, design decisions    |
| `DEPLOYMENT.md`            | Hosting guides (Netlify, Vercel, Docker) |
| `TESTING_REPORT.md`        | Manual test results                      |
| `VERIFICATION_COMPLETE.md` | Feature verification checklist           |
| `NAVIGATION_MAP.md`        | User flow and navigation paths           |
| `QUICKSTART.md`            | Quick reference for common tasks         |

---

## Size Breakdown

| Directory       | Size (approx) |
| --------------- | ------------- |
| `src/`          | ~50 KB        |
| `public/`       | ~5 KB         |
| `node_modules/` | ~200 MB       |
| `dist/` (build) | ~170 KB       |
| Documentation   | ~100 KB       |

**Total project** (with node_modules): ~200 MB  
**Git repository** (without node_modules): ~200 KB  
**Production bundle**: ~170 KB (~60 KB gzipped)

---

## File Count

- **Total files**: ~15 source files + 20,000+ in node_modules
- **React components**: 9
- **Config files**: 6
- **Documentation**: 8
- **Utils**: 2

---

## Import/Export Pattern

### Typical Import Chain

```
index.html
  └─ main.jsx
      └─ App.jsx
          ├─ Login.jsx
          ├─ Header.jsx
          ├─ StudentView.jsx
          │   ├─ AssignmentCard.jsx
          │   ├─ ConfirmSubmissionModal.jsx
          │   │   └─ Modal.jsx
          │   └─ ProgressBar.jsx
          └─ AdminView.jsx
              ├─ AssignmentCard.jsx
              ├─ AssignmentForm.jsx
              │   └─ Modal.jsx
              └─ ProgressBar.jsx
```

### Utils Import Pattern

```javascript
// Any component
import { getAssignments, addSubmission } from "../utils/storageUtils";
```

---

## Summary

**Well-organized structure with:**
✅ Clear separation of concerns  
✅ Reusable components  
✅ Centralized utilities  
✅ Comprehensive documentation  
✅ Easy to navigate  
✅ Scalable architecture

**Perfect for:**

- Portfolio showcase
- Learning React project structure
- Interview coding assignments
- Open-source contributions
