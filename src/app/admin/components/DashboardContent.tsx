'use client';

import { FiUsers, FiBook, FiCheckCircle, FiClock } from 'react-icons/fi';

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

interface DashboardContentProps {
  users: User[];
  workbooks: Workbook[];
  setActiveSection: (section: string) => void;
}

export default function DashboardContent({ users, workbooks, setActiveSection }: DashboardContentProps) {
  const assignedWorkbooks = workbooks.filter(w => w.assignedTo);
  const unassignedWorkbooks = workbooks.filter(w => !w.assignedTo);
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'bg-[#D6E2EA] text-[#0B4073]';
      case 'in_progress':
        return 'bg-[#7094B7] text-white';
      case 'submitted':
        return 'bg-[#0B4073] text-white';
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#0B4073] hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#D6E2EA] text-[#0B4073]">
              <FiUsers size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-2xl font-bold text-[#0B4073]">{users.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#7094B7] hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-[#D6E2EA] text-[#7094B7]">
              <FiBook size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm font-medium">Total Workbooks</h3>
              <p className="text-2xl font-bold text-[#7094B7]">{workbooks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiCheckCircle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm font-medium">Assigned</h3>
              <p className="text-2xl font-bold text-green-600">{assignedWorkbooks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FiClock size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm font-medium">Unassigned</h3>
              <p className="text-2xl font-bold text-yellow-600">{unassignedWorkbooks.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-[#0B4073] mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {workbooks.slice(0, 5).map((workbook, index) => (
            <div key={String(workbook._id) + '-' + index} className="flex items-start border-b border-gray-100 pb-4">
              <div className={`p-2 rounded-full ${workbook.assignedTo ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'} mr-3`}>
                {workbook.assignedTo ? <FiCheckCircle size={16} /> : <FiClock size={16} />}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{workbook.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {workbook.assignedTo 
                    ? `Assigned to ${users.find(u => u._id === workbook.assignedTo)?.name || 'Unknown User'}`
                    : 'Not assigned yet'}
                </p>
              </div>
              <div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(workbook.status)}`}>
                  {workbook.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
        {workbooks.length > 5 && (
          <div className="mt-4 text-center">
            <button 
              onClick={() => setActiveSection('workbooks')}
              className="text-[#0B4073] hover:text-[#7094B7] text-sm font-medium"
            >
              View All Workbooks
            </button>
          </div>
        )}
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-[#0B4073] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveSection('workbooks')}
            className="p-4 bg-[#D6E2EA] hover:bg-[#0B4073] hover:text-white text-[#0B4073] rounded-lg transition-colors flex flex-col items-center justify-center"
          >
            <FiBook size={24} className="mb-2" />
            <span className="font-medium">Manage Workbooks</span>
          </button>
          
          <button 
            onClick={() => setActiveSection('users')}
            className="p-4 bg-[#D6E2EA] hover:bg-[#0B4073] hover:text-white text-[#0B4073] rounded-lg transition-colors flex flex-col items-center justify-center"
          >
            <FiUsers size={24} className="mb-2" />
            <span className="font-medium">Manage Users</span>
          </button>
          
          <a 
            href="/admin/assign-workbooks"
            className="p-4 bg-[#D6E2EA] hover:bg-[#0B4073] hover:text-white text-[#0B4073] rounded-lg transition-colors flex flex-col items-center justify-center"
          >
            <FiCheckCircle size={24} className="mb-2" />
            <span className="font-medium">Assign Workbooks</span>
          </a>
        </div>
      </div>
    </div>
  );
}
