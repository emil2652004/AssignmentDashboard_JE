import React, { useState } from 'react';
import { isSubmitted } from '../utils/storageUtils';

const AssignmentCard = ({ assignment, userRole, userId, onMarkSubmitted, onEdit, onDelete }) => {
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
    <div className="card relative">
      {/* Status badge */}
      {userRole === 'student' && submitted && (
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            ✓ Submitted
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 pr-24">
          {assignment.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {assignment.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={`font-medium ${getDueDateColor()}`}>
            {getDueDateText()}
          </span>
        </div>

        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <a 
            href={assignment.driveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 font-medium hover:underline"
          >
            Submission Link
          </a>
        </div>
      </div>

      {/* Student actions */}
      {userRole === 'student' && (
        <div className="pt-4 border-t border-gray-200">
          {!submitted ? (
            <button
              onClick={() => onMarkSubmitted(assignment)}
              className="btn-primary w-full"
            >
              Mark as Submitted
            </button>
          ) : (
            <div className="flex items-center justify-center text-green-600 font-medium">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Assignment Submitted
            </div>
          )}
        </div>
      )}

      {/* Admin actions */}
      {userRole === 'admin' && (
        <div className="pt-4 border-t border-gray-200 relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="btn-secondary w-full"
          >
            Manage Assignment
          </button>
          
          {showActions && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowActions(false)}
              />
              <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48 z-20">
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
