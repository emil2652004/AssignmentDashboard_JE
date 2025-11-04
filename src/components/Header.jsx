import React from 'react';
import { clearCurrentUser } from '../utils/storageUtils';

const Header = ({ user, onLogout }) => {
  const handleLogout = () => {
    clearCurrentUser();
    onLogout();
  };

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-xl">JE</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">JoinEasy</h1>
              <p className="text-xs text-gray-600 font-medium">Assignment Dashboard</p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs capitalize">
                  <span className={`badge ${user.role === 'admin' ? 'badge-blue' : 'badge-purple'}`}>
                    {user.role === 'admin' ? '👨‍🏫 Professor' : '👨‍🎓 Student'}
                  </span>
                </p>
              </div>
              
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center border-2 border-blue-200 shadow-md">
                <span className="font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-white text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200 transform hover:-translate-y-0.5"
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
