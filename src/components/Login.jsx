import React, { useState } from 'react';
import { getUsers, setCurrentUser, generateToken, setAuthToken } from '../utils/storageUtils';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [userType, setUserType] = useState('student'); // 'student' or 'professor'
  const users = getUsers();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const user = users.find(u => u.id === selectedUser);
    if (user) {
      // Generate JWT token
      const token = generateToken(user);
      setAuthToken(token);
      
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl mb-3 transition-all duration-500 transform hover:scale-110 hover:rotate-6">
            <span className="text-white font-bold text-2xl">JE</span>
          </div>
          <h1 className="text-3xl font-black gradient-text mb-1">JoinEasy</h1>
          <p className="text-gray-600 font-medium text-sm">Assignment Management Dashboard</p>
        </div>

        <div className="glass-effect rounded-2xl shadow-2xl p-6 overflow-hidden">
          {/* Toggle Buttons */}
          <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 mb-5">
            <button
              type="button"
              onClick={() => handleUserTypeSwitch('student')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold transition-all duration-300 ${
                userType === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
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
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold transition-all duration-300 ${
                userType === 'professor'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
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
              <div className="text-center mb-5">
                <h2 className="text-2xl font-black gradient-text mb-1">
                  {userType === 'student' ? 'Student Login' : 'Professor Login'}
                </h2>
                <p className="text-sm text-gray-600 font-medium">
                  {userType === 'student' 
                    ? '📚 Access your assignments and track progress' 
                    : '👨‍🏫 Manage assignments and monitor student submissions'}
                </p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="label text-gray-800">
                    Select Your {userType === 'student' ? 'Student' : 'Professor'} Account
                  </label>
                  <div className="relative">
                    <select
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="input-field appearance-none pr-10 font-medium text-gray-800 cursor-pointer hover:border-blue-300 transition-colors"
                      required
                    >
                      <option value="">Choose an account...</option>
                      {currentUsers.map(user => (
                        <option key={user.id} value={user.id} className="py-2">
                          {user.name} • {user.email}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedUser}
                  className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    userType === 'student'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    Continue to Dashboard
                  </span>
                </button>
              </form>

              {/* Switch to Register */}
              <div className="text-center pt-5 mt-5 border-t border-gray-200/50">
                <p className="text-sm text-gray-600 font-medium">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className={`font-bold underline decoration-2 underline-offset-2 transition-colors ${
                      userType === 'student'
                        ? 'text-blue-600 hover:text-blue-700'
                        : 'text-purple-600 hover:text-purple-700'
                    }`}
                  >
                    Register here →
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
