import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FormFieldBuilder from '../components/FormFieldBuilder';
import HelpCard from '../components/HelpCard';

const HELP_CONTENT = `How to Configure Field Validation:

1. Set the number of positive and negative test cases
2. Select the field type (Text or DB Field)
3. For text fields:
   - Set minimum and maximum length requirements
   - Choose required special characters
4. For DB fields:
   - Select the specific database field type
5. Add multiple fields as needed
6. Enter your email and API path
7. Save the configuration

Your validation rules will be applied to the specified fields according to the configuration.`;

export default function ParticularValidation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 relative">
      {/* Logo in top right */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <img
          src="https://static.naukimg.com/s/7/123/i/naukri-hiring-suite.6d08b072.svg"
          alt="Naukri Hiring Suite"
          className="h-12 md:h-16 w-auto"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center border-b border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-display">
              Form Field Configuration
            </h1>
            <p className="text-gray-600 mt-2">
              Configure your form fields with custom validation rules
            </p>
          </div>
          
          <FormFieldBuilder />
        </div>
      </div>

      <HelpCard content={HELP_CONTENT} />
    </div>
  );
}