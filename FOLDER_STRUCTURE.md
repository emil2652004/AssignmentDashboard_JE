# 📁 Folder Structure Overview# 📁 Folder Structure Overview

Complete breakdown of the JoinEasy project structure.Complete breakdown of the JoinEasy project structure with explanations.

## Root Directory## Root Directory

`````

AssignmentDashboard_JE/JoinEasy/

├── src/                         # Source code directory├── 📄 Configuration Files

├── public/                      # Static assets│   ├── package.json              # Project metadata and dependencies

├── node_modules/                # Dependencies (auto-generated)│   ├── package-lock.json         # Locked dependency versions

├── dist/                        # Production build (generated)│   ├── vite.config.js           # Vite build configuration

││   ├── tailwind.config.js       # Tailwind CSS customization

├── 📄 Configuration Files│   ├── postcss.config.js        # PostCSS plugins config

│   ├── package.json             # Project metadata and dependencies│   ├── index.html               # HTML entry point

│   ├── package-lock.json        # Locked dependency versions│   ├── .gitignore               # Git ignore rules

│   ├── vite.config.js          # Vite build configuration│   ├── Dockerfile               # Docker container config

│   ├── tailwind.config.js      # Tailwind CSS customization│   ├── .dockerignore            # Docker ignore rules

│   ├── postcss.config.js       # PostCSS plugins config│   └── docker-compose.yml       # Docker Compose setup

│   ├── index.html              # HTML entry point│

│   └── .gitignore              # Git ignore rules├── 📚 Documentation

││   ├── README.md                # Main project documentation

└── 📚 Documentation│   ├── SETUP.md                 # Quick setup guide

    ├── README.md                # Main project documentation│   ├── ARCHITECTURE.md          # Architecture & design decisions

    ├── SETUP.md                 # Quick setup guide│   ├── DEPLOYMENT.md            # Deployment guides

    ├── ARCHITECTURE.md          # Architecture & design decisions│   ├── TESTING_REPORT.md        # Test results

    └── FOLDER_STRUCTURE.md      # This file│   ├── VERIFICATION_COMPLETE.md # Feature verification

```│   ├── NAVIGATION_MAP.md        # User flow documentation

│   └── QUICKSTART.md            # Quick reference guide

## Source Directory (`src/`)│

├── 📂 src/                      # Source code directory

### Complete Structure├── 📂 public/                   # Static assets

├── 📂 node_modules/             # Dependencies (auto-generated)

```└── 📂 dist/                     # Production build (generated)

src/```

├── 🎨 Styling

│   └── index.css                # Global styles, Tailwind directives, custom CSS---

│

├── 🚀 Entry Points## Source Directory (`src/`)

│   ├── main.jsx                 # React app entry point

│   └── App.jsx                  # Main app component with routing logic### Complete Structure

│

├── 🧩 components/               # React components (UI building blocks)```

│   ├── Header.jsx               # Top navigation bar (shared)src/

│   ├── Login.jsx                # Login/authentication page├── 🎨 Styling

│   ├── StudentView.jsx          # Student dashboard│   └── index.css                # Global styles, Tailwind directives, custom CSS

│   ├── AdminView.jsx            # Professor dashboard│

│   ├── AssignmentCard.jsx       # Assignment display card (reusable)├── 🚀 Entry Points

│   ├── AssignmentForm.jsx       # Create/Edit assignment form modal│   ├── main.jsx                 # React app entry point

│   ├── ConfirmSubmissionModal.jsx  # Double-verification modal│   └── App.jsx                  # Main app component with routing logic

│   ├── Modal.jsx                # Base modal component (reusable)│

│   └── ProgressBar.jsx          # Progress indicator (reusable)├── 🧩 components/               # React components (UI building blocks)

││   ├── Header.jsx               # Top navigation bar (shared)

├── 📊 data/                     # Data management│   ├── Login.jsx                # Login/authentication page

│   └── mockData.js              # Initial seed data (users, assignments)│   ├── StudentView.jsx          # Student dashboard

││   ├── AdminView.jsx            # Professor dashboard

