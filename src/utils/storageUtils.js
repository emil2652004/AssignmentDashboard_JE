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

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
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
  const assignments = getAssignments();
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
