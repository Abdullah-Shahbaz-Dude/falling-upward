'use client';

import { useState, useEffect } from 'react';
// Using cookie-based authentication instead of NextAuth
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiUsers, FiBook, FiAlertCircle, FiSave } from 'react-icons/fi';

const workbookSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  userId: z.string().min(1, 'Please select a user'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

type WorkbookFormValues = z.infer<typeof workbookSchema>;

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function CreateWorkbookPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkbookFormValues>({
    resolver: zodResolver(workbookSchema),
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const cookies = document.cookie.split(';');
        const userCookie = cookies.find(c => c.trim().startsWith('user-session='));
        
        if (!userCookie) {
          router.push('/login');
          return;
        }
        
        const cookieValue = userCookie.split('=')[1];
        let userData;
        
        try {
          userData = JSON.parse(decodeURIComponent(cookieValue));
        } catch (e) {
          userData = JSON.parse(cookieValue);
        }
        
        if (userData.role !== 'admin') {
          router.push('/dashboard');
          return;
        }
        
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      } finally {
        setIsLoadingUsers(false);
      }
    };

    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const onSubmit = async (data: WorkbookFormValues) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/workbooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to create workbook');
      }

      router.push('/admin/dashboard');
    } catch (error: any) {
      setError(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingUsers) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0B4073] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#0B4073] p-6 text-white">
            <h1 className="text-3xl font-bold">Create Workbook</h1>
            <p className="mt-2 opacity-90">
              Create a new workbook to assign to a patient
            </p>
          </div>

          {error && (
            <div className="p-4 m-6 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
              <FiAlertCircle className="mr-2" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                  Workbook Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register('title')}
                  className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                  placeholder="e.g., Lower Back Pain Exercises"
                  disabled={isLoading}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  rows={3}
                  className={`input-field ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Brief description of the workbook"
                  disabled={isLoading}
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-700">
                  Assign to Patient
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUsers className="text-gray-400" />
                  </div>
                  <select
                    id="userId"
                    {...register('userId')}
                    className={`input-field pl-10 ${errors.userId ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  >
                    <option value="">Select a patient</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.userId && (
                  <p className="mt-1 text-sm text-red-600">{errors.userId.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700">
                  Workbook Content
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <FiBook className="text-gray-400" />
                  </div>
                  <textarea
                    id="content"
                    {...register('content')}
                    rows={10}
                    className={`input-field pl-10 ${errors.content ? 'border-red-500' : ''}`}
                    placeholder="Enter the exercises, instructions, and any other content for the workbook"
                    disabled={isLoading}
                  ></textarea>
                </div>
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn-primary bg-[#0B4073] hover:bg-[#7094B7] flex items-center justify-center font-roboto"
                  disabled={isLoading}
                >
                  <FiSave className="mr-2" />
                  {isLoading ? 'Creating...' : 'Create Workbook'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