└── 🛠️ utils/                    # Utility functions│   ├── AssignmentCard.jsx       # Assignment display card (reusable)

    └── storageUtils.js          # localStorage CRUD operations│   ├── AssignmentForm.jsx       # Create/Edit assignment form modal

```│   ├── ConfirmSubmissionModal.jsx  # Double-verification submission modal

│   ├── Modal.jsx                # Base modal component (reusable)

## Detailed File Breakdown│   └── ProgressBar.jsx          # Progress indicator (reusable)

│

### 📄 Configuration Files├── 📊 data/                     # Data management

│   └── mockData.js              # Initial seed data (users, assignments)

#### `package.json`│

```json└── 🛠️ utils/                    # Utility functions

{    └── storageUtils.js          # localStorage CRUD operations

  "name": "join-easy-dashboard",```

  "version": "1.0.0",

  "type": "module",---

  "dependencies": {

    "react": "^18.2.0",## Detailed File Breakdown

    "react-dom": "^18.2.0"

  },### 📄 Configuration Files

  "devDependencies": {

    "vite": "^5.0.0",#### `package.json`

    "tailwindcss": "^3.4.7"

  },```json

  "scripts": {{

    "dev": "vite",  "name": "joineasy",

    "build": "vite build",  "version": "1.0.0",

    "preview": "vite preview"  "type": "module",

  }  "dependencies": {

}    "react": "^18.2.0",

```    "react-dom": "^18.2.0"

**Purpose**: Defines project dependencies, scripts, and metadata.  },

  "devDependencies": {

#### `vite.config.js`    "vite": "^5.0.0",

```javascript    "tailwindcss": "^3.4.7"

import { defineConfig } from 'vite'    // ... more dev dependencies

import react from '@vitejs/plugin-react'  },

  "scripts": {

export default defineConfig({    "dev": "vite",

  plugins: [react()],    "build": "vite build",

  server: { port: 3000 }    "preview": "vite preview"

})  }

```}

**Purpose**: Configures Vite build tool (plugins, server settings).```



#### `tailwind.config.js`**Purpose**: Defines project dependencies, scripts, and metadata.

```javascript

export default {#### `vite.config.js`

  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {```javascript

    extend: {import { defineConfig } from "vite";

      colors: { primary: { /* blue palette */ } },import react from "@vitejs/plugin-react";

      animation: { fadeIn: 'fadeIn 0.5s ease-in-out' }

    }export default defineConfig({

  }  plugins: [react()],

}  server: {

```    port: 3000, // Dev server port

**Purpose**: Customizes Tailwind CSS (colors, animations).  },

});

#### `index.html````

```html

<!DOCTYPE html>**Purpose**: Configures Vite build tool (plugins, server settings, build options).

<html lang="en">

  <head>#### `tailwind.config.js`

    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />```javascript

    <title>JoinEasy - Assignment Dashboard</title>export default {

  </head>  content: ["./index.html", "./src/**/*.{js,jsx}"],

  <body>  theme: {

    <div id="root"></div>    extend: {

    <script type="module" src="/src/main.jsx"></script>      colors: {

  </body>        primary: {

</html>          /* blue palette */

```        },

**Purpose**: HTML entry point. Vite injects React app into `#root`.      },

      animation: {

---        fadeIn: "fadeIn 0.5s ease-in-out",

      },

### 🧩 Components Directory    },

  },

#### `Header.jsx`};

**Location**: `src/components/Header.jsx`  ```

**Used by**: StudentView, AdminView

**Props**: `user`, `onLogout`  **Purpose**: Customizes Tailwind CSS (colors, animations, purge settings).

**Features**:

- Blue logo (JE) - consistent across all roles#### `index.html`

- User name and role display

- Avatar with user initials```html

- Logout button<!DOCTYPE html>

- Sticky positioning<html lang="en">

  <head>

#### `Login.jsx`    <meta charset="UTF-8" />

**Location**: `src/components/Login.jsx`      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

**State**: `selectedUser`, `userType` (student/professor)      <title>JoinEasy - Assignment Dashboard</title>

**Features**:  </head>

- Animated toggle between student/professor modes  <body>

- Dropdown user selection    <div id="root"></div>

- "Try Demo Account" quick access    <script type="module" src="/src/main.jsx"></script>

- Role-based styling  </body>

</html>

#### `StudentView.jsx````

**Location**: `src/components/StudentView.jsx`

**State**: `assignments`, `filter`, `showConfirmModal`, `selectedAssignment`  **Purpose**: HTML entry point. Vite injects React app into `#root`.

**Features**:

- Progress cards (Total, Completed, Pending)---

- Assignment filtering (All/Pending/Submitted)

- Assignment submission flow### 🧩 Components Directory

- Progress tracking

#### `Header.jsx` (Shared Component)

#### `AdminView.jsx`

**Location**: `src/components/AdminView.jsx`  **Location**: `src/components/Header.jsx`

**State**: `assignments`, `students`, `expandedAssignment`, `showCreateForm`  **Used by**: StudentView, AdminView

**Features**:**Props**: `user`, `onLogout`

- Statistics cards (Total Assignments, Students, Avg Completion)**Features**:

- Create/edit assignment forms

- Student progress tracking- Blue logo (JE) - consistent across roles

- Expandable detail views- User name and role display

- Avatar with user initials

#### `AssignmentCard.jsx`- Logout button

**Location**: `src/components/AssignmentCard.jsx`  - Sticky positioning

**Props**: `assignment`, `onSubmit`, `onEdit`, `onDelete`, `showProgress`

**Used by**: StudentView, AdminView  **Key Code**:

**Variants**:

- **Student**: Shows submit button, status badge```jsx

- **Professor**: Shows edit/delete, progress bar<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600">

  <span className="text-white">JE</span>

#### `AssignmentForm.jsx`</div>

**Location**: `src/components/AssignmentForm.jsx`  ```

**Props**: `isOpen`, `onClose`, `onSuccess`, `assignment`, `userId`

**State**: `formData`, `errors`  #### `Login.jsx` (Entry Page)

**Fields**: Title, Description, Due Date, Drive Link

**Location**: `src/components/Login.jsx`

#### `ConfirmSubmissionModal.jsx`**State**: `selectedUser`, `userType` (student/professor)

**Location**: `src/components/ConfirmSubmissionModal.jsx`  **Features**:

**Props**: `isOpen`, `onClose`, `onConfirm`, `assignmentTitle`

**Purpose**: Double-verification before submission- Animated toggle between student/professor

- Dropdown user selection

#### `Modal.jsx`- "Try Demo Account" quick access

**Location**: `src/components/Modal.jsx`  - Role-based styling

**Props**: `isOpen`, `onClose`, `title`, `children`, `size`

**Used by**: AssignmentForm, ConfirmSubmissionModal  **Key Code**:

**Features**: Backdrop overlay, ESC key support

```jsx

#### `ProgressBar.jsx`const [userType, setUserType] = useState("student");

**Location**: `src/components/ProgressBar.jsx`  // Toggle changes available users

**Props**: `percentage`, `label`, `showLabel`  const currentUsers = userType === "student" ? studentUsers : adminUsers;

**Used by**: StudentView, AdminView  ```

**Features**: Color-coded, animated fill

#### `StudentView.jsx` (Student Dashboard)

---

**Location**: `src/components/StudentView.jsx`

### 📊 Data Directory**State**: `assignments`, `filter`, `showConfirmModal`, `selectedAssignment`

**Features**:

#### `mockData.js`

**Location**: `src/data/mockData.js`  - Progress cards (Total, Completed, Pending)

**Purpose**: Seed initial data for demo  - Assignment filtering (All/Pending/Submitted)

**Contains**:- Assignment submission

- 6 users (4 students, 2 professors)- Progress tracking

- 4 sample assignments

- 6 sample submissions**Data Flow**:



**Function**:1. `useEffect` → `getAssignments()` → populate assignments

```javascript2. Filter → update displayed assignments

export const initializeData = () => {3. Submit → `ConfirmSubmissionModal` → `addSubmission()`

  if (!localStorage.getItem('users')) {

    localStorage.setItem('users', JSON.stringify(mockUsers));#### `AdminView.jsx` (Professor Dashboard)

    localStorage.setItem('assignments', JSON.stringify(mockAssignments));

    localStorage.setItem('submissions', JSON.stringify(mockSubmissions));**Location**: `src/components/AdminView.jsx`

  }**State**: `assignments`, `students`, `expandedAssignment`, `showCreateForm`, `editingAssignment`

};**Features**:

```

- Statistics cards (Total assignments, students, avg completion)

---- Create assignment button

- Assignment list with edit/delete

### 🛠️ Utils Directory- Student progress tracking

- Expandable detail views

#### `storageUtils.js`

**Location**: `src/utils/storageUtils.js`  **Data Flow**:

**Purpose**: localStorage CRUD operations

1. `useEffect` → `getAssignments()`, `getUsers()` → populate data

**Functions**:2. Create → `AssignmentForm` → `addAssignment()`

3. Edit → `AssignmentForm` (pre-filled) → `updateAssignment()`

| Function | Purpose |4. View Details → Calculate submitted/pending students

|----------|---------|

| `getUsers()` | Retrieve all users |#### `AssignmentCard.jsx` (Reusable Component)

| `getAssignments()` | Retrieve all assignments |

| `getSubmissions()` | Retrieve all submissions |**Location**: `src/components/AssignmentCard.jsx`

| `addAssignment(data)` | Create new assignment |**Props**: `assignment`, `onSubmit`, `onEdit`, `onDelete`, `showProgress`

| `updateAssignment(id, data)` | Update assignment |**Used by**: StudentView, AdminView

| `deleteAssignment(id)` | Delete assignment |**Variants**:

| `addSubmission(data)` | Record submission |

| `isSubmitted(studentId, assignmentId)` | Check submission status |- **Student**: Shows submit button, status badge

| `getStudentProgress(studentId)` | Calculate progress |- **Professor**: Shows edit/delete, progress bar, student stats

| `getCurrentUser()` | Get logged-in user |

| `setCurrentUser(user)` | Set logged-in user |**Conditional Rendering**:

| `clearCurrentUser()` | Logout |

```jsx

---{onSubmit && <button onClick={onSubmit}>Submit</button>}

{onEdit && <button onClick={onEdit}>Edit</button>}

### 🎨 Styling{showProgress && <ProgressBar percentage={...} />}

```

#### `index.css`

**Location**: `src/index.css`  #### `AssignmentForm.jsx` (Form Modal)

**Contains**:

1. Tailwind directives**Location**: `src/components/AssignmentForm.jsx`

2. Custom CSS classes**Props**: `isOpen`, `onClose`, `onSuccess`, `assignment` (optional), `userId`

3. Animations**State**: `formData`, `errors`

**Fields**:

**Structure**:

```css- Title (required)

/* Tailwind directives */- Description (required)

@tailwind base;- Due Date (required)

@tailwind components;- Drive Link (required, URL format)

@tailwind utilities;

**Validation**:

/* Custom component classes */

@layer components {```javascript

  .btn-primary { /* ... */ }if (!formData.driveLink.startsWith("http")) {

  .card { /* ... */ }  errors.driveLink = "Please enter a valid URL";

  .input-field { /* ... */ }}

}```



/* Animations */#### `ConfirmSubmissionModal.jsx` (Confirmation Modal)

@keyframes fadeIn {

  from { opacity: 0; transform: translateY(-10px); }**Location**: `src/components/ConfirmSubmissionModal.jsx`

  to { opacity: 1; transform: translateY(0); }**Props**: `isOpen`, `onClose`, `onConfirm`, `assignmentTitle`

}**Purpose**: Double-verification before submission

```**Flow**: User clicks Submit → Modal opens → User confirms → Submission recorded



---#### `Modal.jsx` (Base Modal)



## Generated Directories**Location**: `src/components/Modal.jsx`

**Props**: `isOpen`, `onClose`, `title`, `children`, `size`

### `node_modules/`**Used by**: AssignmentForm, ConfirmSubmissionModal

**Auto-generated**: By `npm install`  **Features**:

**Contents**: All project dependencies

**Size**: ~200 MB (in `.gitignore`)  - Backdrop overlay

**Do not edit**: Managed by npm- Click outside to close

- Escape key support

### `dist/`- Responsive sizing

**Generated by**: `npm run build`

**Contents**: Production-ready optimized files  #### `ProgressBar.jsx` (Visual Indicator)

**Structure**:

```**Location**: `src/components/ProgressBar.jsx`

dist/**Props**: `percentage`, `label`, `showLabel`

├── index.html              # Entry HTML**Used by**: StudentView (progress cards), AdminView (assignment progress)

├── assets/**Features**:

│   ├── index-[hash].js     # Bundled JS (minified)

│   └── index-[hash].css    # Bundled CSS (purged)- Color-coded by percentage (red < 33%, yellow < 66%, green ≥ 66%)

```- Animated fill

**Usage**: Deploy this folder to hosting- Optional label display



------



## Import/Export Pattern### 📊 Data Directory



### Typical Import Chain#### `mockData.js`



```**Location**: `src/data/mockData.js`

index.html**Purpose**: Seed initial data for demo

  └─ main.jsx**Contains**:

      └─ App.jsx

          ├─ Login.jsx- 6 users (4 students, 2 professors)

          ├─ Header.jsx- 4 sample assignments

          ├─ StudentView.jsx- 6 sample submissions

          │   ├─ AssignmentCard.jsx

          │   ├─ ConfirmSubmissionModal.jsx**Function**:

          │   │   └─ Modal.jsx

          │   └─ ProgressBar.jsx```javascript

          └─ AdminView.jsxexport const initializeData = () => {

              ├─ AssignmentCard.jsx  if (!localStorage.getItem("users")) {

              ├─ AssignmentForm.jsx    // Populate localStorage with mock data

              │   └─ Modal.jsx  }

              └─ ProgressBar.jsx};

`````

### Utils Import Pattern**Called in**: `App.jsx` on mount

```javascript---

// Any component

import { getAssignments, addSubmission } from '../utils/storageUtils';### 🛠️ Utils Directory

```

#### `storageUtils.js`

---

**Location**: `src/utils/storageUtils.js`

## File Statistics**Purpose**: localStorage CRUD operations

**Functions**:

### Size Breakdown

| Function | Purpose |

| Directory | Size (approx) || -------------------------------------- | -------------------------- |

|-----------|---------------|| `getUsers()` | Retrieve all users |

| `src/` | ~50 KB || `getAssignments()` | Retrieve all assignments |

| `public/` | ~5 KB || `getSubmissions()` | Retrieve all submissions |

| `node_modules/` | ~200 MB || `addAssignment(data)` | Create new assignment |

| `dist/` (build) | ~170 KB || `updateAssignment(id, data)` | Update assignment |

| Documentation | ~100 KB || `deleteAssignment(id)` | Delete assignment |

| `addSubmission(data)` | Record submission |

### File Counts| `isSubmitted(studentId, assignmentId)` | Check submission status |

| `getStudentProgress(studentId)` | Calculate student progress |

- **Total files**: ~15 source files| `getCurrentUser()` | Get logged-in user |

- **React components**: 9| `setCurrentUser(user)` | Set logged-in user |

- **Config files**: 6| `clearCurrentUser()` | Logout |

- **Documentation**: 4

- **Utils**: 2**Example**:

---```javascript

export const addAssignment = (assignment) => {

## Summary const assignments = getAssignments();

const newAssignment = {

**Well-organized structure with:** id: Date.now().toString(),

✅ Clear separation of concerns ...assignment,

✅ Reusable components createdAt: new Date().toISOString(),

✅ Centralized utilities };

✅ Comprehensive documentation assignments.push(newAssignment);

✅ Easy to navigate localStorage.setItem("assignments", JSON.stringify(assignments));

✅ Scalable architecture };

````

**Perfect for:**

- Portfolio showcase---

- Learning React project structure

- Interview coding assignments### 🎨 Styling

- Open-source contributions

#### `index.css`

---

**Location**: `src/index.css`

© 2025 JoinEasy - Assignment Management Dashboard  **Contains**:

Built with React, Tailwind CSS, and localStorage

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
````

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
