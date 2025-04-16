'use client';

import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

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

interface AssignWorkbookModalProps {
  users: User[];
  workbooks: Workbook[];
  selectedWorkbookId?: string;
  selectedUserId?: string;
  onClose: () => void;
  onSubmit: (data: { workbookId: string; userId: string }) => void;
}

export default function AssignWorkbookModal({ 
  users, 
  workbooks, 
  selectedWorkbookId = '', 
  selectedUserId = '', 
  onClose, 
  onSubmit 
}: AssignWorkbookModalProps) {
  const [workbookId, setWorkbookId] = useState(selectedWorkbookId);
  const [userId, setUserId] = useState(selectedUserId);

  useEffect(() => {
    setWorkbookId(selectedWorkbookId);
    setUserId(selectedUserId);
  }, [selectedWorkbookId, selectedUserId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ workbookId, userId });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md font-['Roboto']">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#0B4073]">Assign Workbook to User</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="workbook" className="block text-sm font-medium text-gray-700 mb-1">
              Select Workbook
            </label>
            <select
              id="workbook"
              value={workbookId}
              onChange={(e) => setWorkbookId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4073] focus:border-transparent"
              required
            >
              <option value="">-- Select a Workbook --</option>
              {workbooks.map((workbook) => (
                <option key={workbook._id} value={workbook._id}>
                  {workbook.title} {workbook.assignedTo ? `(Currently assigned to ${users.find(u => u._id === workbook.assignedTo)?.name || 'Unknown User'})` : ''}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">
              Assign to User
            </label>
            <select
              id="user"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4073] focus:border-transparent"
              required
            >
              <option value="">-- Select a User --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0B4073] hover:bg-[#7094B7] text-white rounded-md focus:outline-none transition-colors"
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
