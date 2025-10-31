// Mock users data
export const mockUsers = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice@student.edu',
    role: 'student'
  },
  {
    id: 'user-2',
    name: 'Bob Smith',
    email: 'bob@student.edu',
    role: 'student'
  },
  {
    id: 'user-3',
    name: 'Carol Davis',
    email: 'carol@student.edu',
    role: 'student'
  },
  {
    id: 'user-4',
    name: 'David Wilson',
    email: 'david@student.edu',
    role: 'student'
  },
  {
    id: 'admin-1',
    name: 'Dr. Emily Brown',
    email: 'emily.brown@university.edu',
    role: 'admin'
  },
  {
    id: 'admin-2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    role: 'admin'
  }
];

// Mock assignments data
export const mockAssignments = [
  {
    id: 'assign-1',
    title: 'Introduction to React Hooks',
    description: 'Complete the tutorial on useState and useEffect hooks. Submit your code via the Drive link.',
    dueDate: '2025-11-15',
    driveLink: 'https://drive.google.com/folder/sample-1',
    createdBy: 'admin-1',
    createdAt: '2025-10-20'
  },
  {
    id: 'assign-2',
    title: 'Component Architecture Design',
    description: 'Design a component tree for a social media dashboard. Include wireframes and explanations.',
    dueDate: '2025-11-22',
    driveLink: 'https://drive.google.com/folder/sample-2',
    createdBy: 'admin-1',
    createdAt: '2025-10-25'
  },
  {
    id: 'assign-3',
    title: 'Tailwind CSS Styling Project',
    description: 'Build a responsive landing page using Tailwind CSS. Focus on mobile-first design.',
    dueDate: '2025-11-30',
    driveLink: 'https://drive.google.com/folder/sample-3',
    createdBy: 'admin-2',
    createdAt: '2025-10-28'
  },
  {
    id: 'assign-4',
    title: 'State Management with Context API',
    description: 'Implement a shopping cart using React Context API. Include add, remove, and checkout features.',
    dueDate: '2025-12-05',
    driveLink: 'https://drive.google.com/folder/sample-4',
    createdBy: 'admin-2',
    createdAt: '2025-10-30'
  }
];

// Mock submissions data - tracks which students submitted which assignments
export const mockSubmissions = [
  {
    id: 'sub-1',
    assignmentId: 'assign-1',
    studentId: 'user-1',
    submittedAt: '2025-11-10',
    status: 'submitted'
  },
  {
    id: 'sub-2',
    assignmentId: 'assign-1',
    studentId: 'user-2',
    submittedAt: '2025-11-12',
    status: 'submitted'
  },
  {
    id: 'sub-3',
    assignmentId: 'assign-2',
    studentId: 'user-1',
    submittedAt: '2025-11-18',
    status: 'submitted'
  },
  {
    id: 'sub-4',
    assignmentId: 'assign-3',
    studentId: 'user-3',
    submittedAt: '2025-11-25',
    status: 'submitted'
  }
];

// Initialize data in localStorage if not present
export const initializeData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem('assignments')) {
    localStorage.setItem('assignments', JSON.stringify(mockAssignments));
  }
  if (!localStorage.getItem('submissions')) {
    localStorage.setItem('submissions', JSON.stringify(mockSubmissions));
  }
};
