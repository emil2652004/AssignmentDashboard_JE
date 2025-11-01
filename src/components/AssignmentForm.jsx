import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { addAssignment, updateAssignment } from '../utils/storageUtils';

const AssignmentForm = ({ isOpen, onClose, onSuccess, assignment = null, userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    driveLink: ''
  });

  const [errors, setErrors] = useState({});

  // Automatically populate form when assignment prop changes (for editing)
  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title || '',
        description: assignment.description || '',
        dueDate: assignment.dueDate || '',
        driveLink: assignment.driveLink || ''
      });
    } else {
      // Reset form when creating new assignment
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        driveLink: ''
      });
    }
  }, [assignment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!formData.driveLink.trim()) {
      newErrors.driveLink = 'Drive link is required';
    } else if (!formData.driveLink.startsWith('http')) {
      newErrors.driveLink = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    if (assignment) {
      // Update existing assignment
      updateAssignment(assignment.id, formData);
    } else {
      // Create new assignment
      addAssignment({
        ...formData,
        createdBy: userId
      });
    }
    
    onSuccess();
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      driveLink: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={assignment ? 'Edit Assignment' : 'Create New Assignment'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Assignment Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input-field ${errors.title ? 'border-red-500' : ''}`}
            placeholder="e.g., Introduction to React Hooks"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`input-field ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Provide detailed instructions for the assignment..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="label">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`input-field ${errors.dueDate ? 'border-red-500' : ''}`}
          />
          {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
        </div>

        <div>
          <label className="label">Google Drive Submission Link</label>
          <input
            type="url"
            name="driveLink"
            value={formData.driveLink}
            onChange={handleChange}
            className={`input-field ${errors.driveLink ? 'border-red-500' : ''}`}
            placeholder="https://drive.google.com/folder/..."
          />
          {errors.driveLink && <p className="text-red-500 text-sm mt-1">{errors.driveLink}</p>}
          <p className="text-xs text-gray-500 mt-1">Students will submit their work here</p>
        </div>

        <div className="flex space-x-3 pt-4">
          <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex-1">
            {assignment ? 'Update Assignment' : 'Create Assignment'}
          </button>
          <button type="button" onClick={handleClose} className="bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300 px-6 py-2.5 rounded-lg font-medium transition-colors flex-1">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AssignmentForm;
