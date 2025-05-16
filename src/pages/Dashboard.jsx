import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  DocumentTextIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  PencilSquareIcon,
  LinkIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
  const { currentUser, linkedInProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('resumes');
  const [deleteModal, setDeleteModal] = useState({ show: false, itemId: null, type: null });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real implementation, you would fetch data from your API
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        // Mock resumes
        const mockResumes = [
          {
            id: 'resume1',
            name: 'Software Engineer CV',
            lastModified: new Date('2025-05-12T10:30:00'),
            template: 'professional',
            isPrimary: true,
          },
          {
            id: 'resume2',
            name: 'Data Scientist CV',
            lastModified: new Date('2025-05-10T14:15:00'),
            template: 'modern',
            isPrimary: false,
          },
          {
            id: 'resume3',
            name: 'Product Manager CV',
            lastModified: new Date('2025-05-05T09:45:00'),
            template: 'creative',
            isPrimary: false,
          }
        ];
        
        // Mock job applications
        const mockJobApplications = [
          {
            id: 'app1',
            jobTitle: 'Senior Software Engineer',
            company: 'Tech Corp',
            submissionDate: new Date('2025-05-11T16:20:00'),
            status: 'submitted',
            resumeId: 'resume1'
          },
          {
            id: 'app2',
            jobTitle: 'Data Scientist',
            company: 'Data Innovations',
            submissionDate: new Date('2025-05-09T11:30:00'),
            status: 'draft',
            resumeId: 'resume2'
          }
        ];
        
        setResumeData(mockResumes);
        setJobApplications(mockJobApplications);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleDeleteClick = (id, type) => {
    setDeleteModal({
      show: true,
      itemId: id,
      type
    });
  };
  
  const handleDeleteConfirm = () => {
    if (deleteModal.type === 'resume') {
      setResumeData(resumeData.filter(resume => resume.id !== deleteModal.itemId));
    } else if (deleteModal.type === 'application') {
      setJobApplications(jobApplications.filter(app => app.id !== deleteModal.itemId));
    }
    setDeleteModal({ show: false, itemId: null, type: null });
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your CVs and job applications
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0 space-x-3">
          <Link
            to="/cv-builder"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <DocumentTextIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            New CV
          </Link>
          <Link
            to="/job-application"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <DocumentDuplicateIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Application
          </Link>
        </div>
      </div>

      {!linkedInProfile && (
        <div className="rounded-md bg-blue-50 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <LinkIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Connect with LinkedIn</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Connect your LinkedIn profile to automatically create a CV based on your professional data.
                </p>
              </div>
              <div className="mt-3">
                <div className="-mx-2 -my-1.5 flex">
                  <Link
                    to="/profile"
                    className="rounded-md bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-200"
                  >
                    Connect Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'resumes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('resumes')}
          >
            Your CVs
          </button>
          <button
            className={`${
              activeTab === 'applications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('applications')}
          >
            Job Applications
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'resumes' && (
          <>
            {resumeData.length > 0 ? (
              <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resumeData.map((resume) => (
                  <li
                    key={resume.id}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                  >
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-sm font-medium text-gray-900">{resume.name}</h3>
                          {resume.isPrimary && (
                            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className="mt-1 truncate text-sm text-gray-500">
                          Template: {resume.template.charAt(0).toUpperCase() + resume.template.slice(1)}
                        </p>
                        <p className="mt-1 truncate text-sm text-gray-500">
                          Last updated: {formatDate(resume.lastModified)}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <DocumentTextIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
                      </div>
                    </div>
                    <div>
                      <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="flex w-0 flex-1">
                          <Link
                            to={`/cv-builder?id=${resume.id}`}
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                          >
                            <PencilSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            Edit
                          </Link>
                        </div>
                        <div className="flex w-0 flex-1">
                          <button
                            onClick={() => handleDeleteClick(resume.id, 'resume')}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-red-50"
                          >
                            <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No CVs yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new CV.</p>
                <div className="mt-6">
                  <Link
                    to="/cv-builder"
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    <DocumentTextIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    New CV
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'applications' && (
          <>
            {jobApplications.length > 0 ? (
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                            Position
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Company
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Date
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {jobApplications.map((application) => (
                          <tr key={application.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                              {application.jobTitle}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {application.company}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  application.status === 'submitted'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {formatDate(application.submissionDate)}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                              <div className="flex justify-end space-x-3">
                                <Link
                                  to={`/job-application/${application.id}`}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Edit<span className="sr-only">, {application.jobTitle}</span>
                                </Link>
                                <button
                                  onClick={() => handleDeleteClick(application.id, 'application')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete<span className="sr-only">, {application.jobTitle}</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <DocumentDuplicateIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No job applications</h3>
                <p className="mt-1 text-sm text-gray-500">Create an application from a job posting.</p>
                <div className="mt-6">
                  <Link
                    to="/job-application"
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    <DocumentDuplicateIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    New Application
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">
                    Delete {deleteModal.type === 'resume' ? 'CV' : 'job application'}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this {deleteModal.type === 'resume' ? 'CV' : 'job application'}? 
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  onClick={() => setDeleteModal({ show: false, itemId: null, type: null })}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;