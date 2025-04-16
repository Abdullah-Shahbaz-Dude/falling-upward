'use client';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiMail, FiPhone, FiMessageSquare, FiUser, FiMapPin, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // In a real application, you would send this data to your API
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      reset();
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-[Roboto]">
      {/* Hero Section */}
      <HeroSection
        title="Contact Us"
        subtitle="We're here to help. Reach out to us with any questions or to schedule a consultation."
        backgroundImage="/images/backgrounds/contact-hero.jpg"
        height="medium"
        textPosition="left"
      />
      <div className="min-h-screen pt-16 pb-16">
        <div className="container-custom mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0">
              We're here to help. Reach out to us with any questions or to schedule an appointment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16 px-4 md:px-0">
            <div className="bg-white rounded-lg shadow-md p-5 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Send us a message</h2>
              
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-md flex items-start">
                  <FiCheckCircle className="mr-2 mt-1" />
                  <div>
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="mt-1">We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
                  <FiAlertCircle className="mr-2" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
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
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
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
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="input-field pl-10"
                      placeholder="+1 (555) 123-4567"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <FiMessageSquare className="text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={5}
                      className={`input-field pl-10 ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="How can we help you?"
                      disabled={isLoading}
                    ></textarea>
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 md:py-3 md:px-6 bg-[#0B4073] hover:bg-[#0B4073]/90 text-white text-sm md:text-base font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B4073] disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Contact Information</h2>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#D6E2EA] p-2 md:p-3 rounded-full mr-3 md:mr-4">
                    <FiMapPin className="text-[#0B4073]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">Location</h3>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                      123 Healing Street<br />
                      Suite 101<br />
                      Wellness City, WC 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#D6E2EA] p-2 md:p-3 rounded-full mr-3 md:mr-4">
                    <FiPhone className="text-[#0B4073]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">Phone</h3>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                      (555) 123-4567
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">
                      Monday to Friday, 9am to 6pm
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#D6E2EA] p-2 md:p-3 rounded-full mr-3 md:mr-4">
                    <FiMail className="text-[#0B4073]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">Email</h3>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                      info@fallingupward.com
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">
                      We'll respond as soon as possible
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#D6E2EA] p-2 md:p-3 rounded-full mr-3 md:mr-4">
                    <FiClock className="text-[#0B4073]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">Hours</h3>
                    <div className="text-gray-600 mt-1 grid grid-cols-2 gap-x-4">
                      <p>Monday - Friday:</p>
                      <p>9:00 AM - 6:00 PM</p>
                      <p>Saturday:</p>
                      <p>10:00 AM - 4:00 PM</p>
                      <p>Sunday:</p>
                      <p>Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Find us on the map</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  {/* In a real application, you would embed a Google Map here */}
                  <p className="text-gray-500">Map placeholder</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 md:p-8 text-center mx-4 md:mx-0">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Ready to book an appointment?</h2>
            <p className="text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
              If you're ready to schedule your physiotherapy session, you can book directly through our online system.
            </p>
            <a href="/book" className="inline-block py-2 px-4 md:py-3 md:px-6 bg-[#0B4073] hover:bg-[#0B4073]/90 text-white text-sm md:text-base font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B4073]">
              Book an Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-xl font-[Roboto]" style={{ color: '#7094B7' }}>Loading contact information...</div>
    </div>}>
      <ContactContent />
    </Suspense>
  );
}
