import React, { useState, useEffect } from 'react';
import AssignmentCard from './AssignmentCard';
import AssignmentForm from './AssignmentForm';
import CourseForm from './CourseForm';
import ProgressBar from './ProgressBar';
import Modal from './Modal';
import {
  getAssignments,
  getUsers,
  getSubmissionsByAssignment,
  deleteAssignment,
  getAssignmentProgress,
  getCourses
} from '../utils/storageUtils';

const AdminView = ({ user }) => {
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ show: false, assignment: null });

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = () => {
    const allCourses = getCourses();
    const myCourses = allCourses.filter(c => c.instructorId === user.id);
    
    setCourses(myCourses);

    const allAssignments = getAssignments();
    const myAssignments = myCourses.length > 0
      ? myCourses.flatMap(course => allAssignments.filter(a => a.courseId === course.id))
      : [];
    setAssignments(myAssignments);

    const allUsers = getUsers();
    const studentUsers = allUsers.filter(u => u.role === 'student');
    setStudents(studentUsers);
  };

  const handleCreateSuccess = () => {
    loadData();
  };

  const handleCourseSuccess = () => {
    loadData();
    setEditingCourse(null);
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
  };

  const handleDeleteClick = (assignment) => {
    setDeleteConfirmModal({ show: true, assignment });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmModal.assignment) {
      deleteAssignment(deleteConfirmModal.assignment.id);
      setDeleteConfirmModal({ show: false, assignment: null });
      loadData();
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmModal({ show: false, assignment: null });
  };

  const handleViewDetails = (assignment) => {
    setSelectedAssignment(selectedAssignment?.id === assignment.id ? null : assignment);
  };

  const getSubmissionDetails = (assignmentId) => {
    const submissions = getSubmissionsByAssignment(assignmentId);
    const submittedStudentIds = submissions.map(s => s.studentId);
    
    return {
      submitted: students.filter(s => submittedStudentIds.includes(s.id)),
      notSubmitted: students.filter(s => !submittedStudentIds.includes(s.id)),
      progress: getAssignmentProgress(assignmentId)
    };
  };

  const getFilteredAssignments = () => {
    if (!selectedCourse) return assignments;
    return assignments.filter(a => a.courseId === selectedCourse.id);
  };

  const filteredAssignments = getFilteredAssignments();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Professor Dashboard
            </h2>
            <p className="text-gray-600">Manage your courses and assignments</p>
          </div>
          {courses.length > 0 && (
            <button
              onClick={() => setShowCourseForm(true)}
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Course
            </button>
          )}
        </div>
      </div>

      {/* Empty State for New Professors */}
      {courses.length === 0 && (
        <div className="max-w-3xl mx-auto">
          <div className="card text-center py-16 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-300">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Welcome to JoinEasy! 🎉
            </h3>
            <p className="text-gray-600 mb-2 text-lg">
              You don't have any courses yet
            </p>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Get started by creating your first course. Once you have courses, you can create assignments, track student progress, and manage submissions.
            </p>

            <button
              onClick={() => setShowCourseForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Course
            </button>

            <div className="bg-white rounded-lg p-6 max-w-md mx-auto mt-8 text-left shadow-md">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Start Guide
              </h4>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-xs mr-3 mt-0.5">1</span>
                  <span><strong className="text-gray-900">Create a Course</strong> with a name, code, and semester</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-xs mr-3 mt-0.5">2</span>
                  <span><strong className="text-gray-900">Create Assignments</strong> with due dates, OneDrive links, and submission types</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-xs mr-3 mt-0.5">3</span>
                  <span><strong className="text-gray-900">Track Progress</strong> and view student submissions in real-time</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Courses Section */}
      {courses.length > 0 && !selectedCourse && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const courseAssignments = assignments.filter(a => a.courseId === course.id);
              const avgProgress = courseAssignments.length > 0
                ? Math.round(courseAssignments.reduce((sum, a) => sum + getAssignmentProgress(a.id), 0) / courseAssignments.length)
                : 0;

              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className="card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{course.name}</h4>
                      <p className="text-sm text-gray-600">{course.code}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      {course.semester}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Assignments</span>
                      <span className="font-semibold text-gray-900">{courseAssignments.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Students</span>
                      <span className="font-semibold text-gray-900">{course.enrolledStudents.length}</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Avg. Progress</span>
                        <span className="font-semibold text-gray-900">{avgProgress}%</span>
                      </div>
                      <ProgressBar percentage={avgProgress} showLabel={false} />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center">
                      View Assignments
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Assignment Management Section - shown when course is selected */}
      {selectedCourse && (
        <div>
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Courses
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{selectedCourse.name}</span>
          </div>

          {/* Course header with create button */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{selectedCourse.name}</h3>
              <p className="text-gray-600">{selectedCourse.code} • {selectedCourse.semester}</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Assignment
            </button>
          </div>

          {/* Overview stats for selected course */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-purple-800">Course Assignments</h3>
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-purple-900">{filteredAssignments.length}</p>
              <p className="text-sm text-purple-700 mt-2">In this course</p>
            </div>

            <div className="card bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-pink-800">Enrolled Students</h3>
                <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-pink-900">{selectedCourse.enrolledStudents.length}</p>
              <p className="text-sm text-pink-700 mt-2">In this course</p>
            </div>

            <div className="card bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-purple-800">Avg. Completion</h3>
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-purple-900">
                {filteredAssignments.length > 0
                  ? Math.round(
                      filteredAssignments.reduce((sum, a) => sum + getAssignmentProgress(a.id), 0) /
                        filteredAssignments.length
                    )
                  : 0}%
              </p>
              <p className="text-sm text-green-700 mt-2">Across assignments</p>
            </div>
          </div>

          {/* Assignments list */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Assignments</h3>

            {filteredAssignments.length === 0 ? (
              <div className="card text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">No assignments in this course yet</p>
                <button onClick={() => setShowCreateForm(true)} className="btn-primary">
                  Create Your First Assignment
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAssignments.map((assignment) => {
              const details = getSubmissionDetails(assignment.id);
              const isExpanded = selectedAssignment?.id === assignment.id;

              return (
                <div key={assignment.id} className="card">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {assignment.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {assignment.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Due: {assignment.dueDate}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {details.submitted.length} / {students.length} submitted
                        </span>
                      </div>
                    </div>

                    <div className="lg:w-64 space-y-3">
                      <ProgressBar
                        percentage={details.progress}
                        label="Submission Progress"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(assignment)}
                          className="bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300 px-4 py-2 rounded-lg font-medium transition-colors flex-1 text-sm"
                        >
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </button>
                        <button
                          onClick={() => handleEdit(assignment)}
                          className="bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(assignment)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                          title="Delete Assignment"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Submitted students */}
                        <div>
                          <h5 className="font-semibold text-green-700 mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Submitted ({details.submitted.length})
                          </h5>
                          {details.submitted.length > 0 ? (
                            <ul className="space-y-2">
                              {details.submitted.map((student) => (
                                <li key={student.id} className="flex items-center text-sm text-gray-700 bg-green-50 px-3 py-2 rounded">
                                  <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-green-700 font-semibold text-xs">
                                      {student.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  {student.name}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">No submissions yet</p>
                          )}
                        </div>

                        {/* Not submitted students */}
                        <div>
                          <h5 className="font-semibold text-orange-700 mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Pending ({details.notSubmitted.length})
                          </h5>
                          {details.notSubmitted.length > 0 ? (
                            <ul className="space-y-2">
                              {details.notSubmitted.map((student) => (
                                <li key={student.id} className="flex items-center text-sm text-gray-700 bg-orange-50 px-3 py-2 rounded">
                                  <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-orange-700 font-semibold text-xs">
                                      {student.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  {student.name}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">All students have submitted!</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
          </div>
        </div>
      )}

      {/* Assignment form modals */}
      <AssignmentForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSuccess={handleCreateSuccess}
        userId={user.id}
        selectedCourseId={selectedCourse?.id}
      />

      <AssignmentForm
        isOpen={!!editingAssignment}
        onClose={() => setEditingAssignment(null)}
        onSuccess={handleCreateSuccess}
        assignment={editingAssignment}
        userId={user.id}
        selectedCourseId={selectedCourse?.id}
      />

      {/* Course form modals */}
      <CourseForm
        isOpen={showCourseForm}
        onClose={() => {
          setShowCourseForm(false);
          setEditingCourse(null);
        }}
        onSuccess={handleCourseSuccess}
        editingCourse={editingCourse}
        instructorId={user.id}
      />

      {/* Delete confirmation modal */}
      {deleteConfirmModal.show && (
        <Modal isOpen={true} onClose={handleCancelDelete}>
          <div className="text-center">
            {/* Warning Icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Assignment
            </h3>

            {/* Message */}
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "<span className="font-semibold text-gray-900">{deleteConfirmModal.assignment?.title}</span>"? This action cannot be undone.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCancelDelete}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminView;
