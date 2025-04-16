'use client';

import { FiBook, FiPlus, FiEdit, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface Workbook {
  _id: string | { toString(): string } | any;
  title: string;
  description: string;
  status: 'assigned' | 'in_progress' | 'submitted' | 'reviewed';
  createdAt: string;
  assignedTo?: string;
}

interface WorkbooksContentProps {
  workbooks: Workbook[];
  users: User[];
  isLoading: boolean;
  onCreateWorkbook: () => void;
  onAssignWorkbook: (workbookId: string) => void;
}

export default function WorkbooksContent({ 
  workbooks, 
  users, 
  isLoading, 
  onCreateWorkbook, 
  onAssignWorkbook 
}: WorkbooksContentProps) {
  const router = useRouter();
  
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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#0B4073] flex items-center">
          <FiBook className="mr-2" />
          Manage Workbooks
        </h2>
        <button
          onClick={onCreateWorkbook}
          className="bg-[#0B4073] hover:bg-[#7094B7] text-white px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors"
        >
          <FiPlus className="mr-2" />
          Create Workbook
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0B4073]"></div>
        </div>
      ) : workbooks.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">No workbooks found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {workbooks.map((workbook, index) => {
                // Ensure workbook._id is converted to string to avoid '[object Object]' keys
                const workbookId = typeof workbook._id === 'object' && workbook._id !== null
                  ? (workbook._id && typeof (workbook._id as any).toString === 'function' ? (workbook._id as any).toString() : `id-${index}`)
                  : String(workbook._id || `id-${index}`);
                  
                return (
                <tr key={`workbook-${workbookId}-${index}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{workbook.title}</div>
                    <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">{workbook.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${getStatusBadgeColor(workbook.status)}`}>
                      {workbook.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {workbook.assignedTo ? (
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[#D6E2EA] flex items-center justify-center text-[#0B4073] text-xs mr-2">
                          {(users.find(u => u._id === workbook.assignedTo)?.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <span>{users.find(u => u._id === workbook.assignedTo)?.name || 'Unknown User'}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 flex items-center">
                        <FiUser className="mr-1 text-gray-300" size={14} />
                        Not assigned
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button 
                      onClick={() => onAssignWorkbook(workbook._id)}
                      className="text-[#0B4073] hover:text-[#7094B7] p-1.5 rounded-full hover:bg-[#D6E2EA] transition-colors"
                      title="Assign to User"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button 
                      onClick={() => router.push(`/workbooks/${workbook._id}`)}
                      className="text-[#7094B7] hover:text-[#0B4073] p-1.5 rounded-full hover:bg-[#D6E2EA] transition-colors"
                      title="View Workbook"
                    >
                      <FiBook size={16} />
                    </button>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
