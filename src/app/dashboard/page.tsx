'use client';

import { useState, useEffect } from 'react';
// Using cookie-based authentication instead of NextAuth
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FiCalendar, 
  FiBook, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle,
  FiEdit,
  FiEye,
  FiArrowRight
} from 'react-icons/fi';

type Appointment = {
  _id: string;
  name: string;
  date: string;
  time: string;
  consultationType: 'general' | 'sports' | 'rehabilitation' | 'chronic';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
};

type Workbook = {
  _id: string;
  title: string;
  description: string;
  status: 'assigned' | 'in_progress' | 'submitted' | 'reviewed';
  createdAt: string;
};

// Dashboard page that handles both redirect and display
export default function Dashboard() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(true);
  
  useEffect(() => {
    // Check for user session cookie
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(c => c.trim().startsWith('user-session='));
    
    if (!userCookie) {
      // No user session cookie found, redirect to login
      console.log('No session found, redirecting to login');
      router.push('/login');
      return;
    }
    
    try {
      // Parse the user data from the cookie
      const cookieValue = userCookie.split('=')[1];
      const userData = JSON.parse(decodeURIComponent(cookieValue));
      
      // Redirect based on user role
      if (userData.role === 'admin') {
        console.log('Admin user detected, redirecting to admin dashboard');
        router.push('/admin-dashboard');
      } else {
        console.log('Regular user detected, redirecting to user dashboard');
        router.push('/user-dashboard');
        setIsRedirecting(false); // Allow rendering of dashboard if not redirecting
      }
    } catch (error) {
      console.error('Error parsing user session:', error);
      router.push('/login');
    }
  }, [router]);
  
  if (isRedirecting) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0B4073] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to the appropriate dashboard...</p>
        </div>
      </div>
    );
  }
  
  // If we reach here, we'll render the DashboardContent component
  return <DashboardContent />;
}

