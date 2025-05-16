import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function JobApplication() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // State for job application form
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobUrl, setJobUrl] = useState('');
  const [isUrlProcessing, setIsUrlProcessing] = useState(false);
  const [jobData, setJobData] = useState(null);
  const [selectedCvId, setSelectedCvId] = useState('');
  const [userCvs, setUserCvs] = useState([]);
  const [generatedApplication, setGeneratedApplication] = useState(null);
  const [applicationFormData, setApplicationFormData] = useState({
    recipientName: '',
    companyName: '',
    jobTitle: '',
    coverLetter: '',
    useAI: true,
    customizations: ''
  });

  // Fetch user CVs and job data if editing an existing application
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        // Fetch user's CVs
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockCvs = [
            { id: 'cv1', name: 'Software Engineer CV' },
            { id: 'cv2', name: 'Product Manager CV' },
            { id: 'cv3', name: 'Data Scientist CV' }
          ];
          setUserCvs(mockCvs);
          
          if (mockCvs.length > 0) {
            setSelectedCvId(mockCvs[0].id);
          }
          
          // If jobId exists, fetch the existing job application
          if (jobId) {
            const mockJobData = {
              id: jobId,
              jobUrl: 'https://example.com/job/senior-developer',
              jobTitle: 'Senior Frontend Developer',
              companyName: 'Tech Company XYZ',
              recipientName: 'HR Department',
              requirements: [
                'Proficient in React and modern JavaScript',
                '5+ years of frontend development experience',
                'Experience with state management libraries',
                'Understanding of CI/CD pipelines'
              ],
              coverLetter: `Dear HR Department,\n\nI am writing to express my interest in the Senior Frontend Developer position at Tech Company XYZ. With over 6 years of experience in frontend development and a strong focus on React applications, I believe I am well-suited for this role.\n\nMy experience includes...\n\nThank you for considering my application.\n\nSincerely,\nJohn Doe`
            };
            
            setJobUrl(mockJobData.jobUrl);
            setJobData({
              title: mockJobData.jobTitle,
              company: mockJobData.companyName,
              requirements: mockJobData.requirements
            });
            
            setApplicationFormData({
              recipientName: mockJobData.recipientName,
              companyName: mockJobData.companyName,
              jobTitle: mockJobData.jobTitle,
              coverLetter: mockJobData.coverLetter,
              useAI: true,
              customizations: ''
            });
            
            setGeneratedApplication({
              coverLetter: mockJobData.coverLetter
            });
          }
        }, 800);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, [jobId]);

  // Handle job URL parsing
  const handleUrlParse = async () => {
    if (!jobUrl) return;
    
    setIsUrlProcessing(true);
    try {
      // In a real app, this would make an API call to a backend service
      // that scrapes the job posting and extracts relevant information
      console.log('Processing job URL:', jobUrl);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock parsed data
      const parsedJobData = {
        title: 'Frontend Developer',
        company: 'Innovative Tech Solutions',
        requirements: [
          'Proficient in React, Vue, or Angular',
          'Strong JavaScript fundamentals',
          'Experience with RESTful APIs',
          'Knowledge of modern CSS frameworks',
          'Understanding of version control with Git'
        ]
      };
      
      setJobData(parsedJobData);
      
      setApplicationFormData(prev => ({
        ...prev,
        companyName: parsedJobData.company,
        jobTitle: parsedJobData.title
      }));
      
    } catch (error) {
      console.error('Error parsing job URL:', error);
    } finally {
      setIsUrlProcessing(false);
    }
  };

  // Generate application based on CV and job requirements
  const handleGenerateApplication = async () => {
    if (!selectedCvId || !jobData) return;
    
    setIsGenerating(true);
    try {
      // In a real app, this would make an API call to a service
      // (possibly using AI) that generates a tailored cover letter
      console.log('Generating application using CV:', selectedCvId);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock generated cover letter
      const selectedCv = userCvs.find(cv => cv.id === selectedCvId);
      
      const generatedCoverLetter = `Dear Hiring Manager,

I am writing to express my interest in the ${jobData.title} position at ${jobData.company}. As an experienced professional with a background that aligns with your requirements, I am excited about the opportunity to contribute to your team.

Based on the job requirements, I believe my qualifications are a strong match:

${jobData.requirements.map(req => `- ${req}: I have demonstrated experience in this area through my past work.`).join('\n')}

My resume (${selectedCv.name}) highlights these qualifications in more detail. I am particularly drawn to your company's innovative approach and industry leadership.

I would welcome the opportunity to discuss how my background and skills would be a good fit for the ${jobData.title} role. Thank you for considering my application.

Sincerely,
${currentUser?.firstName || 'John'} ${currentUser?.lastName || 'Doe'}`;
      
      setGeneratedApplication({
        coverLetter: generatedCoverLetter
      });
      
      setApplicationFormData(prev => ({
        ...prev,
        coverLetter: generatedCoverLetter
      }));
      
    } catch (error) {
      console.error('Error generating application:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle form field changes
  const handleInputChange = (field, value) => {
    setApplicationFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would save the application to a backend service
      console.log('Saving job application:', applicationFormData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard after successful save
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving application:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {jobId ? 'Edit Job Application' : 'Create Job Application'}
      </h1>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-lg text-gray-600">Loading...</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Job URL Input Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Information</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="url"
                placeholder="Paste job posting URL"
                className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                disabled={isUrlProcessing}
              />
              <button
                onClick={handleUrlParse}
                disabled={!jobUrl || isUrlProcessing}
                className={`px-6 py-2 rounded-lg text-white ${!jobUrl || isUrlProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isUrlProcessing ? (
                  <>
                    <span className="inline-block animate-spin mr-2">↻</span> 
                    Processing...
                  </>
                ) : 'Parse Job Details'}
              </button>
            </div>
            
            {jobData && (
              <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold text-lg mb-2">{jobData.title} at {jobData.company}</h3>
                <div className="mt-3">
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {jobData.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-700">{requirement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
          
          {/* CV Selection Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select CV</h2>
            {userCvs.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userCvs.map((cv) => (
                    <div 
                      key={cv.id} 
                      onClick={() => setSelectedCvId(cv.id)}
                      className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition ${selectedCvId === cv.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="selectedCv"
                          value={cv.id}
                          checked={selectedCvId === cv.id}
                          onChange={() => setSelectedCvId(cv.id)}
                          className="mr-2"
                        />
                        <span>{cv.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleGenerateApplication}
                    disabled={!selectedCvId || !jobData || isGenerating}
                    className={`px-6 py-2 rounded-lg text-white ${!selectedCvId || !jobData || isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    {isGenerating ? (
                      <>
                        <span className="inline-block animate-spin mr-2">↻</span> 
                        Generating...
                      </>
                    ) : 'Generate Tailored Application'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg bg-gray-50">
                <p className="text-gray-600 mb-4">You don't have any CVs created yet.</p>
                <button
                  onClick={() => navigate('/cv-builder')}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Create CV First
                </button>
              </div>
            )}
          </section>
          
          {/* Application Form Section */}
          {generatedApplication && (
            <form onSubmit={handleSubmit}>
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Customize Application</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="recipientName" className="block mb-1 font-medium text-gray-700">Recipient Name</label>
                      <input
                        id="recipientName"
                        type="text"
                        placeholder="HR Manager / Hiring Manager"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={applicationFormData.recipientName}
                        onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="companyName" className="block mb-1 font-medium text-gray-700">Company Name</label>
                      <input
                        id="companyName"
                        type="text"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={applicationFormData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="jobTitle" className="block mb-1 font-medium text-gray-700">Job Title</label>
                    <input
                      id="jobTitle"
                      type="text"
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={applicationFormData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="customizations" className="block mb-1 font-medium text-gray-700">Additional Customizations</label>
                    <textarea
                      id="customizations"
                      placeholder="Any specific points you want to highlight or requirements to focus on"
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-24"
                      value={applicationFormData.customizations}
                      onChange={(e) => handleInputChange('customizations', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <input
                        id="useAI"
                        type="checkbox"
                        checked={applicationFormData.useAI}
                        onChange={(e) => handleInputChange('useAI', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="useAI" className="font-medium text-gray-700">Use AI to improve writing</label>
                    </div>
                    <p className="text-sm text-gray-500">Our AI will enhance your cover letter for better clarity, grammar, and style.</p>
                  </div>
                  
                  <div>
                    <label htmlFor="coverLetter" className="block mb-1 font-medium text-gray-700">Cover Letter</label>
                    <textarea
                      id="coverLetter"
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-64 font-mono"
                      value={applicationFormData.coverLetter}
                      onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                    />
                  </div>
                </div>
              </section>
              
              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-lg text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block animate-spin mr-2">↻</span> 
                      Saving...
                    </>
                  ) : 'Save Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default JobApplication;
