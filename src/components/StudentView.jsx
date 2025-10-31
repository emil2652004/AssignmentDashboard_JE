import React, { useState, useEffect } from 'react';
import AssignmentCard from './AssignmentCard';
import ConfirmSubmissionModal from './ConfirmSubmissionModal';
import ProgressBar from './ProgressBar';
import { getAssignments, getStudentProgress, isSubmitted } from '../utils/storageUtils';

const StudentView = ({ user }) => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState('all'); // all, pending, submitted

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = () => {
    const allAssignments = getAssignments();
    setAssignments(allAssignments);
    const studentProgress = getStudentProgress(user.id);
    setProgress(studentProgress);
  };

  const handleMarkSubmitted = (assignment) => {
    setSelectedAssignment(assignment);
    setShowConfirmModal(true);
  };

  const handleSubmissionSuccess = () => {
    loadData();
  };

  const getFilteredAssignments = () => {
    if (filter === 'all') return assignments;
    
    if (filter === 'submitted') {
      return assignments.filter(a => isSubmitted(a.id, user.id));
    }
    
    if (filter === 'pending') {
      return assignments.filter(a => !isSubmitted(a.id, user.id));
    }
    
    return assignments;
  };

  const filteredAssignments = getFilteredAssignments();
  const submittedCount = assignments.filter(a => isSubmitted(a.id, user.id)).length;
  const pendingCount = assignments.length - submittedCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name.split(' ')[0]}! 👋
        </h2>
        <p className="text-gray-600">Here's your assignment overview</p>
      </div>

      {/* Progress overview */}
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
            <h3 className="text-sm font-medium text-green-800">Submitted</h3>
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-900">{submittedCount}</p>
          <p className="text-sm text-green-700 mt-2">Assignments completed</p>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-orange-800">Pending</h3>
            <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-orange-900">{pendingCount}</p>
          <p className="text-sm text-orange-700 mt-2">Assignments remaining</p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All ({assignments.length})
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
            {filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                userRole="student"
                userId={user.id}
                onMarkSubmitted={handleMarkSubmitted}
              />
            ))}
          </div>
        )}
      </div>

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