function DashboardContent() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUserAccess = async () => {
      console.log('Dashboard - Verifying access...');
      
      try {
        // Check for user session cookie
        const cookies = document.cookie.split(';');
        const userCookie = cookies.find(c => c.trim().startsWith('user-session='));
        
        if (!userCookie) {
          console.log('Dashboard - No user cookie found, redirecting to login');
          window.location.replace('/login');
          return;
        }
        
        // Parse the user data from the cookie
        const cookieValue = userCookie.split('=')[1];
        let userData;
        
        try {
          userData = JSON.parse(decodeURIComponent(cookieValue));
        } catch (e) {
          userData = JSON.parse(cookieValue);
        }
        
        console.log('Dashboard - User data:', userData);
        
        if (!userData) {
          console.log('Dashboard - Invalid user data, redirecting to login');
          window.location.replace('/login');
          return;
        }
        
        // If user is an admin, we'll still show the dashboard but with admin content
        if (userData.role === 'admin') {
          console.log('Dashboard - Admin user detected, showing admin dashboard content');
        }
        
        // Set user and authenticated state
        setUser(userData);
        setIsAuthenticated(true);
        
        // Immediately fetch dashboard data
        fetchDashboardData();
      } catch (error) {
        console.error('Dashboard - Error verifying access:', error);
        setError('Authentication error. Please try logging in again.');
        setTimeout(() => {
          window.location.replace('/login');
        }, 2000);
      }
    };
    
    // Function to fetch both appointments and workbooks
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching dashboard data...');
        
        // Fetch appointments with credentials
        console.log('Fetching appointments...');
        const appointmentsResponse = await fetch('/api/appointments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' // Important for including cookies
        });
        
        console.log('Appointments response status:', appointmentsResponse.status);
        
        if (!appointmentsResponse.ok) {
          console.error('Failed to fetch appointments:', appointmentsResponse.statusText);
          throw new Error(`Failed to fetch appointments: ${appointmentsResponse.statusText}`);
        }
        
        const appointmentsData = await appointmentsResponse.json();
        console.log('Appointments data:', appointmentsData);
        setAppointments(appointmentsData.appointments || []);
        
        // Fetch workbooks with credentials
        console.log('Fetching workbooks...');
        const workbooksResponse = await fetch('/api/workbooks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' // Important for including cookies
        });
        
        console.log('Workbooks response status:', workbooksResponse.status);
        
        if (!workbooksResponse.ok) {
          console.error('Failed to fetch workbooks:', workbooksResponse.statusText);
          throw new Error(`Failed to fetch workbooks: ${workbooksResponse.statusText}`);
        }
        
        const workbooksData = await workbooksResponse.json();
        console.log('Workbooks data:', workbooksData);
        setWorkbooks(workbooksData.workbooks || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Only verify access if we're in a browser environment
    if (typeof window !== 'undefined') {
      verifyUserAccess();
    }
  }, []);

  // We're now handling data fetching in the verifyUserAccess function
  // This ensures we only fetch data after confirming the user is authenticated

  const getConsultationTypeLabel = (type: string) => {
    const types = {
      general: 'General Physiotherapy',
      sports: 'Sports Rehabilitation',
      rehabilitation: 'Post-Surgery Rehabilitation',
      chronic: 'Chronic Pain Management'
    };
    return types[type as keyof typeof types] || type;
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

  const formatDate = (dateString: string | Date) => {
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        // If date is invalid, just return the original string
        return typeof dateString === 'string' ? dateString : 'Invalid date';
      }
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return typeof dateString === 'string' ? dateString : 'Invalid date';
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-32 pb-16 flex justify-center font-['Roboto']">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0B4073] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' && !isAuthenticated) {
    // Show a message and redirect
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-32 pb-16 flex justify-center font-['Roboto']">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Session expired. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-16 font-['Roboto']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#0B4073] p-8 text-white">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="mt-2 opacity-90">
              Welcome back, {user?.name || 'User'}
            </p>
          </div>

          {error && (
            <div className="p-4 mx-6 my-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center">
              <FiAlertCircle className="mr-2" />
              <span>{error}</span>
              <button className="ml-auto text-red-400 hover:text-red-600" onClick={() => setError('')}>
                <FiXCircle />
              </button>
            </div>
          )}

          <div className="border-b border-gray-200">
            <nav className="flex px-6">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'appointments'
                    ? 'border-[#0B4073] text-[#0B4073]'
                    : 'border-transparent text-gray-500 hover:text-[#7094B7] hover:border-[#D6E2EA]'
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
                    : 'border-transparent text-gray-500 hover:text-[#7094B7] hover:border-[#D6E2EA]'
                }`}
              >
                <FiBook className="inline-block mr-2" />
                My Workbooks
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'appointments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Your Appointments</h2>
                  <Link href="/book-appointment" className="mt-4 inline-block px-6 py-3 bg-[#0B4073] text-white rounded-lg hover:bg-[#7094B7] transition-colors shadow-sm">
                    <span className="flex items-center">
                      <FiCalendar className="mr-2" />
                      Book an Appointment
                    </span>
                  </Link>
                </div>

                {appointments.length === 0 ? (
                  <div className="text-center py-12 bg-[#f8fafc] rounded-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#D6E2EA] text-[#0B4073]">
                      <FiCalendar size={24} />
                    </div>
                    <p className="text-gray-600 mb-4">You don't have any appointments yet.</p>
                    <Link href="/book-appointment" className="mt-4 inline-block px-6 py-3 bg-[#0B4073] text-white rounded-lg hover:bg-[#7094B7] transition-colors shadow-sm">
                      <span className="flex items-center">
                        <FiCalendar className="mr-2" />
                        Book an Appointment
                      </span>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-[#f8fafc]">
                          <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {appointments.map((appointment, index) => (
                          <tr key={`${appointment._id}-${index}`} className="hover:bg-[#f8fafc] transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{formatDate(appointment.date)}</div>
                              <div className="text-sm text-gray-500 mt-1">{appointment.time}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{getConsultationTypeLabel(appointment.consultationType)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(appointment.status)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'workbooks' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Your Workbooks</h2>

                {workbooks.length === 0 ? (
                  <div className="text-center py-12 bg-[#f8fafc] rounded-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#D6E2EA] text-[#0B4073]">
                      <FiBook size={24} />
                    </div>
                    <p className="text-gray-600">You don't have any workbooks assigned yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workbooks.map((workbook, index) => (
                      <div key={`${workbook._id}-${index}`} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                        <div className="h-2 bg-[#0B4073]"></div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{workbook.title}</h3>
                          <p className="text-sm text-gray-600 mb-4">{workbook.description}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              {getStatusBadge(workbook.status)}
                            </div>
                            <button 
                              onClick={() => {
                                // Simple approach - just convert to string
                                const id = String(workbook._id).replace(/[^a-zA-Z0-9-]/g, '');
                                router.push(`/workbooks/${id}`);
                              }}
                              className="inline-flex items-center text-sm font-medium text-[#0B4073] hover:text-[#7094B7] transition-colors"
                            >
                              View Workbook <FiArrowRight className="ml-1" />
                            </button>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                            Created: {formatDate(workbook.createdAt)}
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
