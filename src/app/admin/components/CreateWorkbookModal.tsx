'use client';

import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface CreateWorkbookModalProps {
  onClose: () => void;
  onSubmit: (workbook: { title: string; description: string }) => void;
}

export default function CreateWorkbookModal({ onClose, onSubmit }: CreateWorkbookModalProps) {
  const [workbook, setWorkbook] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(workbook);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md font-['Roboto']">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#0B4073]">Create New Workbook</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={workbook.title}
              onChange={(e) => setWorkbook({ ...workbook, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4073] focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={workbook.description}
              onChange={(e) => setWorkbook({ ...workbook, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B4073] focus:border-transparent"
              rows={4}
              required
            ></textarea>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
