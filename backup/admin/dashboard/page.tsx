'use client';

import { useState, useEffect } from 'react';
// Using cookie-based authentication instead of NextAuth
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FiUsers, 
  FiCalendar, 
  FiBook, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSearch
} from 'react-icons/fi';

type User = {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
};

type Appointment = {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  consultationType: 'general' | 'sports' | 'rehabilitation' | 'chronic';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
};

type Workbook = {
  _id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  status: 'assigned' | 'in_progress' | 'submitted' | 'reviewed';
  createdAt: string;
};

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('appointments');
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
    const fetchData = async () => {
      if (!user || user.role !== 'admin') return;

      try {
        // Fetch users
        const usersResponse = await fetch('/api/admin/users');
        if (!usersResponse.ok) throw new Error('Failed to fetch users');
        const usersData = await usersResponse.json();
        setUsers(usersData.users);

        // Fetch appointments
        const appointmentsResponse = await fetch('/api/admin/appointments');
        if (!appointmentsResponse.ok) throw new Error('Failed to fetch appointments');
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData.appointments);

        // Fetch workbooks
        const workbooksResponse = await fetch('/api/admin/workbooks');
        if (!workbooksResponse.ok) throw new Error('Failed to fetch workbooks');
        const workbooksData = await workbooksResponse.json();
        setWorkbooks(workbooksData.workbooks);
      } catch (error) {
        console.error(error);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.role === 'admin') {
      fetchData();
    }
  }, [user]);

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }

      // Update local state
      setAppointments(appointments.map(appointment => 
        appointment._id === id ? { ...appointment, status: status as any } : appointment
      ));
    } catch (error) {
      console.error(error);
      setError('Failed to update appointment status');
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;

    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      // Update local state
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    } catch (error) {
      console.error(error);
      setError('Failed to delete appointment');
    }
  };

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
        return <span className="px-2 py-1 bg-[#D6E2EA] text-[#0B4073] rounded-full text-xs flex items-center font-roboto"><FiClock className="mr-1" /> Pending</span>;
      case 'confirmed':
        return <span className="px-2 py-1 bg-[#D6E2EA] text-[#0B4073] rounded-full text-xs flex items-center font-roboto"><FiCheckCircle className="mr-1" /> Confirmed</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center font-roboto"><FiCheckCircle className="mr-1" /> Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center font-roboto"><FiXCircle className="mr-1" /> Cancelled</span>;
      case 'assigned':
        return <span className="px-2 py-1 bg-[#D6E2EA] text-[#0B4073] rounded-full text-xs flex items-center font-roboto"><FiBook className="mr-1" /> Assigned</span>;
      case 'in_progress':
        return <span className="px-2 py-1 bg-[#7094B7] text-white rounded-full text-xs flex items-center font-roboto"><FiEdit className="mr-1" /> In Progress</span>;
      case 'submitted':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center font-roboto"><FiCheckCircle className="mr-1" /> Submitted</span>;
      case 'reviewed':
        return <span className="px-2 py-1 bg-[#0B4073] text-white rounded-full text-xs flex items-center font-roboto"><FiCheckCircle className="mr-1" /> Reviewed</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-roboto">{status}</span>;
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

  const filteredAppointments = appointments.filter(appointment => {
    const searchLower = searchTerm.toLowerCase();
    return (
      appointment.userName.toLowerCase().includes(searchLower) ||
      appointment.userEmail.toLowerCase().includes(searchLower) ||
      getConsultationTypeLabel(appointment.consultationType).toLowerCase().includes(searchLower)
    );
  });

  const filteredWorkbooks = workbooks.filter(workbook => {
    const searchLower = searchTerm.toLowerCase();
    return (
      workbook.userName.toLowerCase().includes(searchLower) ||
      workbook.title.toLowerCase().includes(searchLower)
    );
  });

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0B4073] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-roboto">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen pt-32 pb-16 font-roboto">
      <div className="container-custom mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#0B4073] p-6 text-white">
            <h1 className="text-3xl font-bold font-roboto">Admin Dashboard</h1>
            <p className="mt-2 opacity-90 font-roboto">
              Manage appointments, workbooks, and users
            </p>
          </div>

          {error && (
            <div className="p-4 m-6 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
              <FiAlertCircle className="mr-2" />
              <span>{error}</span>
            </div>
          )}

          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-4 px-6 font-medium text-sm border-b-2 font-roboto ${
                  activeTab === 'appointments'
                    ? 'border-[#0B4073] text-[#0B4073]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiCalendar className="inline-block mr-2" />
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('workbooks')}
                className={`py-4 px-6 font-medium text-sm border-b-2 font-roboto ${
                  activeTab === 'workbooks'
                    ? 'border-[#0B4073] text-[#0B4073]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiBook className="inline-block mr-2" />
                Workbooks
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-6 font-medium text-sm border-b-2 font-roboto ${
                  activeTab === 'users'
                    ? 'border-[#0B4073] text-[#0B4073]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiUsers className="inline-block mr-2" />
                Users
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#0B4073] focus:border-[#0B4073] font-roboto"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {activeTab === 'workbooks' && (
                <Link href="/admin/workbooks/create" className="btn-primary bg-[#0B4073] hover:bg-[#7094B7] text-white font-roboto px-4 py-2 rounded-md flex items-center">
                  <FiPlus className="mr-2" />
                  Create Workbook
                </Link>
              )}
            </div>

            {activeTab === 'appointments' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">All Appointments</h2>

                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <FiCalendar className="mx-auto text-4xl text-gray-400 mb-3" />
                    <p className="text-gray-600">No appointments found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAppointments.map((appointment, index) => (
                          <tr key={`admin-appointment-${appointment._id}-${index}`} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{appointment.userName}</div>
                              <div className="text-sm text-gray-500">{appointment.userEmail}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{formatDate(appointment.date)}</div>
                              <div className="text-sm text-gray-500">{appointment.time}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{getConsultationTypeLabel(appointment.consultationType)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(appointment.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-3">
                                <select
                                  value={appointment.status}
                                  onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
                                  className="text-sm border border-gray-300 rounded px-2 py-1"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                                <button
                                  onClick={() => deleteAppointment(appointment._id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
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
                <h2 className="text-xl font-semibold mb-6">All Workbooks</h2>

                {filteredWorkbooks.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <FiBook className="mx-auto text-4xl text-gray-400 mb-3" />
                    <p className="text-gray-600">No workbooks found</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredWorkbooks.map((workbook, index) => (
                      <div key={`admin-workbook-${workbook._id}-${index}`} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-5">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold">{workbook.title}</h3>
                            {getStatusBadge(workbook.status)}
                          </div>
                          <p className="mt-1 text-sm text-gray-600">Assigned to: <span className="font-medium">{workbook.userName}</span></p>
                          <p className="mt-2 text-gray-600 text-sm">{workbook.description}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs text-gray-500">Created: {formatDate(workbook.createdAt)}</span>
                            <div className="flex space-x-2">
                              <Link 
                                href={`/admin/workbooks/${workbook._id}`} 
                                className="text-[#0B4073] hover:text-[#7094B7] text-sm font-medium flex items-center font-roboto"
                              >
                                <FiEdit className="mr-1" /> Edit
                              </Link>
                              <button 
                                className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center font-roboto"
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this workbook?')) {
                                    // Delete workbook logic
                                  }
                                }}
                              >
                                <FiTrash2 className="mr-1" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">All Users</h2>

                {filteredUsers.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <FiUsers className="mx-auto text-4xl text-gray-400 mb-3" />
                    <p className="text-gray-600">No users found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user, index) => (
                          <tr key={`admin-user-${user._id}-${index}`} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-roboto ${
                                user.role === 'admin' 
                                  ? 'bg-[#0B4073] text-white' 
                                  : 'bg-[#D6E2EA] text-[#0B4073]'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{formatDate(user.createdAt)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-3">
                                <Link 
                                  href={`/admin/users/${user._id}`}
                                  className="text-[#0B4073] hover:text-[#7094B7] font-roboto"
                                >
                                  <FiEdit />
                                </Link>
                                {user.role !== 'admin' && (
                                  <button
                                    onClick={() => {
                                      if (confirm('Are you sure you want to delete this user?')) {
                                        // Delete user logic
                                      }
                                    }}
                                    className="text-red-600 hover:text-red-800 font-roboto"
                                  >
                                    <FiTrash2 />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
