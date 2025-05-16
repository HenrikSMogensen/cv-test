import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  // State variables for authentication
  const [currentUser, setCurrentUser] = useState(null);
  const [linkedInProfile, setLinkedInProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock API for development purposes
  // In a real implementation, these would connect to actual backend services
  const API = {
    login: async (email, password) => {
      try {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock user data - replace with actual API call
        if (email === 'demo@example.com' && password === 'password') {
          const userData = {
            id: 'user123',
            email: 'demo@example.com',
            firstName: 'Demo',
            lastName: 'User',
            linkedInConnected: false
          };
          
          // Store user data in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(userData));
          return { success: true, user: userData };
        } else {
          return { success: false, message: 'Invalid email or password' };
        }
      } catch (err) {
        console.error('Login error:', err);
        return { success: false, message: 'An error occurred during login' };
      }
    },

    register: async (firstName, lastName, email, password) => {
      try {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock registration - replace with actual API call
        const userData = {
          id: `user${Date.now()}`,
          email,
          firstName,
          lastName,
          linkedInConnected: false,
          createdAt: new Date().toISOString()
        };
        
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
      } catch (err) {
        console.error('Registration error:', err);
        return { success: false, message: 'An error occurred during registration' };
      }
    },

    logout: async () => {
      try {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove user data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('linkedInProfile');
        return { success: true };
      } catch (err) {
        console.error('Logout error:', err);
        return { success: false, message: 'An error occurred during logout' };
      }
    },

    connectLinkedIn: async (code) => {
      try {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Mock LinkedIn connection - replace with actual LinkedIn OAuth flow
        const profileData = {
          id: 'linkedin123',
          rawData: {
            firstName: currentUser?.firstName || 'Demo',
            lastName: currentUser?.lastName || 'User',
            emailAddress: currentUser?.email || 'demo@example.com',
            headline: 'Software Engineer',
            profilePicture: 'https://via.placeholder.com/150',
            industry: 'Computer Software',
            location: {
              country: { code: 'us' },
              name: 'San Francisco Bay Area'
            }
          },
          parsedData: {
            workExperience: [
              {
                company: 'Tech Company A',
                title: 'Senior Software Engineer',
                location: 'San Francisco, CA',
                startDate: '2020-01',
                endDate: null, // current position
                description: 'Leading development of cloud-based solutions using React, Node.js, and AWS.'
              },
              {
                company: 'Tech Company B',
                title: 'Software Developer',
                location: 'San Francisco, CA',
                startDate: '2018-03',
                endDate: '2019-12',
                description: 'Developed and maintained web applications using JavaScript frameworks.'
              }
            ],
            education: [
              {
                institution: 'University of Technology',
                degree: 'Bachelor of Science in Computer Science',
                fieldOfStudy: 'Computer Science',
                startDate: '2014',
                endDate: '2018'
              }
            ],
            skills: [
              'JavaScript', 'React', 'Node.js', 'AWS', 'Python', 'Machine Learning',
              'Data Analysis', 'SQL', 'NoSQL', 'Git', 'CI/CD', 'Agile Development'
            ],
            certifications: [
              {
                name: 'AWS Certified Solutions Architect',
                organization: 'Amazon Web Services',
                issueDate: '2021-05',
                expirationDate: '2024-05'
              }
            ]
          },
          lastSynced: new Date().toISOString()
        };
        
        // Update the user's linkedInConnected status
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            linkedInConnected: true
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setCurrentUser(updatedUser);
        }
        
        // Store LinkedIn profile data
        localStorage.setItem('linkedInProfile', JSON.stringify(profileData));
        return { success: true, profile: profileData };
      } catch (err) {
        console.error('LinkedIn connection error:', err);
        return { success: false, message: 'An error occurred while connecting to LinkedIn' };
      }
    },

    disconnectLinkedIn: async () => {
      try {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Update the user's linkedInConnected status
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            linkedInConnected: false
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setCurrentUser(updatedUser);
        }
        
        // Remove LinkedIn profile data
        localStorage.removeItem('linkedInProfile');
        setLinkedInProfile(null);
        return { success: true };
      } catch (err) {
        console.error('LinkedIn disconnect error:', err);
        return { success: false, message: 'An error occurred while disconnecting from LinkedIn' };
      }
    }
  };

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedLinkedInProfile = localStorage.getItem('linkedInProfile');
        
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
        
        if (storedLinkedInProfile) {
          setLinkedInProfile(JSON.parse(storedLinkedInProfile));
        }
      } catch (err) {
        console.error('Error checking auth status:', err);
        setError('Failed to retrieve authentication status');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Handle LinkedIn OAuth callback
  const handleLinkedInCallback = async (code) => {
    setLoading(true);
    try {
      const result = await API.connectLinkedIn(code);
      if (result.success) {
        setLinkedInProfile(result.profile);
        return { success: true, profile: result.profile };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (err) {
      console.error('LinkedIn callback error:', err);
      setError('Failed to connect with LinkedIn');
      return { success: false, message: 'Failed to connect with LinkedIn' };
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await API.login(email, password);
      
      if (result.success) {
        setCurrentUser(result.user);
        return { success: true };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to login');
      return { success: false, message: 'Failed to login' };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (firstName, lastName, email, password) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await API.register(firstName, lastName, email, password);
      
      if (result.success) {
        setCurrentUser(result.user);
        return { success: true };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register');
      return { success: false, message: 'Failed to register' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    
    try {
      await API.logout();
      setCurrentUser(null);
      setLinkedInProfile(null);
      return { success: true };
    } catch (err) {
      console.error('Logout error:', err);
      return { success: false, message: 'Failed to logout' };
    } finally {
      setLoading(false);
    }
  };

  // Value object to be provided to consumers of the context
  const value = {
    currentUser,
    linkedInProfile,
    loading,
    error,
    login,
    register,
    logout,
    handleLinkedInCallback,
    isAuthenticated: !!currentUser,
    API
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;