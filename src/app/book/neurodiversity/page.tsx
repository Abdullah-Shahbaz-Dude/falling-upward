'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiMessageSquare, FiCheck, FiArrowLeft, FiBriefcase, FiUsers } from 'react-icons/fi';
import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  date: z.date({
    required_error: 'Please select a date',
    invalid_type_error: 'Please select a valid date',
  }).refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, {
    message: 'Appointment date must be today or in the future',
  }),
  time: z.string().min(1, 'Please select a time'),
  message: z.string().optional(),
  service_type: z.enum(['individual_coaching', 'org_consulting', 'workshop', 'not_sure']).optional(),
  companyName: z.string().optional(),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).optional(),
  position: z.string().optional(),
  has_neurodiversity: z.boolean().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

function BookPageContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOrganization, setIsOrganization] = useState(false);
  const { data: session } = useSession();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  // Watch the service type field
  const serviceType = watch('service_type');
  
  // Update state when service type changes
  useEffect(() => {
    setIsOrganization(serviceType === 'org_consulting' || serviceType === 'workshop');
  }, [serviceType]);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const serviceTypes = [
    { value: 'individual_coaching', label: 'Individual ADHD Coaching' },
    { value: 'org_consulting', label: 'Organizational Neurodiversity Consulting' },
    { value: 'workshop', label: 'Neurodiversity Workshop/Training' },
    { value: 'not_sure', label: 'Not Sure Yet' },
  ];

  // Set the date in the form when the date picker changes
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setValue('date', date, { shouldValidate: true });
    }
  };

  // Handle form submission
  const onSubmit = async (data: BookingFormValues) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Here you would typically send the data to your API
      console.log('Form data submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccess('Your Neurodiversity consultation has been booked successfully!');
      reset();
      setSelectedDate(null);
    } catch (err) {
      setError('There was an error booking your consultation. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add global styles for form inputs
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .input-field {
        width: 100%;
        padding: 0.75rem;
        padding-left: 2.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.375rem;
        background-color: white;
        font-size: 0.875rem;
        transition: border-color 0.15s ease-in-out;
      }
      .input-field:focus {
        outline: none;
        border-color: #7094B7;
        box-shadow: 0 0 0 3px rgba(112, 148, 183, 0.1);
      }
      .btn-primary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        background-color: #0B4073;
        color: white;
        font-weight: 600;
        border-radius: 0.375rem;
        transition: background-color 0.15s ease-in-out;
      }
      .btn-primary:hover {
        background-color: #072E53;
      }
      .btn-primary:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen  pb-16">
         
      <HeroSection
        title="Neurodiversity as a strategic advantage"
        subtitle="Unlock your potential with psychology-informed ADHD coaching"
        backgroundImage="/images/services/IMG_7552.jpg"
        textPosition="left"
      />

      <div className="container-custom mx-auto">
        <div className="mb-16 mt-16">
          <Link href="/our-services/neurodiversity" className="text-[#0B4073] hover:text-[#072e53] inline-flex items-center transition-colors duration-200">
            <FiArrowLeft className="mr-2" />
            Back to Neurodiversity as a strategic advantage
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#0B4073] p-6 text-white">
            <h1 className="text-3xl font-bold">Book a Neurodiversity Consultation</h1>
            <p className="mt-2 opacity-90">Schedule your free consultation session</p>
          </div>

          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-md flex items-start">
                <FiCheck className="mr-2 mt-1" />
                <div>
                  <p className="font-medium">{success}</p>
                  <p className="mt-1">We will contact you shortly to confirm your appointment.</p>
                  <Link href="/" className="inline-block mt-4 text-[#0B4073] hover:text-[#083056] font-medium">
                    Return to Home
                  </Link>
                </div>
              </div>
            )}

            {!success && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="service_type" className="block mb-2 text-sm font-medium text-gray-700">
                    What are you interested in?*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUsers size={18} className="text-gray-400" />
                    </div>
                    <select
                      id="service_type"
                      {...register('service_type')}
                      className="input-field pl-10"
                      disabled={isLoading}
                    >
                      <option value="">Select an option</option>
                      {serviceTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                      Full Name*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className={`input-field pl-10 ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="John Doe"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                      Email Address*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                      Phone Number*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className={`input-field pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+1 (555) 123-4567"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-700">
                      Position/Role
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiBriefcase size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="position"
                        type="text"
                        {...register('position')}
                        className="input-field pl-10"
                        placeholder="Your position or role"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {isOrganization && (
                    <>
                      <div>
                        <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-700">
                          Company/Organization Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiBriefcase size={18} className="text-gray-400" />
                          </div>
                          <input
                            id="companyName"
                            type="text"
                            {...register('companyName')}
                            className="input-field pl-10"
                            placeholder="Your organization name"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="companySize" className="block mb-2 text-sm font-medium text-gray-700">
                          Organization Size
                        </label>
                        <select
                          id="companySize"
                          {...register('companySize')}
                          className="input-field pl-3"
                          disabled={isLoading}
                        >
                          <option value="">Select organization size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">
                      Preferred Date*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar size={18} className="text-gray-400" />
                      </div>
                      <DatePicker
                        id="date"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        className={`input-field pl-10 ${errors.date ? 'border-red-500' : ''}`}
                        placeholderText="Select a date"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date.message as string}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-700">
                      Preferred Time*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiClock size={18} className="text-gray-400" />
                      </div>
                      <select
                        id="time"
                        {...register('time')}
                        className={`input-field pl-10 ${errors.time ? 'border-red-500' : ''}`}
                        disabled={isLoading}
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    {errors.time && (
                      <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center py-2">
                  <input
                    id="has_neurodiversity"
                    type="checkbox"
                    {...register('has_neurodiversity')}
                    className="h-4 w-4 text-[#0B4073] focus:ring-[#0B4073] border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="has_neurodiversity" className="ml-2 block text-sm text-gray-700">
                    I have a neurodivergent condition (ADHD, Autism, Dyslexia, etc.) or suspect I might
                  </label>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                    What would you like to achieve from this consultation?
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <FiMessageSquare size={18} className="text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={4}
                      className="input-field pl-10"
                      placeholder={isOrganization 
                        ? "Tell us about your organization's needs or challenges related to neurodiversity..." 
                        : "Tell us about your personal goals or challenges..."}
                      disabled={isLoading}
                    ></textarea>
                  </div>
                </div>

                <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
                  <p>Your information is protected under our <Link href="/privacy-policy" className="text-[#0B4073] hover:underline">Privacy Policy</Link> and <Link href="/terms-of-service" className="text-[#0B4073] hover:underline">Terms of Service</Link>.</p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary"
                  >
                    {isLoading ? 'Booking...' : 'Book Consultation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NeurodiversityBookPage() {
  return (
    <div className="font-roboto bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <BookPageContent />
      </Suspense>
    </div>
  );
} 