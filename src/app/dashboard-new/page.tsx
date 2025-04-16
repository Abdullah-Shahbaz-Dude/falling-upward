'use client';

import { useState, useEffect } from 'react';
import { FiCalendar, FiBook, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle, FiEdit, FiEye, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

// Define types
type Appointment = {
  _id: string;
  date: string;
  time: string;
  consultationType: string;
  status: string;
  notes?: string;
};

type Workbook = {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string | Date;
};

export default function DashboardNewPage() {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Function to check if user is authenticated
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Auth verification failed, redirecting to login');
          window.location.href = '/login';
          return;
        }

        const data = await response.json();
        console.log('Auth verification result:', data);

        if (!data.authenticated) {
          console.error('Not authenticated, redirecting to login');
          window.location.href = '/login';
          return;
        }

        // Store user data
        setUserData(data.user);

        // If user is admin, redirect to admin dashboard
        if (data.user.role === 'admin') {
          console.log('Admin user detected, redirecting to admin dashboard');
          window.location.href = '/admin';
          return;
        }

        // Load dashboard data
        await loadDashboardData();
      } catch (error) {
        console.error('Error checking authentication:', error);
        setError('Authentication error. Please try logging in again.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    };

    // Function to load dashboard data
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // First try to get data from test endpoint
        const testResponse = await fetch('/api/test', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (testResponse.ok) {
          const testData = await testResponse.json();
          console.log('Test API response:', testData);
        }

        // Load appointments
        console.log('Loading appointments...');
        const appointmentsResponse = await fetch('/api/appointments', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!appointmentsResponse.ok) {
          console.error('Failed to load appointments:', appointmentsResponse.statusText);
          throw new Error('Failed to load appointments');
        }

        const appointmentsData = await appointmentsResponse.json();
        console.log('Appointments data:', appointmentsData);
        setAppointments(appointmentsData.appointments || []);

        // Load workbooks
        console.log('Loading workbooks...');
        const workbooksResponse = await fetch('/api/workbooks', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!workbooksResponse.ok) {
          console.error('Failed to load workbooks:', workbooksResponse.statusText);
          throw new Error('Failed to load workbooks');
        }

        const workbooksData = await workbooksResponse.json();
        console.log('Workbooks data:', workbooksData);
        setWorkbooks(workbooksData.workbooks || []);

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setError('Failed to load dashboard data. Please refresh the page.');
        setIsLoading(false);
      }
    };

    // Check authentication when component mounts
    checkAuth();
  }, []);

  // Helper function to format dates
  const formatDate = (dateString: string | Date) => {
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return String(dateString);
    }
  };

  // Helper function to get status badge
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

  // Helper function to get consultation type label
  const getConsultationTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      general: 'General Physiotherapy',
      sports: 'Sports Rehabilitation',
      rehabilitation: 'Post-Surgery Rehabilitation',
      chronic: 'Chronic Pain Management',
    };
    return types[type] || type;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-32 pb-16 flex justify-center font-['Roboto']">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0B4073] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Main dashboard content
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-16 font-['Roboto']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#0B4073] p-8 text-white">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="mt-2 opacity-90">
              Welcome back, {userData?.name || 'User'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-4 mx-6 my-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center">
              <FiAlertCircle className="mr-2" />
              <span>{error}</span>
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'appointments'
                    ? 'border-[#0B4073] text-[#0B4073]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiCalendar className="inline-block mr-2" />
                My Appointments
              </button>
              <button
                onClick={() => setActiveTab('workbooks')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'workbooks'
                    ? 'border-[#0B4073] text-[#0B4073]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiBook className="inline-block mr-2" />
                My Workbooks
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {/* Appointments tab */}
            {activeTab === 'appointments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
                  <Link href="/book" className="px-4 py-2 bg-[#0B4073] text-white rounded-md text-sm font-medium flex items-center">
                    <FiCalendar className="mr-2" /> Book New Appointment
                  </Link>
                </div>

                {appointments.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                    <p className="mt-1 text-sm text-gray-500">You don't have any upcoming appointments.</p>
                    <div className="mt-6">
                      <Link href="/book" className="px-4 py-2 bg-[#0B4073] text-white rounded-md text-sm font-medium inline-flex items-center">
                        <FiCalendar className="mr-2" /> Book New Appointment
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date & Time</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {appointments.map((appointment) => (
                          <tr key={appointment._id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {formatDate(appointment.date)} at {appointment.time}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {getConsultationTypeLabel(appointment.consultationType)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {getStatusBadge(appointment.status)}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <Link href={`/appointments/${appointment._id}`} className="text-[#0B4073] hover:text-[#7094B7] flex items-center justify-end">
                                View Details <FiArrowRight className="ml-1" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Workbooks tab */}
            {activeTab === 'workbooks' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">My Workbooks</h2>

                {workbooks.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <FiBook className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No workbooks</h3>
                    <p className="mt-1 text-sm text-gray-500">You don't have any assigned workbooks yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {workbooks.map((workbook) => (
                      <div key={workbook._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-5">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{workbook.title}</h3>
                            {getStatusBadge(workbook.status)}
                          </div>
                          <p className="text-gray-600 text-sm mb-4">{workbook.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              Assigned: {formatDate(workbook.createdAt)}
                            </span>
                            <Link href={`/workbooks/${workbook._id}`} className="text-[#0B4073] hover:text-[#7094B7] text-sm font-medium flex items-center">
                              Open Workbook <FiArrowRight className="ml-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
