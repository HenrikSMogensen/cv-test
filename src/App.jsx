import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CVBuilder from './pages/CVBuilder';
import JobApplication from './pages/JobApplication';
import Templates from './pages/Templates';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Contexts
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check user authentication status and load initial data
    setTimeout(() => setIsLoading(false), 1000); // Simulating initial load
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-blue-600">LinkedCV</h2>
          <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/cv-builder" element={
                <ProtectedRoute>
                  <CVBuilder />
                </ProtectedRoute>
              } />
              <Route path="/job-application/:jobId?" element={
                <ProtectedRoute>
                  <JobApplication />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/templates" element={
                <ProtectedRoute>
                  <Templates />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
