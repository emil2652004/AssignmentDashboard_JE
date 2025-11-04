import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { addAssignment, updateAssignment, getCourses, getUsers, addGroup, deleteGroupsByAssignment } from '../utils/storageUtils';

const AssignmentForm = ({ isOpen, onClose, onSuccess, assignment = null, userId, selectedCourseId = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    oneDriveLink: '',
    submissionType: 'individual', // 'individual' or 'group'
    courseId: ''
  });

  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showGroupBuilder, setShowGroupBuilder] = useState(false);

  // Load courses taught by this professor (refresh when form opens)
  useEffect(() => {
    if (isOpen) {
      const allCourses = getCourses();
      const myCourses = allCourses.filter(c => c.instructorId === userId);
      setCourses(myCourses);
    }
  }, [userId, isOpen]);

  // Load students when course is selected
  useEffect(() => {
    if (formData.courseId) {
      const selectedCourse = courses.find(c => c.id === formData.courseId);
      if (selectedCourse) {
        const allUsers = getUsers();
        const enrolledStudents = allUsers.filter(u => 
          u.role === 'student' && selectedCourse.enrolledStudents.includes(u.id)
        );
        setStudents(enrolledStudents);
      }
    } else {
      setStudents([]);
    }
  }, [formData.courseId, courses]);

  // Automatically populate form when assignment prop changes (for editing)
  useEffect(() => {
    if (isOpen) {
      if (assignment) {
        setFormData({
          title: assignment.title || '',
          description: assignment.description || '',
          dueDate: assignment.dueDate || '',
          oneDriveLink: assignment.oneDriveLink || assignment.driveLink || '',
          submissionType: assignment.submissionType || 'individual',
          courseId: assignment.courseId || ''
        });
      } else {
        // Reset form when creating new assignment
        setFormData({
          title: '',
          description: '',
          dueDate: '',
          oneDriveLink: '',
          submissionType: 'individual',
          courseId: selectedCourseId || '' // Pre-select course if provided
        });
        setGroups([]); // Reset groups
        setErrors({}); // Reset errors
      }
    }
  }, [assignment, selectedCourseId, isOpen]);

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

  const addNewGroup = () => {
    const newGroup = {
      id: `group-${Date.now()}`,
      name: `Group ${groups.length + 1}`,
      members: [],
      leaderId: null
    };
    setGroups([...groups, newGroup]);
  };

  const updateGroupName = (groupId, name) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, name } : g));
  };

  const toggleStudentInGroup = (groupId, studentId) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        const members = group.members.includes(studentId)
          ? group.members.filter(id => id !== studentId)
          : [...group.members, studentId];
        
        // If leader is removed, clear leader
        const leaderId = members.includes(group.leaderId) ? group.leaderId : null;
        
        return { ...group, members, leaderId };
      }
      // Remove student from other groups (student can only be in one group)
      return {
        ...group,
        members: group.members.filter(id => id !== studentId),
        leaderId: group.members.includes(studentId) && group.leaderId === studentId ? null : group.leaderId
      };
    }));
  };

  const setGroupLeader = (groupId, studentId) => {
    setGroups(groups.map(g => 
      g.id === groupId ? { ...g, leaderId: studentId } : g
    ));
  };

  const removeGroup = (groupId) => {
    setGroups(groups.filter(g => g.id !== groupId));
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
    
    if (!formData.oneDriveLink.trim()) {
      newErrors.oneDriveLink = 'OneDrive link is required';
    } else if (!formData.oneDriveLink.startsWith('http')) {
      newErrors.oneDriveLink = 'Please enter a valid URL';
    }

    if (!formData.courseId) {
      newErrors.courseId = 'Please select a course';
    }

    // Validate groups for group assignments
    if (formData.submissionType === 'group') {
      if (groups.length === 0) {
        newErrors.groups = 'Please create at least one group for group assignments';
      } else {
        // Check if all students are assigned
        const assignedStudents = new Set();
        groups.forEach(g => g.members.forEach(m => assignedStudents.add(m)));
        if (students.length > 0 && assignedStudents.size !== students.length) {
          newErrors.groups = 'All students must be assigned to a group';
        }
        
        // Check if all groups have leaders
        const groupsWithoutLeaders = groups.filter(g => !g.leaderId && g.members.length > 0);
        if (groupsWithoutLeaders.length > 0) {
          newErrors.groups = 'All groups must have a leader';
        }

        // Check if all groups have members
        const emptyGroups = groups.filter(g => g.members.length === 0);
        if (emptyGroups.length > 0) {
          newErrors.groups = 'All groups must have at least one member';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    if (assignment) {
      // Update existing assignment
      // Only send changed fields to update
      const updates = {};
      ['title', 'description', 'dueDate', 'oneDriveLink', 'submissionType', 'courseId'].forEach((key) => {
        const origVal = assignment[key] || (key === 'oneDriveLink' ? assignment.driveLink || '' : '');
        if ((formData[key] || '') !== (origVal || '')) {
          // For backward compatibility, also set driveLink when oneDriveLink changes
          if (key === 'oneDriveLink') {
            updates['oneDriveLink'] = formData.oneDriveLink;
            updates['driveLink'] = formData.oneDriveLink;
          } else {
            updates[key] = formData[key];
          }
        }
      });

      if (Object.keys(updates).length > 0) {
        updateAssignment(assignment.id, updates);
      }

      // Handle groups for updated assignment
      if (formData.submissionType === 'group') {
        // Delete old groups and add new ones
        deleteGroupsByAssignment(assignment.id);
        groups.forEach(group => {
          if (group.members.length > 0) {
            addGroup({
              ...group,
              assignmentId: assignment.id,
              courseId: formData.courseId
            });
          }
        });
      } else {
        // If changed from group to individual, delete all groups
        deleteGroupsByAssignment(assignment.id);
      }
    } else {
      // Create new assignment
      const newAssignment = addAssignment({
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        oneDriveLink: formData.oneDriveLink,
        driveLink: formData.oneDriveLink,
        submissionType: formData.submissionType,
        courseId: formData.courseId,
        createdBy: userId
      });

      // If it's a group assignment, save the groups
      if (formData.submissionType === 'group' && groups.length > 0) {
        groups.forEach(group => {
          if (group.members.length > 0) {
            addGroup({
              ...group,
              assignmentId: newAssignment.id,
              courseId: formData.courseId
            });
          }
        });
      }
    }
    
    onSuccess();
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      oneDriveLink: '',
      submissionType: 'individual',
      courseId: ''
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
          <label className="label">OneDrive / Cloud Submission Link</label>
          <input
            type="url"
            name="oneDriveLink"
            value={formData.oneDriveLink}
            onChange={handleChange}
            className={`input-field ${errors.oneDriveLink ? 'border-red-500' : ''}`}
            placeholder="https://onedrive.live.com/..."
          />
          {errors.oneDriveLink && <p className="text-red-500 text-sm mt-1">{errors.oneDriveLink}</p>}
          <p className="text-xs text-gray-500 mt-1">Students will upload or link their work here</p>
        </div>

        <div>
          <label className="label">Submission Type</label>
          <select
            name="submissionType"
            value={formData.submissionType}
            onChange={handleChange}
            className="input-field"
          >
            <option value="individual">Individual</option>
            <option value="group">Group</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Choose whether students submit individually or as groups</p>
        </div>

        {/* Group Builder - Only show for group assignments */}
        {formData.submissionType === 'group' && formData.courseId && (
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">Group Assignment Setup</h3>
              <button
                type="button"
                onClick={addNewGroup}
                className="btn-secondary text-sm py-1 px-3"
              >
                + Add Group
              </button>
            </div>

            {students.length === 0 ? (
              <p className="text-gray-500 text-sm">No students enrolled in this course yet.</p>
            ) : (
              <>
                <p className="text-xs text-gray-500 mb-3">
                  Assign students to groups. Each group must have a leader who will submit on behalf of the group.
                </p>

                {groups.length === 0 ? (
                  <p className="text-gray-500 text-sm">Click "Add Group" to create your first group.</p>
                ) : (
                  <div className="space-y-4">
                    {groups.map((group, groupIndex) => (
                      <div key={group.id} className="border border-gray-200 rounded p-3 bg-white">
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={group.name}
                            onChange={(e) => updateGroupName(group.id, e.target.value)}
                            className="input-field flex-1"
                            placeholder="Group Name"
                          />
                          <button
                            type="button"
                            onClick={() => removeGroup(group.id)}
                            className="text-red-600 hover:text-red-800 px-2"
                            title="Remove group"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                          {students.map(student => {
                            const isInGroup = group.members.includes(student.id);
                            const isLeader = group.leaderId === student.id;
                            
                            return (
                              <div key={student.id} className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={isInGroup}
                                  onChange={() => toggleStudentInGroup(group.id, student.id)}
                                  className="rounded"
                                />
                                <span className={isInGroup ? 'text-gray-900' : 'text-gray-400'}>
                                  {student.name}
                                </span>
                                {isInGroup && (
                                  <button
                                    type="button"
                                    onClick={() => setGroupLeader(group.id, student.id)}
                                    className={`ml-auto text-xs px-2 py-0.5 rounded ${
                                      isLeader 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                    }`}
                                    title={isLeader ? 'Group Leader' : 'Set as Leader'}
                                  >
                                    {isLeader ? '★ Leader' : 'Set Leader'}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-2 text-xs text-gray-500">
                          {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                          {group.leaderId && ` • Leader: ${students.find(s => s.id === group.leaderId)?.name || 'Unknown'}`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {errors.groups && (
              <p className="text-red-500 text-sm mt-2">{errors.groups}</p>
            )}
          </div>
        )}

        <div>
          <label className="label">Course</label>
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            className={`input-field ${errors.courseId ? 'border-red-500' : ''}`}
          >
            <option value="">Select a course...</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.code})
              </option>
            ))}
          </select>
          {errors.courseId && <p className="text-red-500 text-sm mt-1">{errors.courseId}</p>}
          <p className="text-xs text-gray-500 mt-1">Assign this assignment to a course</p>
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
