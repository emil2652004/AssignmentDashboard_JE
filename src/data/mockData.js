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
  // Starting with no assignments - professors will create them
];

// Mock submissions data - tracks which students submitted which assignments
export const mockSubmissions = [
  // Starting with no submissions - students will submit when assignments are created
];

// Mock courses data
export const mockCourses = [
  {
    id: 'course-1',
    name: 'Web Development Fundamentals',
    code: 'CS101',
    semester: 'Fall 2025',
    instructorId: 'admin-1',
    enrolledStudents: ['user-1', 'user-2', 'user-3', 'user-4']
  },
  {
    id: 'course-2',
    name: 'Advanced Frontend Development',
    code: 'CS201',
    semester: 'Fall 2025',
    instructorId: 'admin-1',
    enrolledStudents: ['user-1', 'user-2']
  },
  {
    id: 'course-3',
    name: 'UI/UX Design Principles',
    code: 'DES101',
    semester: 'Fall 2025',
    instructorId: 'admin-2',
    enrolledStudents: ['user-3', 'user-4']
  }
];

// Mock groups data
export const mockGroups = [
  {
    id: 'group-1',
    name: 'Team Alpha',
    courseId: 'course-1',
    leaderId: 'user-1',
    members: ['user-1', 'user-2'],
    createdAt: '2025-10-15'
  },
  {
    id: 'group-2',
    name: 'Team Beta',
    courseId: 'course-3',
    leaderId: 'user-3',
    members: ['user-3', 'user-4'],
    createdAt: '2025-10-16'
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
  if (!localStorage.getItem('courses')) {
    // Get all student IDs from mockUsers
    const allStudentIds = mockUsers.filter(u => u.role === 'student').map(u => u.id);
    
    // Update each course to include all students
    const coursesWithAllStudents = mockCourses.map(course => ({
      ...course,
      enrolledStudents: allStudentIds
    }));
    
    localStorage.setItem('courses', JSON.stringify(coursesWithAllStudents));
  }
  if (!localStorage.getItem('groups')) {
    localStorage.setItem('groups', JSON.stringify(mockGroups));
  }
};
