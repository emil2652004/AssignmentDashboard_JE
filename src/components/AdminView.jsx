import React, { useState, useEffect } from 'react';
import AssignmentCard from './AssignmentCard';
import AssignmentForm from './AssignmentForm';
import ProgressBar from './ProgressBar';
import {
  getAssignments,
  getUsers,
  getSubmissionsByAssignment,
  deleteAssignment,
  getAssignmentProgress
} from '../utils/storageUtils';

const AdminView = ({ user }) => {
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = () => {
    const allAssignments = getAssignments();
    const myAssignments = allAssignments.filter(a => a.createdBy === user.id);
    setAssignments(myAssignments);

    const allUsers = getUsers();
    const studentUsers = allUsers.filter(u => u.role === 'student');
    setStudents(studentUsers);
  };

  const handleCreateSuccess = () => {
    loadData();
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
  };

  const handleDelete = (assignmentId) => {
    deleteAssignment(assignmentId);
    loadData();
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Professor Dashboard
          </h2>
          <p className="text-gray-600">Manage assignments and track student progress</p>
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

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-800">Total Assignments</h3>
            <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-900">{assignments.length}</p>
          <p className="text-sm text-purple-700 mt-2">Created by you</p>
        </div>

        <div className="card bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-pink-800">Total Students</h3>
            <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-pink-900">{students.length}</p>
          <p className="text-sm text-pink-700 mt-2">Enrolled students</p>
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
            {assignments.length > 0
              ? Math.round(
                  assignments.reduce((sum, a) => sum + getAssignmentProgress(a.id), 0) /
                    assignments.length
                )
              : 0}%
          </p>
          <p className="text-sm text-green-700 mt-2">Across all assignments</p>
        </div>
      </div>

      {/* Assignments list */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Assignments</h3>

        {assignments.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-4">You haven't created any assignments yet</p>
            <button onClick={() => setShowCreateForm(true)} className="btn-primary">
              Create Your First Assignment
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {assignments.map((assignment) => {
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

      {/* Assignment form modals */}
      <AssignmentForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSuccess={handleCreateSuccess}
        userId={user.id}
      />

      <AssignmentForm
        isOpen={!!editingAssignment}
        onClose={() => setEditingAssignment(null)}
        onSuccess={handleCreateSuccess}
        assignment={editingAssignment}
        userId={user.id}
      />
    </div>
  );
};

export default AdminView;
