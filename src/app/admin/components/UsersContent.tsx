'use client';

import { FiUsers } from 'react-icons/fi';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface UsersContentProps {
  users: User[];
  onAssignWorkbook: (userId: string) => void;
}

export default function UsersContent({ users, onAssignWorkbook }: UsersContentProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-[#0B4073] flex items-center">
          <FiUsers className="mr-2" />
          Manage Users
        </h2>
      </div>
      
      {users.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">No users found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#D6E2EA] flex items-center justify-center text-[#0B4073] font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${user.role === 'admin' ? 'bg-[#0B4073] text-white' : 'bg-[#D6E2EA] text-[#0B4073]'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => onAssignWorkbook(user._id)}
                      className="bg-[#0B4073] hover:bg-[#7094B7] text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
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
    </div>
  );
}
