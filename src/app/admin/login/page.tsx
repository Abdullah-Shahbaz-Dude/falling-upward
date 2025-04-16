'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginFormValues) => {
    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting admin login with email:', data.email);
      
      // Admin-specific login endpoint
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password // Use the entered password, the system will accept 'password123' in development
        }),
      });

      const result = await response.json();
      console.log('Admin login API result:', result);

      if (!response.ok || !result.success) {
        console.error('Admin login failed:', result.message);
        setError('Invalid admin credentials');
        setIsLoading(false);
        return;
      }
      
      console.log('Admin login successful, user:', result.user);
      
      // Redirect to admin dashboard - using a more direct approach
      console.log('Admin login successful, redirecting to admin dashboard');
      
      // Set a small timeout to ensure the cookie is properly set before redirecting
      setTimeout(() => {
        document.location.href = '/admin';
      }, 100);
      
      // Keep the loading state active during redirection
      // This prevents further user interaction during the redirect
    } catch (error) {
      console.error('Admin login error:', error);
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16 flex flex-col items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#0B4073] font-roboto">Admin Login</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
            <FiAlertCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                placeholder="admin@example.com"
                className={`pl-10 w-full p-3 border rounded-md focus:ring-2 focus:ring-[#7094B7] focus:border-transparent ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                {...register('email')}
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
                placeholder="••••••••"
                className={`pl-10 w-full p-3 border rounded-md focus:ring-2 focus:ring-[#7094B7] focus:border-transparent ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                {...register('password')}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0B4073] text-white py-3 rounded-md font-medium hover:bg-[#083258] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7094B7] focus:ring-offset-2 disabled:opacity-70 font-roboto"
          >
            {isLoading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-roboto">
            Not an admin? <Link href="/login" className="text-[#0B4073] hover:underline">Go to user login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
