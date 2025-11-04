import React, { useState } from 'react';
import { isSubmitted } from '../utils/storageUtils';

const AssignmentCard = ({ 
  assignment, 
  userRole, 
  userId, 
  onMarkSubmitted, 
  onEdit, 
  onDelete,
  isGroupAssignment,
  isGroupLeader,
  isInGroup,
  groupName
}) => {
  const [showActions, setShowActions] = useState(false);
  const submitted = userRole === 'student' ? isSubmitted(assignment.id, userId) : false;
  
  const isOverdue = new Date(assignment.dueDate) < new Date() && !submitted;
  const daysUntilDue = Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  const getDueDateColor = () => {
    if (submitted) return 'text-green-600';
    if (isOverdue) return 'text-red-600';
    if (daysUntilDue <= 3) return 'text-orange-600';
    return 'text-gray-600';
  };

  const getDueDateText = () => {
    if (submitted) return 'Submitted';
    if (isOverdue) return `Overdue (${assignment.dueDate})`;
    if (daysUntilDue === 0) return 'Due today';
    if (daysUntilDue === 1) return 'Due tomorrow';
    return `Due ${assignment.dueDate}`;
  };

  return (
    <div className="card relative overflow-hidden group">
      {/* Decorative gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        submitted ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
        isOverdue ? 'bg-gradient-to-r from-red-400 to-pink-500' :
        'bg-gradient-to-r from-blue-400 to-indigo-500'
      }`} />

      {/* Status badge */}
      {userRole === 'student' && submitted && (
        <div className="absolute top-4 right-4">
          <span className="badge badge-green shadow-md">
            ✓ Submitted
          </span>
        </div>
      )}

      <div className="mb-4 mt-2">
        <h3 className="text-xl font-bold text-gray-900 mb-2 pr-24 group-hover:text-blue-600 transition-colors duration-200">
          {assignment.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {assignment.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4 text-sm">
        <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={`font-semibold ${getDueDateColor()}`}>
            {getDueDateText()}
          </span>
        </div>

        <div className="flex items-center">
          <a 
            href={assignment.oneDriveLink || assignment.driveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 px-3 py-1.5 rounded-xl font-semibold transition-all duration-200 border border-blue-200 hover:shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Submission Link
          </a>
        </div>

        <span className={`badge ${assignment.submissionType === 'group' ? 'badge-purple' : 'badge-blue'}`}>
          {assignment.submissionType === 'group' ? '👥 Group' : '👤 Individual'}
        </span>
      </div>

      {/* Student actions */}
      {userRole === 'student' && (
        <div className="pt-4 border-t border-gray-100">
          {isGroupAssignment && !isInGroup ? (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-4 mb-3 shadow-sm">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-bold text-yellow-900 mb-1">⚠️ Group Assignment - No Group Assigned</p>
                  <p className="text-xs text-yellow-800">Your professor hasn't assigned you to a group yet. Please contact your professor to be added to a group for this assignment.</p>
                </div>
              </div>
            </div>
          ) : isGroupAssignment && !isGroupLeader ? (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-bold text-blue-900 mb-1">👥 Group: {groupName}</p>
                  <p className="text-xs text-blue-800">Only your group leader can submit this assignment.</p>
                  {submitted && (
                    <p className="text-xs text-green-700 mt-2 font-semibold flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Submitted by group leader
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : !submitted ? (
            <button
              onClick={() => onMarkSubmitted(assignment)}
              className="btn-primary w-full flex items-center justify-center"
              disabled={isGroupAssignment && !isInGroup}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {isGroupAssignment && isGroupLeader ? 'Submit for Group' : 'Mark as Submitted'}
            </button>
          ) : (
            <div className="flex items-center justify-center text-green-600 font-bold py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 shadow-sm">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Assignment Submitted
            </div>
          )}
        </div>
      )}

      {/* Admin actions */}
      {userRole === 'admin' && (
        <div className="pt-4 border-t border-gray-100 relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="btn-secondary w-full flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Manage Assignment
          </button>
          
          {showActions && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowActions(false)}
              />
              <div className="absolute bottom-full mb-2 right-0 glass-effect rounded-2xl shadow-2xl py-2 w-48 z-20 border border-gray-200">
                <button
                  onClick={() => {
                    onEdit(assignment);
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center text-gray-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this assignment?')) {
                      onDelete(assignment.id);
                    }
                    setShowActions(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center text-red-600"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignmentCard;
