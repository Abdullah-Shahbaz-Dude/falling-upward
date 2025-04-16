'use client';

import { useState, Suspense } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiUser, FiLock, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';

type LoginFormValues = {
  email: string;
  password: string;
};

function LoginContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError('');

    try {
      // Send login request to our new simple API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });

      const result = await response.json();
      console.log('Login result:', result);

      if (!response.ok || !result.success) {
        setError(result.message || 'Invalid email or password');
        setIsLoading(false);
        return;
      }
      
      // Get the redirect URL from the API response
      const redirectUrl = result.redirectUrl || '/user-dashboard';
      console.log(`Login successful, redirecting to: ${redirectUrl}`);
      
      // Log cookie information for debugging
      console.log('Cookies after login:', document.cookie);
      
      // Force a short delay to ensure cookies are set
      setTimeout(() => {
        console.log('Executing redirect now to:', redirectUrl);
        // Use hard redirect for more reliable navigation
        window.location.href = redirectUrl;
      }, 500);
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-[Roboto]">
      {/* Hero Section */}

      <HeroSection
        title="Welcome Back"
        subtitle="Sign in to access your Falling Upwards account"
        backgroundImage="/images/backgrounds/consultation-bg.jpg"
        height="medium"
        textPosition="left"
      />
 
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <div className="flex justify-center">
          <img 
            src="/favicon.ico" 
            alt="Falling Upward Physical Therapy" 
            className="h-16 w-auto" 
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-20" >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
              <FiAlertCircle className="mr-2" />
              <span>{error}</span>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <Controller
                  name="email"
                  control={control}
                  rules={{ 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      className="block w-full pl-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0B4073] focus:border-[#0B4073] sm:text-sm"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  )}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="block w-full pl-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0B4073] focus:border-[#0B4073] sm:text-sm"
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                  )}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0B4073] hover:bg-[#0B4073]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B4073] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>


          
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="font-medium text-[#0B4073] hover:text-[#0B4073]/80"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-xl text-gray-600">Loading login page...</div>
    </div>}>
      <LoginContent />
    </Suspense>
  );
}
