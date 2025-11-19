'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  quoteFormSchema,
  type QuoteFormData,
  type QuoteApiResponse,
} from '@/lib/validations/quote';

// Step configuration
const STEPS = [
  { id: 1, name: 'Location', description: 'Where do you need the dumpster?' },
  { id: 2, name: 'Project Details', description: 'Tell us about your project' },
  { id: 3, name: 'Contact Info', description: 'How can we reach you?' },
];

// Dumpster size options
const DUMPSTER_SIZES = [
  { value: '10', label: '10 Yard Dumpster', description: 'Small projects, 3-4 pickup loads' },
  { value: '20', label: '20 Yard Dumpster', description: 'Medium projects, 6-8 pickup loads' },
  { value: '30', label: '30 Yard Dumpster', description: 'Large projects, 9-12 pickup loads' },
  { value: '40', label: '40 Yard Dumpster', description: 'Extra large projects, 12-16 pickup loads' },
];

// Project type options
const PROJECT_TYPES = [
  'Home Renovation',
  'Construction',
  'Demolition',
  'Roofing',
  'Landscaping',
  'Spring Cleaning',
  'Estate Cleanout',
  'Other',
];

// Service type options
const SERVICE_TYPES = [
  'Residential',
  'Commercial',
  'Industrial',
  'Roll-off',
];

// Rental duration options
const RENTAL_DURATIONS = [
  { value: '3', label: '3 Days' },
  { value: '7', label: '7 Days' },
  { value: '14', label: '14 Days' },
  { value: '30', label: '30 Days' },
  { value: 'custom', label: 'Custom Duration' },
];

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    mode: 'onBlur',
  });

  // Validate current step before proceeding
  const validateStep = async (step: number): Promise<boolean> => {
    let fields: (keyof QuoteFormData)[] = [];

    switch (step) {
      case 1:
        fields = ['zipCode'];
        break;
      case 2:
        fields = ['dumpsterSize', 'projectType', 'serviceType', 'rentalDuration'];
        break;
      case 3:
        fields = ['name', 'email', 'phone', 'deliveryDate', 'address'];
        break;
    }

    const isValid = await trigger(fields);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: QuoteApiResponse = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Quote submitted successfully! We will contact you soon.',
        });
        // Reset form or redirect after success
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit quote. Please try again.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred while submitting your quote. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </p>
                  <p className="text-xs text-gray-400 hidden sm:block">{step.description}</p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 transition-colors ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form className="space-y-6">
        {/* Step 1: Location */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Service Location</h2>
            <p className="text-gray-600">Enter your zip code to check availability</p>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                {...register('zipCode')}
                type="text"
                id="zipCode"
                placeholder="12345"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="cityId" className="block text-sm font-medium text-gray-700 mb-1">
                City (Optional)
              </label>
              <input
                {...register('cityId')}
                type="text"
                id="cityId"
                placeholder="Select or enter your city"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
            <p className="text-gray-600">Help us understand your needs</p>

            {/* Dumpster Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dumpster Size <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DUMPSTER_SIZES.map((size) => (
                  <label
                    key={size.value}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      errors.dumpsterSize ? 'border-red-500' : 'border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    <input
                      {...register('dumpsterSize')}
                      type="radio"
                      value={size.value}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{size.label}</p>
                      <p className="text-sm text-gray-500">{size.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              {errors.dumpsterSize && (
                <p className="mt-1 text-sm text-red-600">{errors.dumpsterSize.message}</p>
              )}
            </div>

            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                Project Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register('projectType')}
                id="projectType"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.projectType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a project type</option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
              )}
            </div>

            {/* Service Type */}
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register('serviceType')}
                id="serviceType"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.serviceType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a service type</option>
                {SERVICE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.serviceType && (
                <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
              )}
            </div>

            {/* Rental Duration */}
            <div>
              <label htmlFor="rentalDuration" className="block text-sm font-medium text-gray-700 mb-1">
                Rental Duration <span className="text-red-500">*</span>
              </label>
              <select
                {...register('rentalDuration')}
                id="rentalDuration"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.rentalDuration ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select rental duration</option>
                {RENTAL_DURATIONS.map((duration) => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
              {errors.rentalDuration && (
                <p className="mt-1 text-sm text-red-600">{errors.rentalDuration.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            <p className="text-gray-600">How can we reach you with your quote?</p>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                placeholder="John Doe"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  placeholder="(555) 123-4567"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register('address')}
                type="text"
                id="address"
                placeholder="123 Main St, Apt 4B"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
            </div>

            <div>
              <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Delivery Date <span className="text-red-500">*</span>
              </label>
              <input
                {...register('deliveryDate')}
                type="date"
                id="deliveryDate"
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.deliveryDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.deliveryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.deliveryDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={4}
                placeholder="Any special requirements or additional information..."
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
            </div>
          </div>
        )}

        {/* Status Messages */}
        {submitStatus.type && (
          <div
            className={`p-4 rounded-lg ${
              submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            <p className="font-medium">{submitStatus.message}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFormSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isSubmitting ? 'Submitting...' : 'Get Quote'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
