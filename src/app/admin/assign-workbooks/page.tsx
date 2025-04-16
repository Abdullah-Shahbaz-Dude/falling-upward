"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type Workbook = {
  _id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string | null;
  assignedToUser?: {
    name: string;
    email: string;
  };
};

export default function AssignWorkbooksPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedWorkbook, setSelectedWorkbook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");

  // Redirect if not admin
  useEffect(() => {
    if (session && session.user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Fetch workbooks and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workbooksRes, usersRes] = await Promise.all([
          fetch("/api/workbooks"),
          fetch("/api/users")
        ]);
        
        const workbooksData = await workbooksRes.json();
        const usersData = await usersRes.json();
        
        setWorkbooks(workbooksData.workbooks || []);
        setUsers(usersData.users || []);
      } catch (error: unknown) {
        console.error("Error fetching data:", error instanceof Error ? error.message : String(error));
      }
    };

    if (session?.user.role === "admin") {
      fetchData();
    }
  }, [session]);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedWorkbook || !selectedUser) {
      setMessage("Please select both a workbook and a user");
      return;
    }

    try {
      const response = await fetch("/api/workbooks", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          workbookId: selectedWorkbook,
          userId: selectedUser
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        // Refresh the workbooks list
        const refreshedWorkbooks = await fetch("/api/workbooks").then(res => res.json());
        setWorkbooks(refreshedWorkbooks.workbooks || []);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error: unknown) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Failed to assign workbook'}`);
    }
  };

  if (!session || !session.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0B4073] mb-6">Assign Workbooks to Users</h1>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.startsWith('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleAssign} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-[#0B4073] mb-2">Select Workbook</label>
          <select 
            value={selectedWorkbook}
            onChange={(e) => setSelectedWorkbook(e.target.value)}
            className="w-full p-2 border border-[#7094B7] rounded font-['Roboto']"
          >
            <option value="">-- Select a Workbook --</option>
            {workbooks.map((workbook) => (
              <option key={workbook._id} value={workbook._id}>
                {workbook.title} {workbook.assignedTo ? '(Already Assigned)' : ''}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-[#0B4073] mb-2">Select User</label>
          <select 
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-2 border border-[#7094B7] rounded font-['Roboto']"
          >
            <option value="">-- Select a User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit"
          className="bg-[#0B4073] text-white py-2 px-4 rounded hover:bg-[#7094B7] transition-colors font-['Roboto']"
        >
          Assign Workbook
        </button>
      </form>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold text-[#0B4073] mb-4">Current Assignments</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full font-['Roboto']">
            <thead>
              <tr className="border-b border-[#D6E2EA]">
                <th className="text-left py-2">Workbook</th>
                <th className="text-left py-2">Assigned To</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {workbooks
                .filter(workbook => workbook.assignedTo)
                .map((workbook) => {
                  const assignedUser = workbook.assignedToUser || 
                    users.find(u => u._id === workbook.assignedTo);
                  
                  return (
                    <tr key={workbook._id} className="border-b border-[#D6E2EA]">
                      <td className="py-2">{workbook.title}</td>
                      <td className="py-2">
                        {assignedUser ? assignedUser.name : 'Unknown User'}
                      </td>
                      <td className="py-2">{workbook.status}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
