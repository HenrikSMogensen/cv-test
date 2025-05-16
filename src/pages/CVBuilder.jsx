import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function CVBuilder() {
  const { currentUser, linkedInProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id');
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [activeTab, setActiveTab] = useState('personal');
  const [previewMode, setPreviewMode] = useState(false);

  // Form state for CV data
  const [formData, setFormData] = useState({
    name: '',
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: ''
    },
    workExperience: [],
    education: [],
    skills: [],
    certifications: []
  });
  
  // Template options
  const templates = [
    { id: 'professional', name: 'Professional', preview: '/assets/templates/professional.png' },
    { id: 'modern', name: 'Modern', preview: '/assets/templates/modern.png' },
    { id: 'creative', name: 'Creative', preview: '/assets/templates/creative.png' },
    { id: 'executive', name: 'Executive', preview: '/assets/templates/executive.png' },
  ];

  // Fetch resume data if editing an existing resume
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        // In a real implementation, you would fetch data from your API
        // For now, we'll use mock data or LinkedIn profile data
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        if (resumeId) {
          // Editing an existing resume - mock data
          const mockResume = {
            id: 'resume1',
            name: 'Software Engineer CV',
            template: 'professional',
            personal: {
              firstName: currentUser?.firstName || 'John',
              lastName: currentUser?.lastName || 'Doe',
              email: currentUser?.email || 'john@example.com',
              phone: '+1 (555) 123-4567',
              location: 'San Francisco, CA',
              title: 'Senior Software Engineer',
              summary: 'Experienced software engineer with 8+ years developing scalable web applications using modern JavaScript frameworks and cloud technologies.'
            },
            workExperience: [
              {
                id: 'exp1',
                company: 'Tech Company A',
                title: 'Senior Software Engineer',
                location: 'San Francisco, CA',
                startDate: '2020-01',
                endDate: '', // current position
                description: 'Leading development of cloud-based solutions using React, Node.js, and AWS.'
              },
              {
                id: 'exp2',
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
                id: 'edu1',
                institution: 'University of Technology',
                degree: 'Bachelor of Science',
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
                id: 'cert1',
                name: 'AWS Certified Solutions Architect',
                organization: 'Amazon Web Services',
                issueDate: '2021-05',
                expirationDate: '2024-05'
              }
            ]
          };
          
          setResumeData(mockResume);
          setSelectedTemplate(mockResume.template);
          setFormData(mockResume);
          
        } else if (linkedInProfile) {
          // Creating a new resume from LinkedIn profile
          const newResume = {
            name: `${currentUser.firstName}'s CV`,
            template: 'professional',
            personal: {
              firstName: linkedInProfile.parsedData?.firstName || currentUser?.firstName,
              lastName: linkedInProfile.parsedData?.lastName || currentUser?.lastName,
              email: currentUser?.email,
              phone: '',
              location: linkedInProfile.parsedData?.location?.name || '',
              title: linkedInProfile.rawData?.headline || '',
              summary: ''
            },
            workExperience: linkedInProfile.parsedData?.workExperience || [],
            education: linkedInProfile.parsedData?.education || [],
            skills: linkedInProfile.parsedData?.skills || [],
            certifications: linkedInProfile.parsedData?.certifications || []
          };
          
          setResumeData(newResume);
          setFormData(newResume);
          
        } else {
          // Creating a new resume from scratch
          const newResume = {
            name: '',
            template: 'professional',
            personal: {
              firstName: currentUser?.firstName || '',
              lastName: currentUser?.lastName || '',
              email: currentUser?.email || '',
              phone: '',
              location: '',
              title: '',
              summary: ''
            },
            workExperience: [],
            education: [],
            skills: [],
            certifications: []
          };
          
          setResumeData(newResume);
          setFormData(newResume);
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResumeData();
  }, [currentUser, linkedInProfile, resumeId]);

  
  // Handle form field changes
  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prevData => {
      const newData = { ...prevData };
      
      if (index !== null) {
        // For array fields (work experience, education, etc.)
        newData[section][index] = {
          ...newData[section][index],
          [field]: value
        };
      } else if (section === 'skills') {
        // Special handling for skills (string array)
        newData.skills = value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
      } else if (section === 'personal') {
        // For personal information object
        newData.personal = {
          ...newData.personal,
          [field]: value
        };
      } else {
        // For direct properties
        newData[field] = value;
      }
      
      return newData;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      // In a real implementation, you would save this data to your backend
      console.log('Saving CV data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard after successful save
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving CV:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setFormData(prevData => ({
      ...prevData,
      template: templateId
    }));
  };

  // Add new work experience entry
  const addWorkExperience = () => {
    setFormData(prevData => ({
      ...prevData,
      workExperience: [
        ...prevData.workExperience,
        { 
          id: `exp-new-${Date.now()}`,
          company: '',
          title: '',
          location: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  };
  
  // Remove work experience entry
  const removeWorkExperience = (id) => {
    setFormData(prevData => ({
      ...prevData,
      workExperience: prevData.workExperience.filter(exp => exp.id !== id)
    }));
  };
  
  // Add new education entry
  const addEducation = () => {
    setFormData(prevData => ({
      ...prevData,
      education: [
        ...prevData.education,
        { 
          id: `edu-new-${Date.now()}`,
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: ''
        }
      ]
    }));
  };
  
  // Remove education entry
  const removeEducation = (id) => {
    setFormData(prevData => ({
      ...prevData,
      education: prevData.education.filter(edu => edu.id !== id)
    }));
  };
  
  // Add new certification entry
  const addCertification = () => {
    setFormData(prevData => ({
      ...prevData,
      certifications: [
        ...prevData.certifications,
        { 
          id: `cert-new-${Date.now()}`,
          name: '',
          organization: '',
          issueDate: '',
          expirationDate: ''
        }
      ]
    }));
  };
  
  // Remove certification entry
  const removeCertification = (id) => {
    setFormData(prevData => ({
      ...prevData,
      certifications: prevData.certifications.filter(cert => cert.id !== id)
    }));
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CV builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header section with title and action buttons */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {resumeId ? 'Edit CV' : 'Create New CV'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {resumeId 
              ? 'Update your existing CV'
              : 'Create a professional CV in minutes'}
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0 space-x-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save CV'}
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Template selection sidebar */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Choose Template</h2>
          <div className="space-y-4">
            {templates.map((template) => (
              <div 
                key={template.id}
                className={`relative rounded-md border p-2 cursor-pointer ${selectedTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="aspect-h-9 aspect-w-7 overflow-hidden rounded">
                  <img
                    src={template.preview || `https://via.placeholder.com/300x400?text=${template.name}`}
                    alt={`${template.name} template preview`}
                    className="object-cover"
                  />
                </div>
                <div className="mt-2 text-center text-sm font-medium text-gray-900">{template.name}</div>
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form content area */}
        <div className="lg:col-span-3">
          {previewMode ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">CV Preview</h2>
                <div className="bg-gray-100 border rounded-lg p-8 min-h-[800px]">
                  {/* This would be your actual CV preview component */}
                  <div className="text-center text-gray-500">
                    CV preview will be displayed here based on the selected template.
                    <p className="mt-4">In a real implementation, this would show the formatted CV.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Tab navigation */}
              <div className="border-b border-gray-200">
                <div className="flex flex-wrap -mb-px">
                  <button
                    type="button"
                    className={`${activeTab === 'personal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                    onClick={() => setActiveTab('personal')}
                  >
                    Personal Information
                  </button>
                  <button
                    type="button"
                    className={`${activeTab === 'experience' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                    onClick={() => setActiveTab('experience')}
                  >
                    Work Experience
                  </button>
                  <button
                    type="button"
                    className={`${activeTab === 'education' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                    onClick={() => setActiveTab('education')}
                  >
                    Education
                  </button>
                  <button
                    type="button"
                    className={`${activeTab === 'skills' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                    onClick={() => setActiveTab('skills')}
                  >
                    Skills & Certifications
                  </button>
                </div>
              </div>

              
              {/* Form content */}
              <form className="p-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {/* Personal Information Tab Content */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                      {/* CV Name (internal reference) */}
                      <div className="sm:col-span-6">
                        <label htmlFor="cvName" className="block text-sm font-medium leading-6 text-gray-900">
                          CV Name (for your reference)
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="cvName"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            placeholder="e.g., Software Engineer CV"
                            value={formData.name}
                            onChange={(e) => handleInputChange(null, 'name', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* First Name */}
                      <div className="sm:col-span-3">
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                          First name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="firstName"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            value={formData.personal.firstName}
                            onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="sm:col-span-3">
                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                          Last name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="lastName"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            value={formData.personal.lastName}
                            onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Professional Title */}
                      <div className="sm:col-span-6">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                          Professional Title
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="title"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            placeholder="e.g., Senior Software Engineer"
                            value={formData.personal.title}
                            onChange={(e) => handleInputChange('personal', 'title', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            type="email"
                            id="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            value={formData.personal.email}
                            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                          Phone number
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            id="phone"
                            autoComplete="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            value={formData.personal.phone}
                            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="sm:col-span-6">
                        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                          Location
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="location"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            placeholder="e.g., San Francisco, CA"
                            value={formData.personal.location}
                            onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="sm:col-span-6">
                        <label htmlFor="summary" className="block text-sm font-medium leading-6 text-gray-900">
                          Professional Summary
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="summary"
                            rows={4}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            placeholder="Brief professional summary highlighting your experience and key strengths"
                            value={formData.personal.summary}
                            onChange={(e) => handleInputChange('personal', 'summary', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}


                {/* Work Experience Tab Content */}
                {activeTab === 'experience' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium text-gray-900">Work Experience</h2>
                      <button
                        type="button"
                        onClick={addWorkExperience}
                        className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                      >
                        Add Experience
                      </button>
                    </div>
                    
                    {formData.workExperience.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">No work experience added yet</div>
                    ) : (
                      formData.workExperience.map((experience, index) => (
                        <div key={experience.id} className="border rounded-lg p-4 bg-gray-50 relative space-y-4">
                          <button
                            type="button"
                            onClick={() => removeWorkExperience(experience.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium text-gray-900">Company</label>
                              <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={experience.company || ''}
                                onChange={(e) => handleInputChange('workExperience', 'company', e.target.value, index)}
                                required
                              />
                            </div>
                            
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium text-gray-900">Job Title</label>
                              <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={experience.title || ''}
                                onChange={(e) => handleInputChange('workExperience', 'title', e.target.value, index)}
                                required
                              />
                            </div>
                            
                            <div className="sm:col-span-2">
                              <label className="block text-sm font-medium text-gray-900">Start Date</label>
                              <input
                                type="month"
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={experience.startDate || ''}
                                onChange={(e) => handleInputChange('workExperience', 'startDate', e.target.value, index)}
                              />
                            </div>
                            
                            <div className="sm:col-span-2">
                              <label className="block text-sm font-medium text-gray-900">End Date</label>
                              <input
                                type="month"
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={experience.endDate || ''}
                                onChange={(e) => handleInputChange('workExperience', 'endDate', e.target.value, index)}
                                placeholder="Present (if current)"
                              />
                            </div>
                            
                            <div className="sm:col-span-6">
                              <label className="block text-sm font-medium text-gray-900">Description</label>
                              <textarea
                                rows={3}
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={experience.description || ''}
                                onChange={(e) => handleInputChange('workExperience', 'description', e.target.value, index)}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Education Tab Content */}
                {activeTab === 'education' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium text-gray-900">Education</h2>
                      <button
                        type="button"
                        onClick={addEducation}
                        className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                      >
                        Add Education
                      </button>
                    </div>

                    {formData.education.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">No education entries added yet</div>
                    ) : (
                      formData.education.map((education, index) => (
                        <div key={education.id} className="border rounded-lg p-4 bg-gray-50 relative space-y-4">
                          <button
                            type="button"
                            onClick={() => removeEducation(education.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium text-gray-900">Institution</label>
                              <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={education.institution || ''}
                                onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                                required
                              />
                            </div>
                            
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium text-gray-900">Degree</label>
                              <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                value={education.degree || ''}
                                onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Skills & Certifications Tab Content */}
                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Skills</h2>
                      <div>
                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                          Enter skills separated by commas
                        </label>
                        <textarea
                          id="skills"
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          placeholder="JavaScript, React, Node.js, etc."
                          value={formData.skills.join(', ')}
                          onChange={(e) => handleInputChange('skills', null, e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Certifications</h2>
                        <button
                          type="button"
                          onClick={addCertification}
                          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                        >
                          Add Certification
                        </button>
                      </div>
                      
                      {formData.certifications.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">No certifications added yet</div>
                      ) : (
                        formData.certifications.map((certification, index) => (
                          <div key={certification.id} className="border rounded-lg p-4 bg-gray-50 relative space-y-4 mb-4">
                            <button
                              type="button"
                              onClick={() => removeCertification(certification.id)}
                              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                            
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                              <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Name</label>
                                <input
                                  type="text"
                                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  value={certification.name || ''}
                                  onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
                                  required
                                />
                              </div>
                              
                              <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Issuing Organization</label>
                                <input
                                  type="text"
                                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  value={certification.organization || ''}
                                  onChange={(e) => handleInputChange('certifications', 'organization', e.target.value, index)}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CVBuilder;
