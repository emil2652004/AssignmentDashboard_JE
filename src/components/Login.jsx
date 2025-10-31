import React, { useState } from 'react';
import { getUsers, setCurrentUser } from '../utils/storageUtils';

const Login = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [userType, setUserType] = useState('student'); // 'student' or 'professor'
  const users = getUsers();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const user = users.find(u => u.id === selectedUser);
    if (user) {
      setCurrentUser(user);
      onLogin(user);
    }
  };

  const handleUserTypeSwitch = (type) => {
    setUserType(type);
    setSelectedUser(''); // Reset selection when switching
  };

  const studentUsers = users.filter(u => u.role === 'student');
  const adminUsers = users.filter(u => u.role === 'admin');

  const currentUsers = userType === 'student' ? studentUsers : adminUsers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg mb-4 transition-all duration-500 transform hover:scale-110">
            <span className="text-white font-bold text-3xl">JE</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">JoinEasy</h1>
          <p className="text-gray-600">Assignment Management Dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => handleUserTypeSwitch('student')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                userType === 'student'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md transform scale-105'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center justify-center">
                <span className="text-xl mr-2">👨‍🎓</span>
                Student
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleUserTypeSwitch('professor')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                userType === 'professor'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md transform scale-105'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center justify-center">
                <span className="text-xl mr-2">👨‍🏫</span>
                Professor
              </span>
            </button>
          </div>

          {/* Animated Content */}
          <div className="relative">
            <div 
              key={userType}
              className="animate-fadeIn"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {userType === 'student' ? 'Student Login' : 'Professor Login'}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {userType === 'student' 
                  ? 'Access your assignments and track progress' 
                  : 'Manage assignments and monitor student submissions'}
              </p>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="label">
                    Select Your {userType === 'student' ? 'Student' : 'Professor'} Account
                  </label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">Choose an account...</option>
                    {currentUsers.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!selectedUser}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    userType === 'student'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  Continue to Dashboard
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
