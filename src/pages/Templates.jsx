import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('cv'); // 'cv' or 'cover-letter'

  // Template data
  const templates = {
    cv: [
      {
        id: 'modern',
        name: 'Modern Professional',
        description: 'Clean, minimalist design with a professional touch',
        thumbnail: '/assets/images/templates/cv-modern-thumb.png',
      },
      {
        id: 'creative',
        name: 'Creative Portfolio',
        description: 'Stand out with a unique, artistic layout',
        thumbnail: '/assets/images/templates/cv-creative-thumb.png',
      },
      {
        id: 'classic',
        name: 'Classic Resume',
        description: 'Traditional format preferred in conservative industries',
        thumbnail: '/assets/images/templates/cv-classic-thumb.png',
      },
      {
        id: 'technical',
        name: 'Technical Expert',
        description: 'Highlights technical skills with special sections',
        thumbnail: '/assets/images/templates/cv-technical-thumb.png',
      }
    ],
    'cover-letter': [
      {
        id: 'standard',
        name: 'Standard Letter',
        description: 'Traditional format for most job applications',
        thumbnail: '/assets/images/templates/cl-standard-thumb.png',
      },
      {
        id: 'modern',
        name: 'Modern Letter',
        description: 'Contemporary design with a clean layout',
        thumbnail: '/assets/images/templates/cl-modern-thumb.png',
      },
      {
        id: 'creative',
        name: 'Creative Letter',
        description: 'Unique format to showcase personality',
        thumbnail: '/assets/images/templates/cl-creative-thumb.png',
      }
    ]
  };

  // Handle template selection
  const handleSelectTemplate = (templateId) => {
    if (selectedType === 'cv') {
      navigate(`/cv-builder?template=${templateId}`);
    } else {
      navigate(`/job-application?template=${templateId}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Templates</h1>
      
      {/* Template Type Selector */}
      <div className="mb-8 border-b">
        <div className="flex gap-6">
          <button
            onClick={() => setSelectedType('cv')}
            className={`py-3 px-6 font-medium text-lg ${
              selectedType === 'cv'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            CV Templates
          </button>
          <button
            onClick={() => setSelectedType('cover-letter')}
            className={`py-3 px-6 font-medium text-lg ${
              selectedType === 'cover-letter'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Cover Letter Templates
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates[selectedType].map((template) => (
          <div 
            key={template.id}
            className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-w-4 aspect-h-3 bg-gray-100 relative">
              <div className="w-full h-48 bg-gray-200 overflow-hidden">
                {/* Placeholder for real template images */}
                <div className="flex items-center justify-center h-full text-gray-500">
                  <span className="text-lg">{template.name}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">{template.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleSelectTemplate(template.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Use Template
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No templates message (shown only if no templates available) */}
      {templates[selectedType].length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No templates available</h3>
          <p className="mt-2 text-gray-500">Check back later for new template options</p>
        </div>
      )}

      {/* Call to action */}
      <div className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h3 className="text-xl font-medium mb-2">Can't find what you're looking for?</h3>
        <p className="text-gray-600 mb-4">
          Start with a blank canvas and create your own custom template
        </p>
        <Link
          to={selectedType === 'cv' ? "/cv-builder" : "/job-application"}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start from scratch
        </Link>
      </div>
    </div>
  );
};

export default Templates;