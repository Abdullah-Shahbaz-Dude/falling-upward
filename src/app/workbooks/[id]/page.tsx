'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiCheckCircle, FiAlertCircle, FiSave, FiClock } from 'react-icons/fi';
import { FiUser, FiEdit, FiCheckSquare } from 'react-icons/fi';

type Workbook = {
  _id: string;
  title: string;
  description: string;
  content: string;
  status: 'assigned' | 'in_progress' | 'submitted' | 'reviewed';
  feedback?: string;
  assignedTo?: string;
  assignedToUser?: {
    name: string;
    email: string;
  };
  userResponse?: string;
  adminFeedback?: string;
  createdAt: string;
  updatedAt: string;
};

export default function WorkbookPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [workbook, setWorkbook] = useState<Workbook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchWorkbook = async () => {
      try {
        const { id } = await params;
        const response = await fetch(`/api/workbooks/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch workbook');
        }
        const data = await response.json();
        setWorkbook(data.workbook);
        setProgress(data.workbook.userResponse || '');
      } catch (error) {
        console.error('Error fetching workbook:', error);
        setError('Failed to load workbook');
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchWorkbook();
    }
  }, [session, params]);

  const handleSaveProgress = async () => {
    if (!workbook) return;
    
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      const { id } = await params;
      const response = await fetch(`/api/workbooks/${id}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userResponse: progress }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save progress');
      }
      
      setSaveSuccess(true);
      
      // Update workbook status if it was 'assigned'
      if (workbook.status === 'assigned') {
        setWorkbook({
          ...workbook,
          status: 'in_progress',
        });
      }
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving progress:', error);
      setError('Failed to save progress');
    } finally {
      setIsSaving(false);
    }
  };

  const submitWorkbook = async () => {
    if (!confirm('Are you sure you want to submit this workbook? You won\'t be able to make further changes after submission.')) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { id } = await params;
      const response = await fetch(`/api/workbooks/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit workbook');
      }

      setWorkbook({
        ...workbook!,
        status: 'submitted',
      });
      
      router.refresh();
    } catch (error) {
      console.error('Error submitting workbook:', error);
      setError('Failed to submit workbook');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'assigned':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center"><FiClock className="mr-1" /> Assigned</span>;
      case 'in_progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center"><FiClock className="mr-1" /> In Progress</span>;
      case 'submitted':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center"><FiCheckCircle className="mr-1" /> Submitted</span>;
      case 'reviewed':
        return <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs flex items-center"><FiCheckCircle className="mr-1" /> Reviewed</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="container-custom mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
              <FiAlertCircle className="mr-2" />
              <span>{error}</span>
            </div>
            <div className="mt-4">
              <Link href="/dashboard" className="text-teal-600 hover:underline flex items-center">
                <FiArrowLeft className="mr-2" /> Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!workbook) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="container-custom mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-center text-gray-600">Workbook not found</p>
            <div className="mt-4 text-center">
              <Link href="/dashboard" className="text-teal-600 hover:underline flex items-center justify-center">
                <FiArrowLeft className="mr-2" /> Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-teal-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{workbook.title}</h1>
              {getStatusBadge(workbook.status)}
            </div>
            <p className="mt-2 opacity-90">
              Assigned on {formatDate(workbook.createdAt)}
            </p>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <Link href="/dashboard" className="text-teal-600 hover:underline flex items-center w-fit">
                <FiArrowLeft className="mr-2" /> Back to Dashboard
              </Link>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{workbook.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Workbook Content</h2>
              <div className="p-4 bg-gray-50 rounded-lg prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: workbook.content.replace(/\n/g, '<br>') }} />
              </div>
            </div>

            {workbook.status === 'reviewed' && workbook.feedback && (
              <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-teal-800">Therapist Feedback</h2>
                <p className="text-gray-700">{workbook.feedback}</p>
              </div>
            )}

            {(workbook.status === 'assigned' || workbook.status === 'in_progress') && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
                <textarea
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-4 min-h-[200px]"
                  placeholder="Document your progress, notes, and responses to the exercises here..."
                />
                
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={handleSaveProgress}
                    disabled={isSaving}
                    className="bg-[#7094B7] hover:bg-[#0B4073] text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200 font-roboto"
                  >
                    <FiSave className="mr-2" />
                    {isSaving ? 'Saving...' : 'Save Progress'}
                  </button>
                  
                  <button
                    onClick={submitWorkbook}
                    disabled={isSubmitting || !progress.trim()}
                    className="bg-[#0B4073] hover:bg-[#7094B7] text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200 font-roboto"
                  >
                    <FiCheckCircle className="mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Workbook'}
                  </button>
                  
                  {saveSuccess && (
                    <span className="text-green-600 flex items-center">
                      <FiCheckCircle className="mr-1" /> Progress saved
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
