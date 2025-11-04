import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import StudentView from './components/StudentView';
import AdminView from './components/AdminView';
import { initializeData } from './data/mockData';
import { getCurrentUser, getAuthToken, verifyToken, clearCurrentUser, syncAllStudentEnrollments } from './utils/storageUtils';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // Initialize mock data in localStorage
    initializeData();
    
    // Sync all student enrollments to ensure all students are in all courses
    syncAllStudentEnrollments();

    // Check if user is already logged in with valid token
    const token = getAuthToken();
    if (token) {
      const tokenData = verifyToken(token);
      if (tokenData) {
        // Token is valid, restore user session
        const user = getCurrentUser();
        if (user && user.id === tokenData.id) {
          setCurrentUser(user);
        } else {
          // Token valid but user data mismatch, clear session
          clearCurrentUser();
        }
      } else {
        // Token expired or invalid, clear session
        clearCurrentUser();
      }
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    setShowRegister(false);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
  };

  const handleSwitchToRegister = () => {
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return showRegister ? (
      <Register onRegister={handleRegister} onSwitchToLogin={handleSwitchToLogin} />
    ) : (
      <Login onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={handleLogout} />
      
      <main>
        {currentUser.role === 'student' ? (
          <StudentView user={currentUser} />
        ) : (
          <AdminView user={currentUser} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 JoinEasy - Assignment Management Dashboard</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
