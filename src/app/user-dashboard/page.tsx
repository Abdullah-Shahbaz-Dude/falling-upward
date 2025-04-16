'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiClock, FiCheckCircle, FiXCircle, FiBook, FiEdit, FiEye, FiCalendar, FiFileText, FiArrowLeft } from 'react-icons/fi';

export default function UserDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [workbooks, setWorkbooks] = useState<any[]>([]);
  const [activeWorkbook, setActiveWorkbook] = useState<any>(null);
  const [workbookResponses, setWorkbookResponses] = useState<{[key: string]: {[key: string]: string}}>({});

  useEffect(() => {
    // Check if user is logged in and is a regular user
    const checkAuth = async () => {
      try {
        // Try to parse the user session cookie
        const cookies = document.cookie.split(';');
        const userCookie = cookies.find(c => c.trim().startsWith('user-session='));
        
        if (!userCookie) {
          window.location.replace('/login');
          return;
        }
        
        // Extract and decode the cookie value
        const cookieValue = userCookie.split('=')[1];
        const userData = JSON.parse(decodeURIComponent(cookieValue));
        
        // Check if user is regular user, not an admin
        if (userData.role === 'admin') {
          window.location.replace('/admin-dashboard');
          return;
        }
        
        // Set user data
        setUser(userData);
        
        // Now fetch dashboard data
        await fetchDashboardData();
      } catch (error) {
        console.error('Authentication error:', error);
        setError('Authentication error. Please try logging in again.');
        window.location.replace('/login');
      }
    };
    
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch appointments
        const appointmentsRes = await fetch('/api/appointments');
        const appointmentsData = await appointmentsRes.json();
        setAppointments(appointmentsData.appointments || []);
        
        // Fetch workbooks
        const workbooksRes = await fetch('/api/workbooks');
        const workbooksData = await workbooksRes.json();
        setWorkbooks(workbooksData.workbooks || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const openWorkbook = (workbook: any) => {
    setActiveWorkbook(workbook);
    
    // Initialize responses if this workbook is being opened for the first time
    if (!workbookResponses[workbook._id]) {
      const initialResponses: {[key: string]: string} = {};
      
      // If the workbook has questions, initialize them with empty responses
      if (workbook.questions && workbook.questions.length > 0) {
        workbook.questions.forEach((question: any) => {
          initialResponses[question._id] = '';
        });
      }
      
      setWorkbookResponses(prev => ({
        ...prev,
        [workbook._id]: initialResponses
      }));
    }
    
    // Update workbook status to in_progress if it's currently just assigned
    if (workbook.status === 'assigned') {
      // In a real app, this would make an API call to update the status
      const updatedWorkbooks = workbooks.map((wb: any) => {
        if (wb._id === workbook._id) {
          return { ...wb, status: 'in_progress' };
        }
        return wb;
      });
      setWorkbooks(updatedWorkbooks);
    }
  };
  
  const closeWorkbook = () => {
    setActiveWorkbook(null);
  };
  
  const handleResponseChange = (questionId: string, value: string) => {
    if (!activeWorkbook) return;
    
    setWorkbookResponses(prev => ({
      ...prev,
      [activeWorkbook._id]: {
        ...(prev[activeWorkbook._id] || {}),
        [questionId]: value
      }
    }));
  };
  
  const submitWorkbook = () => {
    if (!activeWorkbook) return;
    
    // Check if all questions are answered
    const allQuestions = activeWorkbook.questions || [];
    const responses = workbookResponses[activeWorkbook._id] || {};
    const unansweredQuestions = allQuestions.filter((q: any) => !responses[q._id]);
    
    if (unansweredQuestions.length > 0) {
      alert(`Please answer all questions before submitting.`);
      return;
    }
    
    // In a real app, this would make an API call to submit responses
    const updatedWorkbooks = workbooks.map((wb: any) => {
      if (wb._id === activeWorkbook._id) {
        return { 
          ...wb, 
          status: 'submitted',
          submittedDate: new Date().toISOString(),
          responses: responses
        };
      }
      return wb;
    });
    
    setWorkbooks(updatedWorkbooks);
    setActiveWorkbook(null);
    alert('Workbook submitted successfully!');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center"><FiClock className="mr-1" /> Pending</span>;
      case 'confirmed':
        return <span className="px-3 py-1.5 bg-[#D6E2EA] text-[#0B4073] rounded-full text-xs font-medium flex items-center"><FiCheckCircle className="mr-1" /> Confirmed</span>;
      case 'completed':
        return <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center"><FiCheckCircle className="mr-1" /> Completed</span>;
      case 'cancelled':
        return <span className="px-3 py-1.5 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center"><FiXCircle className="mr-1" /> Cancelled</span>;
      default:
        return <span className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };
  
  const getWorkbookStatusBadge = (status: string) => {
    switch (status) {
      case 'assigned':
        return <span className="px-3 py-1.5 bg-[#D6E2EA] text-[#0B4073] rounded-full text-xs font-medium flex items-center"><FiBook className="mr-1" /> Assigned</span>;
      case 'in_progress':
        return <span className="px-3 py-1.5 bg-[#7094B7] text-white rounded-full text-xs font-medium flex items-center"><FiEdit className="mr-1" /> In Progress</span>;
      case 'submitted':
        return <span className="px-3 py-1.5 bg-[#0B4073] text-white rounded-full text-xs font-medium flex items-center"><FiCheckCircle className="mr-1" /> Submitted</span>;
      case 'reviewed':
        return <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center"><FiEye className="mr-1" /> Reviewed</span>;
      default:
        return <span className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }
  
  // When a workbook is active, show the workbook form
  if (activeWorkbook) {
    return (
      <div className="min-h-screen bg-gray-50 font-[Roboto]">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button 
              onClick={closeWorkbook}
              className="flex items-center text-[#0B4073] hover:text-[#7094B7] transition"
            >
              <FiArrowLeft className="mr-2" /> Back to Dashboard
            </button>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">{user?.name}</span>
              <Link href="/login" className="text-[#0B4073] hover:text-[#7094B7]">
                Sign Out
              </Link>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">{activeWorkbook.title}</h1>
                <p className="text-gray-600 mt-2">{activeWorkbook.description}</p>
              </div>
              <div>
                {getWorkbookStatusBadge(activeWorkbook.status)}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <form onSubmit={(e) => { e.preventDefault(); submitWorkbook(); }}>
                {activeWorkbook.questions && activeWorkbook.questions.length > 0 ? (
                  <div className="space-y-6">
                    {activeWorkbook.questions.map((question: any, index: number) => (
                      <div key={question._id} className="p-4 border rounded-lg bg-gray-50">
                        <h3 className="font-medium text-gray-800 mb-2">Question {index + 1}: {question.text}</h3>
                        {question.type === 'text' ? (
                          <textarea
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0B4073] focus:border-[#0B4073] outline-none transition"
                            rows={4}
                            placeholder="Your answer..."
                            value={workbookResponses[activeWorkbook._id]?.[question._id] || ''}
                            onChange={(e) => handleResponseChange(question._id, e.target.value)}
                          />
                        ) : question.type === 'multipleChoice' ? (
                          <div className="space-y-2">
                            {question.options?.map((option: string) => (
                              <label key={option} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                                <input
                                  type="radio"
                                  name={question._id}
                                  value={option}
                                  checked={workbookResponses[activeWorkbook._id]?.[question._id] === option}
                                  onChange={() => handleResponseChange(question._id, option)}
                                  className="text-[#0B4073] focus:ring-[#0B4073]"
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0B4073] focus:border-[#0B4073] outline-none transition"
                            placeholder="Your answer..."
                            value={workbookResponses[activeWorkbook._id]?.[question._id] || ''}
                            onChange={(e) => handleResponseChange(question._id, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                    
                    <div className="flex justify-end space-x-4 mt-6">
                      <button
                        type="button"
                        onClick={closeWorkbook}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                      >
                        Save as Draft
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#0B4073] text-white rounded-lg hover:bg-[#0B4073]/90 transition"
                      >
                        Submit Workbook
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No questions found in this workbook.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </main>
        
        <style jsx>{`
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #0B4073;
            margin: 0 auto;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/login" 
            className="inline-block px-4 py-2 bg-[#0B4073] text-white rounded hover:bg-[#0B4073]/90 transition"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-[Roboto]">
      <header className="bg-[#0B4073] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Patient Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user?.name || 'User'}</span>
              <button 
                onClick={() => {
                  document.cookie = 'user-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                  window.location.replace('/login');
                }}
                className="px-3 py-1.5 bg-[#7094B7] text-white rounded text-sm hover:bg-[#7094B7]/90"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="rounded-full bg-[#D6E2EA] p-3 mr-4">
              <FiCalendar className="text-[#0B4073] text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming Appointments</p>
              <h3 className="text-2xl font-semibold text-gray-800">
                {appointments.filter((apt: any) => {
                  const today = new Date().toISOString().split('T')[0];
                  return apt.date >= today && apt.status !== 'cancelled';
                }).length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="rounded-full bg-[#D6E2EA] p-3 mr-4">
              <FiFileText className="text-[#0B4073] text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Assigned Workbooks</p>
              <h3 className="text-2xl font-semibold text-gray-800">
                {workbooks.filter((wb: any) => 
                  wb.status === 'assigned' || wb.status === 'in_progress'
                ).length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="rounded-full bg-[#D6E2EA] p-3 mr-4">
              <FiCheckCircle className="text-[#0B4073] text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Workbooks</p>
              <h3 className="text-2xl font-semibold text-gray-800">
                {workbooks.filter((wb: any) => 
                  wb.status === 'submitted' || wb.status === 'reviewed'
                ).length}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Appointments Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiCalendar className="mr-2 text-[#0B4073]" /> 
                My Appointments
              </h2>
              <Link 
                href="/appointments" 
                className="text-sm text-[#0B4073] hover:underline"
              >
                View All
              </Link>
            </div>
            
            {appointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No appointments found.
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.slice(0, 5).map((appointment: any) => (
                  <div key={appointment._id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{appointment.type} Session</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(appointment.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.time}
                        </p>
                      </div>
                      <div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          
          {/* Workbooks Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiFileText className="mr-2 text-[#0B4073]" /> 
                My Workbooks
              </h2>
              <Link 
                href="/workbooks" 
                className="text-sm text-[#0B4073] hover:underline"
              >
                View All
              </Link>
            </div>
            
            {workbooks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No workbooks assigned.
              </div>
            ) : (
              <div className="space-y-4">
                {workbooks.slice(0, 5).map((workbook: any) => (
                  <div key={workbook._id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer" onClick={() => openWorkbook(workbook)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{workbook.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{workbook.description?.substring(0, 60) || 'No description'}...</p>
                        {workbook.dueDate && (
                          <p className="text-sm text-gray-600 mt-1">
                            Due: {new Date(workbook.dueDate).toLocaleDateString()}
                          </p>
                        )}
                        {workbook.assignedDate && !workbook.dueDate && (
                          <p className="text-sm text-gray-600 mt-1">
                            Assigned: {new Date(workbook.assignedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        {getWorkbookStatusBadge(workbook.status)}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openWorkbook(workbook);
                          }}
                          className="text-xs text-[#0B4073] hover:underline mt-2 flex items-center"
                        >
                          {workbook.status === 'assigned' && (
                            <>
                              <FiEdit className="mr-1" /> Start Workbook
                            </>
                          )}
                          {workbook.status === 'in_progress' && (
                            <>
                              <FiEdit className="mr-1" /> Continue Editing
                            </>
                          )}
                          {workbook.status === 'submitted' && (
                            <>
                              <FiEye className="mr-1" /> View Submission
                            </>
                          )}
                          {workbook.status === 'reviewed' && (
                            <>
                              <FiEye className="mr-1" /> View Feedback
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #0B4073;
          margin: 0 auto;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
