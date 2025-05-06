'use client';

import { useState, Suspense } from 'react';
import { FiUser, FiLock, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Placeholder function - will be replaced with actual Node.js backend logic later
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Just form validation without actual submission
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    // Show loading state but don't actually submit
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      console.log('Form would submit these values to Node.js backend:', { email, password });
      setIsLoading(false);
      // For now just log the values that would be sent to backend
      alert('Login functionality will be implemented with Node.js backend later');
    }, 1000);
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
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="block w-full pl-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0B4073] focus:border-[#0B4073] sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="block w-full pl-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0B4073] focus:border-[#0B4073] sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
                href="#" 
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
