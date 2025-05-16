import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateUser, connectLinkedIn, disconnectLinkedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    title: '',
    company: '',
    location: ''
  });

  // Password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Populate form with user data when available
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        title: user.title || '',
        company: user.company || '',
        location: user.location || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setErrorMessage('First name, last name, and email are required');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const validatePasswordForm = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setErrorMessage('All password fields are required');
      return false;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('New passwords do not match');
      return false;
    }
    
    if (passwordData.newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      // In a real app, we would call an API to update the user profile
      await updateUser(formData);
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setErrorMessage('Error updating profile: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validatePasswordForm()) {
      return;
    }

    setIsSaving(true);
    try {
      // In a real app, we would call an API to update the password
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setSuccessMessage('Password changed successfully');
      setShowPasswordChange(false);
    } catch (error) {
      setErrorMessage('Error changing password: ' + (error.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleConnectLinkedIn = async () => {
    try {
      await connectLinkedIn();
      setSuccessMessage('LinkedIn account connected successfully');
    } catch (error) {
      setErrorMessage('Error connecting LinkedIn: ' + error.message);
    }
  };

  const handleDisconnectLinkedIn = async () => {
    try {
      await disconnectLinkedIn();
      setSuccessMessage('LinkedIn account disconnected successfully');
    } catch (error) {
      setErrorMessage('Error disconnecting LinkedIn: ' + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      {/* Success and Error Messages */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header with Avatar */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white overflow-hidden">
              {user?.firstName?.charAt(0) || ''}{user?.lastName?.charAt(0) || ''}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold">
                {isEditing ? (
                  <span className="text-blue-200">Editing Profile</span>
                ) : (
                  <span>{user?.firstName} {user?.lastName}</span>
                )}
              </h2>
              <p className="opacity-90">{user?.email}</p>
              {user?.title && (
                <p className="mt-1 opacity-80">{user?.title} {user?.company ? `at ${user?.company}` : ''}</p>
              )}
            </div>
          </div>
        </div>

        {/* LinkedIn Connection Status */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium mb-4">LinkedIn Connection</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                {user?.linkedInConnected ? (
                  <>
                    <span className="text-green-600 font-medium">Connected</span> - 
                    Your LinkedIn profile is synced with LinkedCV
                  </>
                ) : (
                  'Connect your LinkedIn profile to automatically import your professional data'
                )}
              </p>
            </div>
            
            <button 
              onClick={user?.linkedInConnected ? handleDisconnectLinkedIn : handleConnectLinkedIn}
              className={`px-4 py-2 rounded transition-colors ${
                user?.linkedInConnected 
                  ? 'bg-white border border-red-500 text-red-500 hover:bg-red-50' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {user?.linkedInConnected ? 'Disconnect' : 'Connect LinkedIn'}
            </button>
          </div>
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              
              {!isEditing && (
                <button 
                  type="button" 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-sm text-gray-500">First Name</p>
                  <p className="font-medium">{formData.firstName || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Last Name</p>
                  <p className="font-medium">{formData.lastName || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{formData.email || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{formData.phone || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Job Title</p>
                  <p className="font-medium">{formData.title || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{formData.company || '-'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{formData.location || '-'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Password Section */}
          <div className="mb-6 pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Password</h3>
              
              {!showPasswordChange && (
                <button 
                  type="button" 
                  onClick={() => setShowPasswordChange(true)}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50"
                >
                  Change Password
                </button>
              )}
            </div>

            {showPasswordChange && (
              <div className="bg-gray-50 p-4 rounded border">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordChange(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="button"
                    onClick={handlePasswordChange}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Update Password'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Account Settings */}
          <div className="mb-6 pt-6 border-t">
            <h3 className="text-lg font-medium mb-4">Account Settings</h3>
            
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates about your account and new features</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button type="button" className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                Set up
              </button>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-red-600">Delete Account</p>
                <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
              </div>
              <button type="button" className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50">
                Delete Account
              </button>
            </div>
          </div>
          
          {/* Save/Cancel buttons for profile editing */}
          {isEditing && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  // Reset form to original user data
                  if (user) {
                    setFormData({
                      firstName: user.firstName || '',
                      lastName: user.lastName || '',
                      email: user.email || '',
                      phone: user.phone || '',
                      title: user.title || '',
                      company: user.company || '',
                      location: user.location || ''
                    });
                  }
                }}
                className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-50"
                disabled={isSaving}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;