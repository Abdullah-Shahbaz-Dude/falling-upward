'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiClock, FiCheckCircle, FiXCircle, FiBook, FiEdit, FiEye, FiUsers, FiCalendar, FiFileText } from 'react-icons/fi';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState([]);
  const [workbooks, setWorkbooks] = useState([]);
  const [users, setUsers] = useState<{_id: string; name: string; email: string; role?: string}[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [workbookToAssign, setWorkbookToAssign] = useState<any>(null);
  const [availableWorkbooks, setAvailableWorkbooks] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Admin Dashboard - Checking authentication');
        const cookies = document.cookie.split(';');
        const userCookie = cookies.find(c => c.trim().startsWith('user-session='));

        if (!userCookie) {
          console.log('No user cookie found, redirecting to login');
          window.location.href = '/login';
          return;
        }

        const cookieValue = userCookie.split('=')[1];
        console.log('Cookie value:', cookieValue);

        let userData;
        try {
          userData = JSON.parse(decodeURIComponent(cookieValue));
        } catch (e) {
          console.log('Failed to decode with decodeURIComponent, trying direct parsing');
          userData = JSON.parse(cookieValue);
        }

        console.log('Parsed user data:', userData);

        if (userData.role !== 'admin') {
          window.location.href = '/user-dashboard';
          return;
        }

        setUser(userData);

        fetchDashboardData();
      } catch (error) {
        console.error('Error parsing user data:', error);
        window.location.href = '/login';
      }
    };

    const fetchDashboardData = async () => {
      setIsLoading(true);
      console.log('Fetching dashboard data...');

      try {
        // Fetch all users
        const usersResponse = await fetch('/api/users');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData.users || []);
        }
        
        // Fetch all appointments
        const appointmentsResponse = await fetch('/api/appointments');
        if (appointmentsResponse.ok) {
          const appointmentsData = await appointmentsResponse.json();
          setAppointments(appointmentsData.appointments || []);
        }
        
        // Fetch all workbooks
        const workbooksResponse = await fetch('/api/workbooks');
        if (workbooksResponse.ok) {
          const workbooksData = await workbooksResponse.json();
          const allWorkbooks = workbooksData.workbooks || [];
          setWorkbooks(allWorkbooks);
          
          // Filter for available workbooks (not assigned to anyone)
          setAvailableWorkbooks(allWorkbooks.filter((wb: any) => !wb.assignedTo));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);
  
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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
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
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user?.name || 'Admin'}</span>
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
        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'dashboard' ? 'border-[#0B4073] text-[#0B4073]' : 'border-transparent text-gray-500 hover:text-[#7094B7]'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'users' ? 'border-[#0B4073] text-[#0B4073]' : 'border-transparent text-gray-500 hover:text-[#7094B7]'}`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('workbooks')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'workbooks' ? 'border-[#0B4073] text-[#0B4073]' : 'border-transparent text-gray-500 hover:text-[#7094B7]'}`}
            >
              Workbooks
            </button>
          </nav>
        </div>
        
        {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats Section */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="rounded-full bg-[#D6E2EA] p-3 mr-4">
                <FiUsers className="text-[#0B4073] text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <h3 className="text-2xl font-semibold text-gray-800">24</h3>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="rounded-full bg-[#D6E2EA] p-3 mr-4">
                <FiCalendar className="text-[#0B4073] text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Today's Appointments</p>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {appointments.filter((apt: any) => {
                    const today = new Date().toISOString().split('T')[0];
                    return apt.date === today;
                  }).length}
                </h3>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="rounded-full bg-[#D6E2EA] p-3 mr-4">
                <FiFileText className="text-[#0B4073] text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Workbooks</p>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {workbooks.filter((wb: any) => wb.status === 'submitted').length}
                </h3>
              </div>
            </div>
          </div>
          
          {/* Recent Appointments Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiCalendar className="mr-2 text-[#0B4073]" /> 
                Recent Appointments
              </h2>
              <Link 
                href="/admin/appointments" 
                className="text-sm text-[#0B4073] hover:underline"
              >
                Manage All
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
                        <h3 className="font-medium text-gray-800">
                          {appointment.patientName || 'Patient Name'}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {appointment.type} Session • {appointment.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        {getStatusBadge(appointment.status)}
                        <Link 
                          href={`/admin/appointments/${appointment._id}`}
                          className="text-xs text-[#0B4073] hover:underline mt-2"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Workbooks Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiFileText className="mr-2 text-[#0B4073]" /> 
                Workbooks to Review
              </h2>
              <Link 
                href="/admin/workbooks" 
                className="text-sm text-[#0B4073] hover:underline"
              >
                View All
              </Link>
            </div>
            
            {workbooks.filter((wb: any) => wb.status === 'submitted').length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No workbooks pending review.
              </div>
            ) : (
              <div className="space-y-4">
                {workbooks
                  .filter((wb: any) => wb.status === 'submitted')
                  .slice(0, 5)
                  .map((workbook: any) => (
                    <div key={workbook._id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">{workbook.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Patient: {workbook.patientName || 'Patient Name'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Submitted: {new Date(workbook.submittedDate || workbook.assignedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          {getWorkbookStatusBadge(workbook.status)}
                          <Link 
                            href={`/admin/workbooks/${workbook._id}`}
                            className="text-xs text-[#0B4073] hover:underline mt-2"
                          >
                            Review Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}
          </section>
        </div>
        )}
        
        {/* Users Management Section */}
        {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
            <button 
              className="px-4 py-2 bg-[#0B4073] text-white rounded-lg text-sm hover:bg-[#0B4073]/90 transition"
              onClick={() => {
                // In a real app, this would open a modal or redirect to a user registration page
                alert('This would open a user registration form');
              }}
            >
              Add New User
            </button>
          </div>
          
          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Workbooks</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user: any) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-[#D6E2EA] text-[#0B4073]' : 'bg-[#7094B7] text-white'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {workbooks.filter((wb: any) => wb.assignedTo === user._id).length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="text-[#0B4073] hover:text-[#7094B7] mr-3"
                        >
                          Assign Workbook
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Assign Workbook to {selectedUser.name}</h3>
                
                {availableWorkbooks.length === 0 ? (
                  <p className="text-gray-500 mb-4">No available workbooks to assign</p>
                ) : (
                  <div className="max-h-60 overflow-y-auto mb-4">
                    {availableWorkbooks.map((workbook: any) => (
                      <div key={workbook._id} className="p-3 border rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                        <h4 className="font-medium">{workbook.title}</h4>
                        <p className="text-sm text-gray-600">{workbook.description?.substring(0, 100) || 'No description'}...</p>
                        <button 
                          className="mt-2 px-3 py-1 bg-[#0B4073] text-white text-sm rounded hover:bg-[#0B4073]/90"
                          onClick={() => {
                            // In a real app, this would make an API call to assign the workbook
                            alert(`Workbook "${workbook.title}" assigned to ${selectedUser.name}`);
                            setSelectedUser(null);
                          }}
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        )}
        
        {/* Workbooks Management Section */}
        {activeTab === 'workbooks' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Workbook Management</h2>
          </div>
          
          {workbooks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No workbooks found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workbooks.map((workbook: any) => (
                <div key={workbook._id} className="border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className="h-2 bg-[#0B4073]"></div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{workbook.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{workbook.description?.substring(0, 120) || 'No description'}...</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>{getWorkbookStatusBadge(workbook.status)}</div>
                      <div className="text-sm text-gray-500">
                        {workbook.assignedTo ? 'Assigned' : 'Available'}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between">
                      <button 
                        className="text-[#0B4073] hover:text-[#7094B7] text-sm font-medium"
                        onClick={() => {
                          // In a real app, this would navigate to a workbook edit page
                          alert(`Viewing workbook: ${workbook.title}`);
                        }}
                      >
                        View Details
                      </button>
                      
                      {!workbook.assignedTo && (
                        <button 
                          className="text-[#7094B7] hover:text-[#0B4073] text-sm font-medium"
                          onClick={() => {
                            if (users.length > 0) {
                              setWorkbookToAssign(workbook);
                              setShowAssignModal(true);
                            } else {
                              alert('No users available to assign the workbook to.');
                            }
                          }}
                        >
                          Assign to User
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}
      </main>
      
      {/* Assign Workbook Modal */}
      {showAssignModal && workbookToAssign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Assign "{workbookToAssign.title}" to User
            </h3>
            
            <div className="max-h-60 overflow-y-auto mb-4">
              {users.map(user => (
                <div key={user._id} className="p-3 border rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                  <h4 className="font-medium">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <button 
                    className="mt-2 px-3 py-1 bg-[#0B4073] text-white text-sm rounded hover:bg-[#0B4073]/90"
                    onClick={() => {
                      // In a real app, this would make an API call to assign the workbook
                      alert(`Workbook "${workbookToAssign.title}" assigned to ${user.name}`);
                      setShowAssignModal(false);
                    }}
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
                onClick={() => setShowAssignModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
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
