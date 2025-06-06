'use client';

import { useState } from 'react';
import TechnologyInputForm from './components/forms/technology-form';

export interface FormData {
  name: string;
  abstract: string;
  number_of_axis: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted with data:', data);
    setFormData(data);
    setShowReport(true);
  };

  const handleBackToForm = () => {
    setShowReport(false);
    setFormData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Medical Technology Commercial Evaluator
          </h1>
          <p className="text-lg text-gray-600">
            Fill out the form below to generate your comprehensive commercial viability report
          </p>
        </div>
        <TechnologyInputForm />
      </div>
    </div>
  );
};

export default Index;
