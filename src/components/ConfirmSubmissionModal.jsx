import React, { useState } from 'react';
import Modal from './Modal';
import { addSubmission, isSubmitted, addAcknowledgement, addGroupAcknowledgement, getStudentGroupForAssignment, getCourses } from '../utils/storageUtils';

const ConfirmSubmissionModal = ({ isOpen, onClose, assignment, studentId, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFirstConfirm = () => {
    setStep(2);
    setError('');
  };

  const handleFinalConfirm = async () => {
    setIsSubmitting(true);
    setError('');
    
    // Simulate a small delay for UX
    setTimeout(() => {
      try {
        if (!isSubmitted(assignment.id, studentId)) {
          // Check if this is a group assignment
          if (assignment.submissionType === 'group') {
            // Get the student's group for this assignment
            const studentGroup = getStudentGroupForAssignment(studentId, assignment.id);
            
            if (!studentGroup) {
              setError('You must be part of a group to submit this assignment.');
              setIsSubmitting(false);
              return;
            }
            
            // Check if student is the group leader
            if (studentGroup.leaderId !== studentId) {
              setError('Only the group leader can submit this assignment.');
              setIsSubmitting(false);
              return;
            }
            
            // Leader submits for entire group
            addGroupAcknowledgement(assignment.id, studentGroup.id, studentId);
          } else {
            // Individual assignment - record acknowledgement timestamp
            addAcknowledgement(assignment.id, studentId);
          }
        }
        setIsSubmitting(false);
        setStep(3);
        
        // Auto close and refresh after success
        setTimeout(() => {
          setStep(1);
          onClose();
          onSubmit();
        }, 2000);
      } catch (err) {
        setError(err.message || 'An error occurred while submitting.');
        setIsSubmitting(false);
      }
    }, 500);
  };

  const handleCancel = () => {
    setStep(1);
    setError('');
    onClose();
  };

  // Get student's group info if this is a group assignment
  const studentGroup = assignment?.submissionType === 'group' 
    ? getStudentGroupForAssignment(studentId, assignment?.id) 
    : null;

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Confirm Submission" size="md">
      <div className="py-4">
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Assignment:</strong> {assignment?.title}
              </p>
              <p className="text-sm text-blue-800 mt-2">
                <strong>Due Date:</strong> {assignment?.dueDate}
              </p>
              {assignment?.submissionType === 'group' && studentGroup && (
                <p className="text-sm text-blue-800 mt-2">
                  <strong>Group:</strong> {studentGroup.name} ({studentGroup.members.length} members)
                </p>
              )}
            </div>
            
            <p className="text-gray-700">
              {assignment?.submissionType === 'group' && studentGroup
                ? 'Has your group uploaded the assignment to the Drive link provided?'
                : 'Have you uploaded your assignment to the Drive link provided?'}
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleFirstConfirm}
                className="btn-primary flex-1"
              >
                {assignment?.submissionType === 'group' && studentGroup
                  ? 'Yes, group has submitted'
                  : 'Yes, I have submitted'}
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary flex-1"
              >
                Not yet
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="font-semibold text-yellow-800">Final Confirmation</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    {assignment?.submissionType === 'group' && studentGroup
                      ? `This will mark the assignment as submitted for all ${studentGroup.members.length} group members. This action cannot be undone.`
                      : 'Once you confirm, this action cannot be undone. Please ensure you\'ve uploaded your work to the Drive link.'}
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 font-medium">
              Are you absolutely sure you want to mark this assignment as submitted?
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleFinalConfirm}
                disabled={isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Confirming...' : 'Yes, confirm submission'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSubmitting}
                className="btn-secondary flex-1 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Submission Confirmed!</h3>
            <p className="text-gray-600">
              {assignment?.submissionType === 'group' && studentGroup
                ? `Assignment marked as submitted for all ${studentGroup.members.length} group members.`
                : 'Your assignment has been marked as submitted.'}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ConfirmSubmissionModal;
