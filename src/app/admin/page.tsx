'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

// Import components
import AdminSidebar from './components/AdminSidebar';
import DashboardContent from './components/DashboardContent';
import UsersContent from './components/UsersContent';
import WorkbooksContent from './components/WorkbooksContent';
import CreateWorkbookModal from './components/CreateWorkbookModal';
import AssignWorkbookModal from './components/AssignWorkbookModal';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface Workbook {
  _id: string;
  title: string;
  description: string;
  status: 'assigned' | 'in_progress' | 'submitted' | 'reviewed';
  createdAt: string;
  assignedTo?: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showWorkbookForm, setShowWorkbookForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedWorkbook, setSelectedWorkbook] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    const verifyAdminAccess = async () => {
      console.log('Admin page - Verifying access...');
      
      try {
        // Verify the user's session using our direct API
        const response = await fetch('/api/auth/verify');
        
        if (!response.ok) {
          console.error('Admin verification failed: Not authenticated');
          setError('You must be logged in to access the admin dashboard');
          router.push('/admin/login');
          return;
        }
        const data = await response.json();
        
        console.log('Admin page - Verification result:', data);
        
        if (!response.ok || !data.authenticated) {
          console.log('Admin page - Not authenticated, redirecting to login');
          router.push('/login');
          return;
        }
        
        // Check if the user is an admin
        if (data.user.role !== 'admin') {
          console.log('Admin page - Not admin, redirecting to dashboard');
          router.push('/dashboard');
          return;
        }
        
        // User is confirmed as admin, load admin dashboard data
        console.log('Admin page - Admin user confirmed, loading dashboard');
        fetchUsers();
        fetchWorkbooks();
      } catch (error) {
        console.error('Admin page - Error verifying access:', error);
        router.push('/login');
      }
    };
    
    verifyAdminAccess();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('An error occurred while fetching users');
    }
  };

  const fetchWorkbooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/workbooks');
      const data = await response.json();
      
      if (response.ok) {
        setWorkbooks(data.workbooks);
      } else {
        setError(data.message || 'Failed to fetch workbooks');
      }
    } catch (err) {
      setError('An error occurred while fetching workbooks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWorkbook = async (newWorkbook: { title: string; description: string }) => {
    try {
      const response = await fetch('/api/workbooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkbook),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setWorkbooks([...workbooks, data.workbook]);
        setShowWorkbookForm(false);
      } else {
        setError(data.message || 'Failed to create workbook');
      }
    } catch (err) {
      setError('An error occurred while creating the workbook');
    }
  };

  const handleAssignWorkbook = async (data: { workbookId: string; userId: string }) => {
    try {
      const response = await fetch('/api/workbooks', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workbookId: data.workbookId,
          userId: data.userId,
        }),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        // Update the workbooks list
        fetchWorkbooks();
        setShowAssignForm(false);
        setSelectedWorkbook('');
        setSelectedUser('');
      } else {
        setError(responseData.message || 'Failed to assign workbook');
      }
    } catch (err) {
      setError('An error occurred while assigning the workbook');
    }
  };

  const openAssignModal = (workbookId?: string, userId?: string) => {
    if (workbookId) setSelectedWorkbook(workbookId);
    if (userId) setSelectedUser(userId);
    setShowAssignForm(true);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] font-['Roboto']">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0B4073]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Roboto']">
      <div className="flex h-screen">
        {/* Sidebar */}
        <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto ml-64">
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center">
                <FiAlertCircle className="mr-2" />
                <span>{error}</span>
                <button className="ml-auto text-red-400 hover:text-red-600" onClick={() => setError('')}>
                  <FiXCircle />
                </button>
              </div>
            )}
            
            {activeSection === 'dashboard' && (
              <DashboardContent 
                users={users} 
                workbooks={workbooks} 
                setActiveSection={setActiveSection} 
              />
            )}
            
            {activeSection === 'users' && (
              <UsersContent 
                users={users} 
                onAssignWorkbook={(userId) => openAssignModal(undefined, userId)} 
              />
            )}
            
            {activeSection === 'workbooks' && (
              <WorkbooksContent 
                workbooks={workbooks} 
                users={users} 
                isLoading={isLoading} 
                onCreateWorkbook={() => setShowWorkbookForm(true)} 
                onAssignWorkbook={(workbookId) => openAssignModal(workbookId)} 
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Create Workbook Modal */}
      {showWorkbookForm && (
        <CreateWorkbookModal 
          onClose={() => setShowWorkbookForm(false)} 
          onSubmit={handleCreateWorkbook} 
        />
      )}
      
      {/* Assign Workbook Modal */}
      {showAssignForm && (
        <AssignWorkbookModal 
          users={users} 
          workbooks={workbooks} 
          selectedWorkbookId={selectedWorkbook} 
          selectedUserId={selectedUser} 
          onClose={() => {
            setShowAssignForm(false);
            setSelectedWorkbook('');
            setSelectedUser('');
          }} 
          onSubmit={handleAssignWorkbook} 
        />
      )}
    </div>
  );
}
