'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiMessageSquare, FiCheck } from 'react-icons/fi';
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
  consultationType: z.enum(['neurodiversity', 'digital-evolution', 'executive-mentoring', 'psychological-therapy'], {
    required_error: 'Please select a consultation type',
  }),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookPageContentProps {
  type?: string;
}

function BookPageContent({ type }: BookPageContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  
  // Use the type prop if provided, otherwise fall back to searchParams, then default to 'digital'
  const consultationType = type || searchParams.get('type') || 'digital';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      consultationType: consultationType as any,
    },
  });

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const consultationTypes = [
    { value: 'neurodiversity', label: 'Neurodiversity as a strategic advantage' },
    { value: 'digital-evolution', label: 'Digital Evolution & AI Adoption' },
    { value: 'executive-mentoring', label: 'Executive Mentoring & Boardroom Support' },
    { value: 'psychological-therapy', label: 'Psychological Therapy' }
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
      setSuccess('Your consultation has been booked successfully!');
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
        background-color: #7094B7;
        color: white;
        font-weight: 600;
        border-radius: 0.375rem;
        transition: background-color 0.15s ease-in-out;
      }
      .btn-primary:hover {
        background-color: #5A7A9D;
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
    <div className="min-h-screen  pb-24">
          {/* Hero Section */}
          <HeroSection
      title="Book a Consultation"
      subtitle="Schedule your consultation session"
      backgroundImage="/images/backgrounds/Digital-Evolution -Ai-Adoption.JPG"
      height="medium"
      textPosition="left"
     
    />
      <div className="container-custom mx-auto mt-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#0B4073] p-6 text-white">
            <h1 className="text-3xl font-bold">Book a Consultation</h1>
            <p className="mt-2 opacity-90">Schedule your consultation session</p>
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
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className={`w-full p-3 border border-gray-300 rounded-md ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your name"
                      disabled={isLoading}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`w-full p-3 pl-10 border border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                        disabled={isLoading}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail size={18} className="text-gray-400" />
                      </div>
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="date" className="block mb-2 text-gray-700">
                      Preferred Date
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      placeholderText="Select a date"
                      className={`w-full p-3 border border-gray-300 rounded-md ${errors.date ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="consultationType" className="block mb-2 text-gray-700">
                      Consultation Type
                    </label>
                    <div className="relative">
                      <select
                        id="consultationType"
                        {...register('consultationType')}
                        className={`w-full p-3 border border-gray-300 rounded-md appearance-none pl-10 ${errors.consultationType ? 'border-red-500' : ''}`}
                        disabled={isLoading}
                      >
                        {consultationTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMessageSquare size={18} className="text-gray-400" />
                      </div>
                    </div>
                    {errors.consultationType && (
                      <p className="mt-1 text-sm text-red-600">{errors.consultationType.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-gray-700">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Please provide any additional information about your needs or specific requirements"
                      disabled={isLoading}
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-[#0B4073] text-white py-3 px-6 rounded-md hover:bg-[#083258] transition-colors font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
      <div className="animate-pulse text-xl text-gray-600">Loading booking page...</div>
    </div>}>
      <BookPageContent />
    </Suspense>
  );
}
