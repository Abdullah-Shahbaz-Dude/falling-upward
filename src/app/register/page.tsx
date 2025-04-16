'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-[Roboto]">
      {/* Hero Section */}
      {/* Hero Section */}
     
           <HeroSection
             title="Register"
             subtitle="Create your account and start your journey with us"
             backgroundImage="/images/backgrounds/consultation-bg.jpg"
             height="medium"
             textPosition="left"
           />
      
      <div className="flex flex-col items-center py-10">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#0B4073] font-roboto">Register</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
            <FiAlertCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 font-roboto">
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
                className={`pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full font-roboto focus:outline-none focus:ring-2 focus:ring-[#0B4073] focus:border-[#0B4073] ${errors.name ? 'border-red-500' : ''}`}
                placeholder="John Doe"
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 font-roboto">
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
                className={`pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full font-roboto focus:outline-none focus:ring-2 focus:ring-[#0B4073] focus:border-[#0B4073] ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 font-roboto">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full font-roboto focus:outline-none focus:ring-2 focus:ring-[#0B4073] focus:border-[#0B4073] ${errors.password ? 'border-red-500' : ''}`}
                placeholder="••••••"
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700 font-roboto">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={`pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full font-roboto focus:outline-none focus:ring-2 focus:ring-[#0B4073] focus:border-[#0B4073] ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="••••••"
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0B4073] hover:bg-[#7094B7] text-white font-roboto py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0B4073] focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 font-roboto">
            Already have an account?{' '}
            <Link href="/login" className="text-[#0B4073] hover:text-[#7094B7] hover:underline font-roboto">
              Login here
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
