import React from 'react';
import { clearCurrentUser } from '../utils/storageUtils';

const Header = ({ user, onLogout }) => {
  const handleLogout = () => {
    clearCurrentUser();
    onLogout();
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">JE</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">JoinEasy</h1>
              <p className="text-xs text-gray-500">Assignment Dashboard</p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs capitalize text-gray-500">
                  {user.role === 'admin' ? 'Professor' : 'Student'}
                </p>
              </div>
              
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-sm text-primary-700">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
