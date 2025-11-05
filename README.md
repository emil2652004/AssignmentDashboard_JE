# JoinEasy - Assignment Management Dashboard

A modern, intuitive student-assignment management system built with React, Vite, and Tailwind CSS. Features role-based dashboards for both students and professors, with support for individual and group assignments, real-time progress tracking, and a beautiful glassmorphism UI.

![React](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4.7-38B2AC)

---

## 📋 Table of Contents

- [Features](#-features)
- [Frontend Design Choices](#-frontend-design-choices)
- [Setup Instructions](#-setup-instructions)
- [Component Structure](#-component-structure)
- [UI Flow & Screenshots](#-ui-flow--screenshots)
- [Usage Guide](#-usage-guide)
- [Tech Stack](#-tech-stack)

---

## 🌟 Features

### For Students 👨‍🎓

- **📚 Assignment Dashboard**: View all assignments with real-time status updates
- **📊 Progress Tracking**: Visual progress bars showing completion percentage
- **👥 Group Assignments**: Support for group submissions with leader-based workflow
- **✅ Two-Step Submission**: Confirm submissions through secure verification flow
- **🔍 Smart Filtering**: Filter by All, Pending, or Submitted assignments
- **⏰ Due Date Alerts**: Color-coded warnings for overdue and upcoming deadlines
- **📱 Responsive Design**: Seamless experience across all devices
- **🔗 Direct Links**: Quick access to submission folders via cloud links

### For Professors 👨‍🏫

- **📝 Assignment Management**: Create, edit, and delete assignments with ease
- **👥 Group Builder**: Create and manage student groups for group assignments
- **📊 Progress Analytics**: Track submission rates and student performance
- **🎯 Course Management**: Organize assignments by courses and semesters
- **👀 Student Monitoring**: View detailed submission status for each student
- **📈 Visual Analytics**: Progress bars and completion statistics
- **🔄 Real-Time Updates**: Instant feedback on assignment submissions
- **📂 Cloud Integration**: Attach OneDrive/Google Drive links for submissions

### General Features ✨

- **🎨 Modern UI**: Glassmorphism design with gradient accents
- **🔐 Role-Based Access**: Separate dashboards for students and professors
- **💾 Local Storage**: No backend required - data persists in browser
- **⚡ Fast Performance**: Built with Vite for lightning-fast development
- **🎭 Smooth Animations**: Polished transitions and hover effects
- **🌈 Color-Coded Status**: Intuitive visual indicators for assignment states
- **📱 Mobile-First**: Responsive design optimized for all screen sizes
- **♿ Accessible**: WCAG-compliant color contrast and semantic HTML

---

## 🎨 Frontend Design Choices

### Design Philosophy

The application follows a **modern, clean, and professional** design approach with emphasis on:

1. **User Experience (UX)**

   - Minimal cognitive load with clear visual hierarchy
   - Consistent interaction patterns across all components
   - Two-step confirmation for critical actions (submissions)
   - Real-time feedback and loading states

2. **Visual Design**

   - **Glassmorphism**: Frosted glass effect with backdrop blur
   - **Gradient Accents**: Blue-indigo for students, purple-pink for professors
   - **Soft Shadows**: Multi-layered shadows for depth perception
   - **Rounded Corners**: Modern 2xl/3xl border radius for cards
   - **Animated Backgrounds**: Subtle pulsing gradient orbs

3. **Color System**
   - **Primary**: Blue (600-700) for students, Purple (600-700) for professors
   - **Success**: Green (500-700) for completed assignments
   - **Warning**: Yellow/Orange (500-700) for upcoming deadlines
   - **Danger**: Red/Pink (500-700) for overdue assignments
   - **Neutral**: Gray (50-900) for backgrounds and text

### UI Components

#### Cards

- **Shadow Elevation**: Base shadow with hover increase for interactivity
- **Border Treatment**: Subtle borders with hover color changes
- **Padding Scale**: Consistent 4-6 spacing units
- **Hover Effects**: Scale transforms (1.02-1.05) with smooth transitions

#### Buttons

- **Primary**: Gradient backgrounds with shadow lift
- **Secondary**: White/gray with border and subtle hover
- **Danger**: Red-pink gradient for destructive actions
- **States**: Disabled (50% opacity), Loading (spinner), Hover (scale + shadow)

#### Forms

- **Input Fields**: Backdrop blur with focus ring animation
- **Validation**: Inline error messages with icons
- **Labels**: Bold text with icon prefixes
- **Dropdowns**: Custom styled with chevron indicators

#### Progress Bars

- **Gradient Fill**: Color-coded based on completion percentage
- **Smooth Animation**: 500ms ease-out transitions
- **Shadow Effects**: Inner shadow on track, outer on fill
- **Responsive Width**: Adapts to container size

### Responsive Strategy

```css
/* Breakpoint System */
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md-lg)
- Desktop: > 1024px (lg+)
```

**Approach:**

- Mobile-first development
- Grid layouts collapse to single column on mobile
- Navigation adapts from horizontal to vertical
- Cards stack on smaller screens
- Font sizes scale proportionally

### Accessibility

- **Semantic HTML**: Proper heading hierarchy (h1-h6)
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full tab-index support
- **Color Contrast**: WCAG AA compliant (4.5:1 minimum)
- **Focus Indicators**: Visible focus rings on all interactive elements

### Animation Strategy

- **Micro-interactions**: Hover scales, button lifts
- **Page Transitions**: Fade-in animations (0.5s)
- **Loading States**: Spinners and skeleton screens
- **Duration**: Fast (200ms) for micro, Slow (500ms) for page transitions
- **Easing**: ease-out for natural motion

---

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v7.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/emil2652004/AssignmentDashboard_JE.git
   cd AssignmentDashboard_JE
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173/`

4. **Build for Production** (Optional)

   ```bash
   npm run build
   ```

   Production files will be in the `dist/` folder.

5. **Preview Production Build** (Optional)

   ```bash
   npm run preview
   ```

### Demo Accounts

The application comes with pre-populated demo data:

#### Students

- Alice Johnson - alice@student.edu
- Bob Smith - bob@student.edu
- Carlo Davis - carlo@student.edu
- David Wilson - david@student.edu

#### Professors

- Dr. Emily Brown - emily.brown@university.edu
- Prof. Michael Chen - michael.chen@university.edu


**Note:** No password required - just select an account to login!

### Environment Setup

No environment variables required! The app uses localStorage for data persistence.

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📦 Component Structure

### Architecture Overview

```
src/
├── components/           # React Components
│   ├── AdminView.jsx    # Professor Dashboard (Main)
│   ├── StudentView.jsx  # Student Dashboard (Main)
│   ├── Login.jsx        # Authentication Page
│   ├── Register.jsx     # User Registration
│   ├── Header.jsx       # Top Navigation Bar
│   │
│   ├── AssignmentCard.jsx      # Assignment Display Card
│   ├── AssignmentForm.jsx      # Create/Edit Assignment Modal
│   ├── ConfirmSubmissionModal.jsx  # Submission Confirmation
│   │
│   ├── CourseForm.jsx   # Create/Edit Course Modal
│   ├── ProgressBar.jsx  # Visual Progress Indicator
│   └── Modal.jsx        # Reusable Modal Container
│
├── data/
│   └── mockData.js      # Demo Data & Initialization
│
├── utils/
│   └── storageUtils.js  # LocalStorage CRUD Operations
│
├── App.jsx              # Root Component & Routing
├── main.jsx            # React Entry Point
└── index.css           # Global Styles & Tailwind
```

### Component Hierarchy

```
App
├── Header
│   └── User Avatar & Logout
│
├── Login / Register (Auth Pages)
│   ├── Role Toggle (Student/Professor)
│   ├── Account Selector
│   └── Form Inputs
│
├── AdminView (Professor Dashboard)
│   ├── Stats Cards (Courses, Assignments)
│   ├── Course List
│   │   └── Course Cards
│   ├── Assignment List
│   │   └── AssignmentCard
│   │       ├── Progress Bar
│   │       └── Student List (Expandable)
│   ├── CourseForm Modal
│   └── AssignmentForm Modal
│       └── Group Builder (for group assignments)
│
└── StudentView (Student Dashboard)
    ├── Stats Cards (Progress, Courses, Assignments)
    ├── Course List
    │   └── Course Cards
    ├── Assignment Filters (All/Pending/Submitted)
    ├── Assignment List
    │   └── AssignmentCard
    │       ├── Status Badge
    │       ├── Group Info (if group assignment)
    │       └── Submit Button
    └── ConfirmSubmissionModal
        ├── Step 1: Initial Confirmation
        ├── Step 2: Final Confirmation
        └── Step 3: Success Message
```

### Key Component Details

#### **AdminView.jsx** (450+ lines)

**Purpose:** Professor dashboard

- Manages courses and assignments
- Displays analytics and progress tracking
- Handles CRUD operations for courses/assignments

**State:**

- `courses`, `assignments`, `selectedCourse`
- `showCreateForm`, `editingAssignment`

**Key Functions:**

- `handleCreateAssignment()`, `handleEditAssignment()`
- `handleDeleteAssignment()`, `calculateProgress()`

#### **StudentView.jsx** (330+ lines)

**Purpose:** Student dashboard

- Displays enrolled courses and assignments
- Handles assignment submissions
- Shows progress tracking

**State:**

- `courses`, `assignments`, `selectedCourse`
- `filter`, `progress`, `selectedAssignment`

**Key Functions:**

- `handleMarkSubmitted()`, `getFilteredAssignments()`
- `getCourseProgress()`, `loadData()`

#### **AssignmentForm.jsx** (480+ lines)

**Purpose:** Create/Edit assignment modal

- Form validation
- Group builder for group assignments
- Auto-enrollment and student management

**Features:**

- Dynamic course selection
- Group creation with drag-and-drop feel
- Submission type toggle (Individual/Group)
- Validation for required fields and group assignments

#### **AssignmentCard.jsx** (200+ lines)

**Purpose:** Display assignment information

- Shows assignment details, due dates, status
- Different views for students vs professors
- Expandable for professors (show student list)

**Props:**

- `assignment`, `userRole`, `userId`
- `onEdit`, `onDelete`, `onMarkSubmitted`

#### **storageUtils.js** (400+ lines)

**Purpose:** Data management layer

- LocalStorage CRUD operations
- Auto-enrollment logic
- Progress calculations
- Group management

**Key Functions:**

```javascript
// Users
-getUsers(),
  registerUser(),
  getCurrentUser() -
    // Courses
    getCourses(),
  addCourse(),
  updateCourse(),
  deleteCourse() -
    // Assignments
    getAssignments(),
  addAssignment(),
  updateAssignment() -
    // Submissions
    addAcknowledgement(),
  isSubmitted(),
  getSubmissionsByStudent() -
    // Groups
    addGroup(),
  getGroupsByAssignment(),
  getStudentGroupForAssignment() -
    // Progress
    getStudentProgress(),
  getAssignmentProgress();
```

---

## 🖼️ UI Flow & Screenshots

### Authentication Flow

```
┌─────────────┐
│   Landing   │
│   (Login)   │
└──────┬──────┘
       │
       ├─► Select Role (Student/Professor)
       │
       ├─► Choose Account
       │
       └─► Login
           │
           ├─► Student Dashboard
           │
           └─► Professor Dashboard
```

**Login Page Features:**

- Animated gradient background with pulsing orbs
- Glassmorphism card design
- Role toggle (Student/Professor)
- Account dropdown with email
- Gradient submit button
- Link to registration

**Register Page Features:**

- Icon-labeled input fields
- Interactive role selection cards
- Real-time validation
- Loading states
- Success animations

### Student Workflow

```
Login → Dashboard → Select Course → View Assignments → Submit Assignment
   │                                                           │
   └─► View Progress                                          │
                                                               ├─► Confirm Step 1
                                                               ├─► Confirm Step 2
                                                               └─► Success!
```

**Dashboard Features:**

- 3 stat cards (Progress, Courses, Assignments)
- Course grid with hover effects
- Assignment filters (All/Pending/Submitted)
- Color-coded status badges

**Assignment Card Features:**

- Gradient top border (color-coded by status)
- Due date with countdown
- Submission type badge
- Group information (if applicable)
- Submit button with icon
- Direct link to submission folder

**Submission Flow:**

- Step 1: Review assignment details
- Step 2: Final confirmation with warning
- Step 3: Success message with auto-close

### Professor Workflow

```
Login → Dashboard → Create Course → Create Assignment → Monitor Progress
   │                                      │
   └─► View Analytics                     ├─► Set as Individual
                                           └─► Set as Group
                                                 │
                                                 └─► Build Groups
                                                       ├─► Add Group
                                                       ├─► Assign Students
                                                       └─► Set Leader
```

**Dashboard Features:**

- Stats overview (total courses, assignments)
- Course management grid
- Assignment list by course
- Progress bars for each assignment

**Assignment Creation:**

- Course auto-selection
- Form validation
- Group builder interface
- Member assignment checkboxes
- Leader selection buttons

**Group Builder Features:**

- Add/Remove groups dynamically
- Drag students to groups (checkbox UI)
- Set group leader
- Real-time member count
- Validation (all students assigned, leaders set)

---

## 📖 Usage Guide

### For Students

1. **Login**

   - Select "Student" role
   - Choose your account from dropdown
   - Click "Continue to Dashboard"

2. **View Assignments**

   - Click on a course card to view its assignments
   - Use filters to show All/Pending/Submitted
   - Check due dates and submission links

3. **Submit Assignment**

   - Click "Mark as Submitted" on assignment card
   - Confirm you've uploaded your work
   - Double-confirm submission
   - See success message

4. **Track Progress**
   - View overall progress percentage
   - Check individual assignment status
   - Monitor upcoming deadlines

### For Professors

1. **Create Course**

   - Click "+ Create New Course"
   - Fill in course details
   - Students auto-enroll

2. **Create Assignment**
   - Select a course
   - Click "+ Create Assignment"
   - Fill in assignment details
   - Choose Individual or Group submission
3. **Create Groups** (for group assignments)

   - Select "Group" submission type
   - Click "+ Add Group"
   - Name the group
   - Check students to add to group
   - Click "Set Leader" for group leader
   - Repeat for all groups
   - Ensure all students are assigned

4. **Monitor Progress**
   - Click "View Details" on assignment card
   - See which students submitted
   - Check submission timestamps
   - View progress bar

---

## 🛠️ Tech Stack

### Core Technologies

- **React 18.2.0** - UI library
- **Vite 5.0.0** - Build tool & dev server
- **Tailwind CSS 3.4.7** - Utility-first CSS framework

### Additional Libraries

- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### Development Tools

- **ESLint** - Code linting
- **VS Code** - Recommended IDE

### Browser APIs

- **LocalStorage** - Data persistence
- **Date API** - Date formatting and calculations

---

## 🎯 Key Features Explained

### Auto-Enrollment System

- All students automatically enrolled in all courses
- Bidirectional relationship (courses ↔ students)
- Updates in real-time

### Group Assignment Workflow

1. Professor creates assignment with "Group" type
2. Professor creates groups and assigns students
3. Professor sets group leader for each group
4. Only group leader can submit
5. Submission marks all group members as submitted

### Progress Calculation

```javascript
progress = (submitted assignments / total enrolled assignments) × 100
```

- Only counts assignments from enrolled courses
- Handles both individual and group submissions
- Updates in real-time after submission

### Two-Step Verification

- Prevents accidental submissions
- Shows assignment details for review
- Warning message for irreversible action
- Success confirmation

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Emil**

- GitHub: [@emil2652004](https://github.com/emil2652004)
- Repository: [AssignmentDashboard_JE](https://github.com/emil2652004/AssignmentDashboard_JE)

---

## 🙏 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first approach
- Vite for the blazing-fast development experience

---

**Built with ❤️ using React + Vite + Tailwind CSS**

- **Clean UI**: Modern, intuitive interface with smooth animations

- **Component-Based Architecture**: Well-organized, reusable React components## 🚀 Tech Stack

## 🚀 Tech Stack- **React.js 18.2** - UI framework

- **Vite** - Build tool and dev server

| Technology | Version | Purpose |- **Tailwind CSS** - Utility-first CSS framework

|------------|---------|---------|- **localStorage** - Client-side data persistence

| **React** | 18.2.0 | UI Framework with functional components and hooks |- **React Hooks** - useState, useEffect for state management

| **Vite** | 5.0.0 | Build tool and lightning-fast dev server |

| **Tailwind CSS** | 3.4.7 | Utility-first CSS framework for responsive design |## 📁 Project Structure

| **localStorage** | Browser API | Client-side data persistence (no backend required) |

````

## 📁 Project StructureJoinEasy/

├── src/

```│   ├── components/

JoinEasy/│   │   ├── Header.jsx              # Top navigation bar

├── src/│   │   ├── Login.jsx               # Login/account selection

│   ├── components/              # React components│   │   ├── StudentView.jsx         # Student dashboard

│   │   ├── Header.jsx           # Top navigation bar│   │   ├── AdminView.jsx           # Professor dashboard

│   │   ├── Login.jsx            # Login/account selection│   │   ├── AssignmentCard.jsx      # Assignment display card

│   │   ├── StudentView.jsx      # Student dashboard│   │   ├── AssignmentForm.jsx      # Create/edit assignment form

│   │   ├── AdminView.jsx        # Professor dashboard│   │   ├── ConfirmSubmissionModal.jsx  # Double-verification modal

│   │   ├── AssignmentCard.jsx   # Reusable assignment card│   │   ├── Modal.jsx               # Reusable modal component

│   │   ├── AssignmentForm.jsx   # Create/Edit assignment form│   │   └── ProgressBar.jsx         # Progress indicator component

│   │   ├── ConfirmSubmissionModal.jsx  # Double-verification modal│   ├── data/

│   │   ├── Modal.jsx            # Reusable modal component│   │   └── mockData.js             # Mock users and assignments

│   │   └── ProgressBar.jsx      # Visual progress indicator│   ├── utils/

│   ├── data/│   │   └── storageUtils.js         # localStorage helper functions

│   │   └── mockData.js          # Initial seed data│   ├── App.jsx                     # Main app component

│   ├── utils/│   ├── main.jsx                    # React entry point

│   │   └── storageUtils.js      # localStorage CRUD operations│   └── index.css                   # Global styles with Tailwind

│   ├── App.jsx                  # Main app component & routing├── index.html

│   ├── main.jsx                 # React entry point├── package.json

│   └── index.css                # Global styles & Tailwind directives├── vite.config.js

├── public/                      # Static assets├── tailwind.config.js

├── package.json                 # Dependencies & scripts├── postcss.config.js

├── vite.config.js              # Vite configuration└── README.md

├── tailwind.config.js          # Tailwind configuration```

└── index.html                  # HTML entry point

```## 🛠️ Installation & Setup



## 🛠️ Installation & Setup### Prerequisites



### Prerequisites- **Node.js** (version 16 or higher)

- **Node.js** v16 or higher ([Download](https://nodejs.org/))- **npm** or **yarn** package manager

- **npm** (comes with Node.js)

### Installation Steps

### Installation Steps

1. **Navigate to the project directory**

1. **Clone the repository**

```bash```powershell

git clone https://github.com/emil2652004/AssignmentDashboard_JE.gitcd D:\JoinEasy

cd AssignmentDashboard_JE```

````

2. **Install dependencies**

3. **Install dependencies**

`bash`powershell

npm installnpm install

````



3. **Start the development server**3. **Start the development server**

```bash

npm run dev```powershell

```npm run dev

```

4. **Open your browser**

   - Navigate to `http://localhost:5173`The application will automatically open in your default browser at `http://localhost:3000`

   - The app will automatically reload when you make changes

### Build for Production

## 🎮 Usage

```powershell

### Demo Accountsnpm run build

```

#### Students 👨‍🎓

- **Alice Johnson** - alice@student.com### Preview Production Build

- **Bob Smith** - bob@student.com

- **Carol Davis** - carol@student.com```powershell

- **David Wilson** - david@student.comnpm run preview

```

#### Professors 👨‍🏫

- **Dr. Emily Brown** - emily@professor.com## 👥 Demo Accounts

- **Prof. Michael Chen** - michael@professor.com

### Students

> **Note**: Use the toggle on the login page to switch between Student and Professor login modes.

- **Alice Johnson** - alice@student.edu

## 📜 Available Scripts- **Bob Smith** - bob@student.edu

- **Carol Davis** - carol@student.edu

| Command | Description |- **David Wilson** - david@student.edu

|---------|-------------|

| `npm run dev` | Start development server with HMR at `http://localhost:5173` |### Professors (Admins)

| `npm run build` | Build optimized production bundle to `dist/` folder |

| `npm run preview` | Preview production build locally |- **Dr. Emily Brown** - emily.brown@university.edu

- **Prof. Michael Chen** - michael.chen@university.edu

## 🏗️ Architecture Overview

## 💡 How to Use

### Component Hierarchy

### As a Student

```

App (Main Router)1. **Login**: Select a student account from the dropdown

├── Login (Entry Point)2. **View Assignments**: See all assignments with due dates and submission status

│   ├── Toggle (Student/Professor)3. **Filter Assignments**: Use filter buttons to view All, Pending, or Submitted assignments

│   └── User Selection4. **Submit Assignment**:

│   - Click "Mark as Submitted" on an assignment

├── Header (Navigation)   - Confirm "Yes, I have submitted"

│   ├── Logo (Blue - consistent across roles)   - Final confirmation to complete submission

│   ├── User Info5. **Track Progress**: View your overall completion percentage in the overview cards

│   └── Logout Button

│### As a Professor

├── StudentView (Student Dashboard)

│   ├── Progress Cards1. **Login**: Select a professor account from the dropdown

│   ├── Assignment Filters2. **Create Assignment**:

│   ├── AssignmentCard (Multiple)   - Click "Create Assignment" button

│   ├── ConfirmSubmissionModal   - Fill in title, description, due date, and Drive link

│   └── ProgressBar   - Submit the form

│3. **View Student Progress**:

└── AdminView (Professor Dashboard)   - Click "View Details" on any assignment

    ├── Statistics Cards   - See which students have submitted and who is pending

    ├── Create Assignment Button   - View individual progress bars

    ├── AssignmentCard (Multiple)4. **Edit Assignment**: Click "Manage Assignment" → "Edit"

    └── AssignmentForm Modal5. **Delete Assignment**: Click "Manage Assignment" → "Delete"

```

## 🎨 Design Highlights

### Data Flow

- **Color-Coded Progress**:

**localStorage Structure:**

```javascript  - Green (≥80%) - Excellent

{  - Blue (≥50%) - Good

  "users": [...],           // User accounts  - Yellow (≥25%) - Fair

  "assignments": [...],     // All assignments  - Red (<25%) - Needs Attention

  "submissions": [...],     // Student submissions

  "currentUser": {...}      // Logged-in user- **Responsive Breakpoints**:

}

```  - Mobile: < 640px

  - Tablet: 640px - 1024px

**Key Design Decisions:**  - Desktop: > 1024px

1. **No Backend** - localStorage for demo simplicity and portfolio showcase

2. **Component Reusability** - AssignmentCard, Modal, ProgressBar used across views- **Accessibility**:

3. **Double Verification** - Prevents accidental submissions with confirmation flow  - Clear color contrasts

4. **Role-Based UI** - Unified white header, blue logo for all users  - Readable font sizes

5. **Responsive Design** - Mobile-first approach with Tailwind CSS  - Hover states for interactive elements

  - Focus indicators for keyboard navigation

## 🎯 Key Features in Detail

## 🔧 Customization

### Student Dashboard

- **Progress Cards**: Total, Completed, and Pending assignments at a glance### Adding New Mock Data

- **Smart Filters**: Filter by All, Pending, or Submitted status

- **Assignment Cards**: Display title, description, due date, and statusEdit `src/data/mockData.js` to add more users, assignments, or submissions.

- **Submission Flow**: Click → Confirm → Double-verify → Submit

- **Drive Integration**: Direct links to Google Drive submission folders### Styling



### Professor Dashboard  All styles use Tailwind CSS. Customize the theme in `tailwind.config.js`:

- **Statistics Overview**: Total assignments, student count, average completion

- **Create Assignments**: Form with title, description, due date, and Drive link```javascript

- **Student Tracking**: View which students submitted vs pendingtheme: {

- **Edit Functionality**: Update assignment details anytime  extend: {

- **Expandable Cards**: Click to view detailed submission status per assignment    colors: {

      primary: {

## 🚀 Deployment        // Customize primary color shades

      }

### Build for Production    }

```bash  }

npm run build}

````

This creates an optimized production build in the `dist/` folder.

### localStorage Schema

### Deploy Options

Data is stored in three keys:

**Netlify:**

- Build command: `npm run build`- `users` - User accounts (students and admins)

- Publish directory: `dist`- `assignments` - Assignment details

- `submissions` - Student submission records

**Vercel:**- `currentUser` - Currently logged-in user

- Framework preset: Vite

- Build command: `npm run build`## 📱 Mobile Responsiveness

- Output directory: `dist`

The dashboard is fully responsive with:

## 🤝 Contributing

- Stacked cards on mobile devices

Contributions are welcome! Please feel free to submit a Pull Request.- Collapsible navigation

- Touch-friendly buttons and links

## 📄 License- Optimized grid layouts for different screen sizes

MIT License - feel free to use this project for learning and portfolio purposes.## 🐛 Troubleshooting

## 👨‍💻 Author### Port Already in Use

**Emil** - [GitHub Profile](https://github.com/emil2652004)If port 3000 is busy, Vite will automatically use the next available port (3001, 3002, etc.)

## 🙏 Acknowledgments### localStorage Not Persisting

- Built as a demonstration of React best practicesMake sure your browser allows localStorage. Check browser console for any security errors.

- Inspired by modern LMS (Learning Management Systems)

- UI design influenced by Material Design and Tailwind UI### Styles Not Loading

---Ensure all dependencies are installed:

**Repository**: https://github.com/emil2652004/AssignmentDashboard_JE```powershell

npm install

© 2025 JoinEasy - Assignment Management Dashboard ```

Built with React, Tailwind CSS, and localStorage

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
