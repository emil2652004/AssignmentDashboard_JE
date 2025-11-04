import React, { useState, useEffect } from 'react';
import AssignmentCard from './AssignmentCard';
import ConfirmSubmissionModal from './ConfirmSubmissionModal';
import ProgressBar from './ProgressBar';
import { 
  getAssignments, 
  getStudentProgress, 
  isSubmitted, 
  getCourses, 
  getStudentGroupForAssignment,
  getSubmissionsByAssignment
} from '../utils/storageUtils';

const StudentView = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState('all'); // all, pending, submitted

  useEffect(() => {
    loadData();
  }, [user]);

  // Reload data when a course is selected (to get latest assignments)
  useEffect(() => {
    if (selectedCourse) {
      loadData();
    }
  }, [selectedCourse]);

  const loadData = () => {
    const allCourses = getCourses();
    const myCourses = allCourses.filter(c => c.enrolledStudents.includes(user.id));
    setCourses(myCourses);

    // Get only assignments from enrolled courses
    const allAssignments = getAssignments();
    const enrolledCourseIds = myCourses.map(c => c.id);
    const myAssignments = allAssignments.filter(a => enrolledCourseIds.includes(a.courseId));
    setAssignments(myAssignments);
    
    const studentProgress = getStudentProgress(user.id);
    setProgress(studentProgress);
  };

  const handleSubmissionSuccess = () => {
    loadData();
  };

  const handleMarkSubmitted = (assignment) => {
    setSelectedAssignment(assignment);
    setShowConfirmModal(true);
  };

  const getFilteredAssignments = () => {
    if (!selectedCourse) return [];
    
    let courseAssignments = assignments.filter(a => a.courseId === selectedCourse.id);
    
    if (filter === 'all') return courseAssignments;
    
    if (filter === 'submitted') {
      return courseAssignments.filter(a => isSubmitted(a.id, user.id));
    }
    
    if (filter === 'pending') {
      return courseAssignments.filter(a => !isSubmitted(a.id, user.id));
    }
    
    return courseAssignments;
  };

  const filteredAssignments = getFilteredAssignments();
  
  const getCourseProgress = (courseId) => {
    const courseAssignments = assignments.filter(a => a.courseId === courseId);
    if (courseAssignments.length === 0) return 0;
    
    const submitted = courseAssignments.filter(a => isSubmitted(a.id, user.id)).length;
    return Math.round((submitted / courseAssignments.length) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name.split(' ')[0]}! 👋
        </h2>
        <p className="text-gray-600">Your enrolled courses and assignments</p>
      </div>

      {/* Courses Section - shown when no course is selected */}
      {!selectedCourse && (
        <div>
          {/* Overall Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-800">Overall Progress</h3>
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-900 mb-3">{progress}%</p>
              <ProgressBar percentage={progress} showLabel={false} />
            </div>

            <div className="card bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-green-800">Enrolled Courses</h3>
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-green-900">{courses.length}</p>
              <p className="text-sm text-green-700 mt-2">This semester</p>
            </div>

            <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-orange-800">Total Assignments</h3>
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-orange-900">{assignments.length}</p>
              <p className="text-sm text-orange-700 mt-2">Across all courses</p>
            </div>
          </div>

          {/* My Courses */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h3>
            
            {courses.length === 0 ? (
              <div className="card text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-gray-500">No courses available yet. Check back later when professors create courses!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => {
                  const courseAssignments = assignments.filter(a => a.courseId === course.id);
                  const courseProgress = getCourseProgress(course.id);

                  return (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className="card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{course.name}</h4>
                          <p className="text-sm text-gray-600">{course.code}</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {course.semester}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Assignments</span>
                          <span className="font-semibold text-gray-900">{courseAssignments.length}</span>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold text-gray-900">{courseProgress}%</span>
                          </div>
                          <ProgressBar percentage={courseProgress} showLabel={false} />
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
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
            )}
          </div>
        </div>
      )}

      {/* Assignment View - shown when course is selected */}
      {selectedCourse && (
        <div>
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Courses
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-1">{selectedCourse.name}</h3>
            <p className="text-gray-600">{selectedCourse.code} • {selectedCourse.semester}</p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(() => {
              const courseAssignments = assignments.filter(a => a.courseId === selectedCourse.id);
              const pendingCount = courseAssignments.filter(a => !isSubmitted(a.id, user.id)).length;
              const submittedCount = courseAssignments.filter(a => isSubmitted(a.id, user.id)).length;
              
              return (
                <>
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'all'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All ({courseAssignments.length})
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'pending'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Pending ({pendingCount})
                  </button>
                  <button
                    onClick={() => setFilter('submitted')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'submitted'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Submitted ({submittedCount})
                  </button>
                </>
              );
            })()}
          </div>

          {/* Assignments list */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {filter === 'all' && 'All Assignments'}
              {filter === 'pending' && 'Pending Assignments'}
              {filter === 'submitted' && 'Submitted Assignments'}
            </h3>

            {filteredAssignments.length === 0 ? (
              <div className="card text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500">No assignments found in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssignments.map((assignment) => {
                  const studentGroup = getStudentGroupForAssignment(user.id, assignment.id);
                  const isGroupAssignment = assignment.submissionType === 'group';
                  const isGroupLeader = studentGroup && studentGroup.leaderId === user.id;
                  const isInGroup = !!studentGroup;
                  
                  return (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      userRole="student"
                      userId={user.id}
                      onMarkSubmitted={handleMarkSubmitted}
                      isGroupAssignment={isGroupAssignment}
                      isGroupLeader={isGroupLeader}
                      isInGroup={isInGroup}
                      groupName={studentGroup?.name}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation modal */}
      <ConfirmSubmissionModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        assignment={selectedAssignment}
        studentId={user.id}
        onSubmit={handleSubmissionSuccess}
      />
    </div>
  );
};

export default StudentView;
