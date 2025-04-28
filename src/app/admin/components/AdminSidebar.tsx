'use client';

import Link from 'next/link';
import { 
  FiHome, 
  FiUsers, 
  FiBook, 
  FiFileText, 
  FiUser
} from 'react-icons/fi';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-white shadow-md z-10 flex flex-col h-screen fixed">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Falling Upward Logo" 
            className="h-12 w-auto mr-3"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMEI0MDczIiByeD0iNCIvPjx0ZXh0IHg9IjEyIiB5PSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RlU8L3RleHQ+PC9zdmc+';
            }}
          />
          <h1 className="text-xl font-bold text-[#0B4073]">Admin Portal</h1>
        </div>
      </div>
      
      <nav className="flex-1 pt-6 px-4 pb-4 overflow-y-auto">
        <div className="space-y-1">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeSection === 'dashboard'
                ? 'bg-[#D6E2EA] text-[#0B4073]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#0B4073]'
            }`}
          >
            <FiHome className="mr-3 h-5 w-5" />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveSection('users')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeSection === 'users'
                ? 'bg-[#D6E2EA] text-[#0B4073]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#0B4073]'
            }`}
          >
            <FiUsers className="mr-3 h-5 w-5" />
            Users
          </button>
          
          <button
            onClick={() => setActiveSection('workbooks')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeSection === 'workbooks'
                ? 'bg-[#D6E2EA] text-[#0B4073]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#0B4073]'
            }`}
          >
            <FiBook className="mr-3 h-5 w-5" />
            Workbooks
          </button>
          
          <Link href="/admin/assign-workbooks" className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-[#0B4073] transition-colors">
            <FiFileText className="mr-3 h-5 w-5" />
            Assign Workbooks
          </Link>
        </div>
        
        <div className="pt-8">
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              User Account
            </h3>
          </div>
          
          <Link href="/dashboard" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-[#0B4073] transition-colors">
            <FiUser className="mr-3 h-5 w-5" />
            My Dashboard
          </Link>
          
          <Link href="/api/auth/signout" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-red-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </Link>
        </div>
      </nav>
    </div>
  );
}
