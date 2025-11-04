// Utility functions for localStorage operations

export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const getAssignments = () => {
  const assignments = localStorage.getItem('assignments');
  return assignments ? JSON.parse(assignments) : [];
};

export const getSubmissions = () => {
  const submissions = localStorage.getItem('submissions');
  return submissions ? JSON.parse(submissions) : [];
};

export const getCourses = () => {
  const courses = localStorage.getItem('courses');
  return courses ? JSON.parse(courses) : [];
};

export const getGroups = () => {
  const groups = localStorage.getItem('groups');
  return groups ? JSON.parse(groups) : [];
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authToken');
};

// JWT Token utilities (simulated for demo purposes)
export const generateToken = (user) => {
  // Simulated JWT token (base64 encoded user data)
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  }));
  const signature = btoa(`secret-${user.id}`); // Simulated signature
  return `${header}.${payload}.${signature}`;
};

export const verifyToken = (token) => {
  try {
    if (!token) return null;
    const [, payload] = token.split('.');
    const data = JSON.parse(atob(payload));
    
    // Check expiration
    if (data.exp < Date.now()) {
      return null;
    }
    
    return data;
  } catch (error) {
    return null;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// User registration
export const registerUser = (userData) => {
  const users = getUsers();
  
  // Check if email already exists
  if (users.some(u => u.email === userData.email)) {
    throw new Error('Email already registered');
  }
  
  const newUser = {
    id: `user-${Date.now()}`,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // If registering a student, automatically enroll them in all existing courses
  if (userData.role === 'student') {
    const courses = getCourses();
    courses.forEach(course => {
      if (!course.enrolledStudents.includes(newUser.id)) {
        course.enrolledStudents.push(newUser.id);
      }
    });
    localStorage.setItem('courses', JSON.stringify(courses));
  }
  
  return newUser;
};

// Course operations
export const addCourse = (course) => {
  const courses = getCourses();
  const users = getUsers();
  
  // Get all student IDs
  const allStudentIds = users.filter(u => u.role === 'student').map(u => u.id);
  
  const newCourse = {
    ...course,
    id: `course-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    enrolledStudents: allStudentIds // Automatically enroll all students
  };
  courses.push(newCourse);
  localStorage.setItem('courses', JSON.stringify(courses));
  return newCourse;
};

export const updateCourse = (courseId, updates) => {
  const courses = getCourses();
  const index = courses.findIndex(c => c.id === courseId);
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updates };
    localStorage.setItem('courses', JSON.stringify(courses));
    return courses[index];
  }
  return null;
};

export const deleteCourse = (courseId) => {
  const courses = getCourses();
  const filtered = courses.filter(c => c.id !== courseId);
  localStorage.setItem('courses', JSON.stringify(filtered));
};

export const enrollInCourse = (courseId, studentId) => {
  const courses = getCourses();
  const courseIndex = courses.findIndex(c => c.id === courseId);
  
  if (courseIndex !== -1) {
    if (!courses[courseIndex].enrolledStudents.includes(studentId)) {
      courses[courseIndex].enrolledStudents.push(studentId);
      localStorage.setItem('courses', JSON.stringify(courses));
      return true;
    }
  }
  return false;
};

export const unenrollFromCourse = (courseId, studentId) => {
  const courses = getCourses();
  const courseIndex = courses.findIndex(c => c.id === courseId);
  
  if (courseIndex !== -1) {
    courses[courseIndex].enrolledStudents = courses[courseIndex].enrolledStudents.filter(
      id => id !== studentId
    );
    localStorage.setItem('courses', JSON.stringify(courses));
    return true;
  }
  return false;
};

// Assignment operations
export const addAssignment = (assignment) => {
  const assignments = getAssignments();
  const newAssignment = {
    ...assignment,
    id: `assign-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0]
  };
  assignments.push(newAssignment);
  localStorage.setItem('assignments', JSON.stringify(assignments));
  return newAssignment;
};

export const updateAssignment = (assignmentId, updates) => {
  const assignments = getAssignments();
  const index = assignments.findIndex(a => a.id === assignmentId);
  if (index !== -1) {
    assignments[index] = { ...assignments[index], ...updates };
    localStorage.setItem('assignments', JSON.stringify(assignments));
    return assignments[index];
  }
  return null;
};

export const deleteAssignment = (assignmentId) => {
  const assignments = getAssignments();
  const filtered = assignments.filter(a => a.id !== assignmentId);
  localStorage.setItem('assignments', JSON.stringify(filtered));
  
  // Also delete related submissions
  const submissions = getSubmissions();
  const filteredSubs = submissions.filter(s => s.assignmentId !== assignmentId);
  localStorage.setItem('submissions', JSON.stringify(filteredSubs));
};

// Submission operations
export const addSubmission = (assignmentId, studentId) => {
  const submissions = getSubmissions();
  const newSubmission = {
    id: `sub-${Date.now()}`,
    assignmentId,
    studentId,
    submittedAt: new Date().toISOString().split('T')[0],
    status: 'submitted'
  };
  submissions.push(newSubmission);
  localStorage.setItem('submissions', JSON.stringify(submissions));
  return newSubmission;
};

// Acknowledgement for submission (stores timestamp). Works for individual submissions.
export const addAcknowledgement = (assignmentId, studentId) => {
  const submissions = getSubmissions();
  const idx = submissions.findIndex(s => s.assignmentId === assignmentId && s.studentId === studentId);
  const ackAt = new Date().toISOString();

  if (idx !== -1) {
    submissions[idx] = { ...submissions[idx], status: 'acknowledged', acknowledgedAt: ackAt };
  } else {
    submissions.push({
      id: `sub-${Date.now()}`,
      assignmentId,
      studentId,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'acknowledged',
      acknowledgedAt: ackAt
    });
  }

  localStorage.setItem('submissions', JSON.stringify(submissions));
  return true;
};

// Group operations
export const addGroup = (group) => {
  const groups = getGroups();
  const newGroup = {
    ...group,
    id: group.id || `group-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0]
  };
  groups.push(newGroup);
  localStorage.setItem('groups', JSON.stringify(groups));
  return newGroup;
};

export const getGroupsByAssignment = (assignmentId) => {
  const groups = getGroups();
  return groups.filter(g => g.assignmentId === assignmentId);
};

export const deleteGroupsByAssignment = (assignmentId) => {
  const groups = getGroups();
  const filtered = groups.filter(g => g.assignmentId !== assignmentId);
  localStorage.setItem('groups', JSON.stringify(filtered));
};

// Group acknowledgement - when leader acknowledges, mark all group members
export const addGroupAcknowledgement = (assignmentId, groupId, leaderId) => {
  const groups = getGroups();
  const group = groups.find(g => g.id === groupId);
  
  if (!group || group.leaderId !== leaderId) {
    throw new Error('Only group leader can acknowledge for the group');
  }

  const submissions = getSubmissions();
  const ackAt = new Date().toISOString();

  // Mark acknowledgement for all group members
  group.members.forEach(memberId => {
    const idx = submissions.findIndex(s => s.assignmentId === assignmentId && s.studentId === memberId);
    
    if (idx !== -1) {
      submissions[idx] = { ...submissions[idx], status: 'acknowledged', acknowledgedAt: ackAt, groupId };
    } else {
      submissions.push({
        id: `sub-${Date.now()}-${memberId}`,
        assignmentId,
        studentId: memberId,
        submittedAt: new Date().toISOString().split('T')[0],
        status: 'acknowledged',
        acknowledgedAt: ackAt,
        groupId
      });
    }
  });

  localStorage.setItem('submissions', JSON.stringify(submissions));
  return true;
};

// Get student's group for a specific course
export const getStudentGroup = (studentId, courseId) => {
  const groups = getGroups();
  return groups.find(g => g.courseId === courseId && g.members.includes(studentId));
};

// Get student's group for a specific assignment
export const getStudentGroupForAssignment = (studentId, assignmentId) => {
  const groups = getGroups();
  return groups.find(g => g.assignmentId === assignmentId && g.members.includes(studentId));
};

// Create a new group
export const createGroup = (groupData) => {
  const groups = getGroups();
  const newGroup = {
    id: `group-${Date.now()}`,
    name: groupData.name,
    courseId: groupData.courseId,
    leaderId: groupData.leaderId,
    members: groupData.members || [groupData.leaderId],
    createdAt: new Date().toISOString()
  };
  
  groups.push(newGroup);
  localStorage.setItem('groups', JSON.stringify(groups));
  return newGroup;
};

// Join existing group
export const joinGroup = (groupId, studentId) => {
  const groups = getGroups();
  const idx = groups.findIndex(g => g.id === groupId);
  
  if (idx !== -1 && !groups[idx].members.includes(studentId)) {
    groups[idx].members.push(studentId);
    localStorage.setItem('groups', JSON.stringify(groups));
    return groups[idx];
  }
  
  return null;
};

export const isSubmitted = (assignmentId, studentId) => {
  const submissions = getSubmissions();
  return submissions.some(
    s => s.assignmentId === assignmentId && s.studentId === studentId
  );
};

export const getSubmissionsByAssignment = (assignmentId) => {
  const submissions = getSubmissions();
  return submissions.filter(s => s.assignmentId === assignmentId);
};

export const getSubmissionsByStudent = (studentId) => {
  const submissions = getSubmissions();
  return submissions.filter(s => s.studentId === studentId);
};

export const getStudentProgress = (studentId) => {
  // Get all assignments
  const allAssignments = getAssignments();
  
  // Get student's enrolled courses
  const courses = getCourses();
  const enrolledCourses = courses.filter(c => c.enrolledStudents.includes(studentId));
  const enrolledCourseIds = enrolledCourses.map(c => c.id);
  
  // Filter assignments to only those from enrolled courses
  const assignments = allAssignments.filter(a => enrolledCourseIds.includes(a.courseId));
  
  // Get submissions
  const submissions = getSubmissionsByStudent(studentId);
  
  if (assignments.length === 0) return 0;
  
  return Math.round((submissions.length / assignments.length) * 100);
};

export const getAssignmentProgress = (assignmentId) => {
  const users = getUsers();
  const students = users.filter(u => u.role === 'student');
  const submissions = getSubmissionsByAssignment(assignmentId);
  
  if (students.length === 0) return 0;
  
  return Math.round((submissions.length / students.length) * 100);
};

// Sync all students to all courses (for fixing existing data)
export const syncAllStudentEnrollments = () => {
  const users = getUsers();
  const courses = getCourses();
  
  // Get all student IDs
  const allStudentIds = users.filter(u => u.role === 'student').map(u => u.id);
  
  // Update each course to include all students
  const updatedCourses = courses.map(course => ({
    ...course,
    enrolledStudents: allStudentIds
  }));
  
  localStorage.setItem('courses', JSON.stringify(updatedCourses));
  return updatedCourses;
};
