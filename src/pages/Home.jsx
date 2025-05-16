import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  LinkIcon, 
  DocumentDuplicateIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

function Home() {
  const features = [
    {
      name: 'LinkedIn Profile Import',
      description:
        'Connect your LinkedIn profile to automatically generate a professional CV with all your experience, education, and skills.',
      icon: LinkIcon,
    },
    {
      name: 'ATS-Optimized Documents',
      description:
        'Our system analyzes your CV against job descriptions to optimize it for Applicant Tracking Systems, increasing your chances of getting interviews.',
      icon: ChartBarIcon,
    },
    {
      name: 'Job-Specific Applications',
      description:
        'Generate tailored job applications by pasting a job URL. We analyze the requirements and help you create the perfect application.',
      icon: DocumentDuplicateIcon,
    },
    {
      name: 'Professional Templates',
      description:
        'Choose from a variety of professional templates to make your CV stand out while maintaining ATS compatibility.',
      icon: DocumentTextIcon,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl py-24 sm:py-32 px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Create ATS-Optimized CVs from your LinkedIn Profile
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              LinkedCV helps you generate professional, ATS-friendly CVs and job applications in minutes.
              Connect your LinkedIn profile or paste a job URL to get started.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get Started
              </Link>
              <Link to="/login" className="text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600">
                Sign In <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto max-w-7xl py-16 sm:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Effortless CV creation</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to land your dream job
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            LinkedCV streamlines the job application process, helping you create tailored, ATS-optimized documents in minutes.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl pb-24 sm:pb-32 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-blue-600">
        <div className="mx-auto max-w-7xl py-12 sm:py-24 px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-24">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to create your professional CV?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-gray-300">
              Join thousands of professionals who have already improved their job applications with LinkedCV.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started now
              </Link>
              <Link to="/login" className="text-sm font-semibold leading-6 text-white hover:underline">
                Already have an account? <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;