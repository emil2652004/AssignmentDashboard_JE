import React, { useState } from 'react';
import { registerUser, setCurrentUser, generateToken, setAuthToken } from '../utils/storageUtils';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    // Simulate network delay for realistic UX
    setTimeout(() => {
      try {
        const newUser = registerUser(formData);
        
        // Generate JWT token
        const token = generateToken(newUser);
        setAuthToken(token);
        
        // Set current user
        setCurrentUser(newUser);
        
        // Success - redirect to dashboard
        onRegister(newUser);
      } catch (error) {
        setErrors({ submit: error.message });
        setIsLoading(false);
      }
    }, 800);
  };

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
          <h1 className="text-3xl font-black gradient-text mb-1">Create Account</h1>
          <p className="text-gray-600 font-medium text-sm">Join the Assignment Management Platform</p>
        </div>

        <div className="glass-effect rounded-2xl shadow-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="label text-gray-800">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'} font-medium`}
                placeholder="e.g., John Doe"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="label text-gray-800">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'} font-medium`}
                placeholder="e.g., john@example.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="label text-gray-800">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  I am a...
                </span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                  disabled={isLoading}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    formData.role === 'student'
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-1">👨‍🎓</div>
                  <div className="font-bold text-gray-900">Student</div>
                  <div className="text-xs text-gray-600 mt-1 font-medium">Access assignments</div>
                  {formData.role === 'student' && (
                    <div className="mt-2">
                      <span className="badge badge-blue text-xs">Selected</span>
                    </div>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'admin' }))}
                  disabled={isLoading}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    formData.role === 'admin'
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-1">👨‍🏫</div>
                  <div className="font-bold text-gray-900">Professor</div>
                  <div className="text-xs text-gray-600 mt-1 font-medium">Manage courses</div>
                  {formData.role === 'admin' && (
                    <div className="mt-2">
                      <span className="badge badge-purple text-xs">Selected</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                formData.role === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </span>
              )}
            </button>

            {/* Switch to Login */}
            <div className="text-center pt-5 border-t border-gray-200/50">
              <p className="text-sm text-gray-600 font-medium">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className={`font-bold underline decoration-2 underline-offset-2 transition-colors ${
                    formData.role === 'student'
                      ? 'text-blue-600 hover:text-blue-700'
                      : 'text-purple-600 hover:text-purple-700'
                  }`}
                  disabled={isLoading}
                >
                  Login here →
                </button>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Register;
