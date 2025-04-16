import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { mockDb } from "@/lib/mockDb";
import { cookies } from "next/headers";

// Define TypeScript interfaces for better type safety
interface QuestionOption {
  id: string;
  text: string;
}

interface Question {
  id: string;
  type: 'text' | 'multipleChoice' | 'checkbox' | 'scale' | 'dropdown';
  text: string;
  required: boolean;
  options?: QuestionOption[];
  userAnswer?: string | string[];
}

interface WorkbookType {
  _id: string | { toString(): string };
  title: string;
  description: string;
  content?: string;
  questions?: Question[];
  status: 'assigned' | 'in_progress' | 'submitted' | 'reviewed';
  assignedTo: string | null;
  userResponse?: string;
  adminFeedback?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface UserType {
  _id: string | { toString(): string };
  name: string;
  email: string;
  role?: string;
}

interface SessionUser {
  id: string;
  email: string;
  role?: string;
  name?: string;
}

// Get all workbooks for the logged-in user
export async function GET() {
  try {
    console.log('Workbooks API - Checking authentication');
    
    // Get the session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      console.log('Workbooks API - No session cookie found');
      return NextResponse.json(
        { message: "Unauthorized - No session cookie" },
        { status: 401 }
      );
    }
    
    // Verify the JWT token
    let decoded;
    try {
      decoded = verify(
        sessionCookie.value, 
        process.env.NEXTAUTH_SECRET || 'fallingupsecret'
      );
    } catch (error) {
      console.error('Workbooks API - Invalid session token:', error);
      return NextResponse.json(
        { message: "Unauthorized - Invalid session" },
        { status: 401 }
      );
    }
    
    // Get user data from decoded token
    const userId = (decoded as any).id;
    const userRole = (decoded as any).role;
    
    console.log(`Workbooks API - User authenticated: ID=${userId}, Role=${userRole}`);
    
    // Initialize workbooks array
    let workbooks = [];
    
    // Check if workbooks exist in mockDb
    if (!mockDb.workbooks || !mockDb.workbooks.data) {
      console.log('Workbooks API - No workbooks found in mockDb, initializing empty array');
      mockDb.workbooks = { data: [] };
    }
    
    // Get all workbooks from mock database
    workbooks = mockDb.workbooks.data;
    
    // If not admin, filter workbooks for the specific user
    if (userRole !== 'admin') {
      console.log(`Workbooks API - Filtering workbooks for user ID: ${userId}`);
      workbooks = workbooks.filter((workbook: WorkbookType) => 
        workbook.assignedTo === userId
      );
    } else {
      // For admin, enhance workbooks with user info
      console.log('Workbooks API - Admin user, enhancing workbooks with user info');
      workbooks = workbooks.map((workbook: WorkbookType) => {
        const assignedUser = workbook.assignedTo ? 
          mockDb.users.data.find((u: UserType) => u._id === workbook.assignedTo) : null;
          
        return {
          ...workbook,
          assignedToUser: assignedUser ? {
            name: assignedUser.name,
            email: assignedUser.email
          } : null
        };
      });
    }
    
    console.log(`Workbooks API - Returning ${workbooks.length} workbooks`);
    

    return NextResponse.json({ workbooks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching workbooks:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Assign workbook to a user (admin only)
export async function PATCH(request: NextRequest) {
  try {
    // Get the session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return NextResponse.json(
        { message: "Unauthorized - No session cookie" },
        { status: 401 }
      );
    }
    
    // Verify the JWT token
    let decoded;
    try {
      decoded = verify(
        sessionCookie.value, 
        process.env.NEXTAUTH_SECRET || 'fallingupsecret'
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Unauthorized - Invalid session" },
        { status: 401 }
      );
    }
    
    // Get user role from decoded token
    const userRole = (decoded as any).role;
    
    // Only admins can assign workbooks
    if (userRole !== 'admin') {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const { workbookId, userId } = await request.json();

    if (!workbookId || !userId) {
      return NextResponse.json(
        { message: "Workbook ID and User ID are required" },
        { status: 400 }
      );
    }

    // Check if workbook exists in mockDb
    if (!mockDb.workbooks || !mockDb.workbooks.data) {
      console.log('Workbooks API - No workbooks found in mockDb, initializing empty array');
      mockDb.workbooks = { data: [] };
    }
    
    // Find the workbook by ID
    const workbook = mockDb.workbooks.data.find((wb: WorkbookType) => wb._id === workbookId);
    
    if (!workbook) {
      return NextResponse.json(
        { message: "Workbook not found" },
        { status: 404 }
      );
    }
    
    // Verify user exists
    const user = mockDb.users.data.find((u: UserType) => u._id === userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    
    // Update workbook in the mock database
    workbook.assignedTo = userId;
    workbook.status = 'assigned';
    
    // Update the workbook in the mockDb.workbooks.data array
    const workbookIndex = mockDb.workbooks.data.findIndex((wb: WorkbookType) => wb._id === workbookId);
    if (workbookIndex !== -1) {
      mockDb.workbooks.data[workbookIndex] = workbook;
    }

    return NextResponse.json({ 
      message: "Workbook assigned successfully",
      workbook 
    }, { status: 200 });
  } catch (error) {
    console.error("Error assigning workbook:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new workbook (admin only)
export async function POST(request: NextRequest) {
  try {
    console.log('Workbooks API - Creating a new workbook');
    
    // Get the session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      console.log('Workbooks API - No session cookie found');
      return NextResponse.json(
        { message: "Unauthorized - No session cookie" },
        { status: 401 }
      );
    }
    
    // Verify the JWT token
    let decoded;
    try {
      decoded = verify(
        sessionCookie.value, 
        process.env.NEXTAUTH_SECRET || 'fallingupsecret'
      );
    } catch (error) {
      console.error('Workbooks API - Invalid session token:', error);
      return NextResponse.json(
        { message: "Unauthorized - Invalid session" },
        { status: 401 }
      );
    }
    
    // Get user role from decoded token
    const userRole = (decoded as any).role;
    
    // Only admins can create workbooks
    if (userRole !== 'admin') {
      console.log('Workbooks API - Non-admin user attempted to create a workbook');
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const { 
      title, 
      description, 
      content = '', 
      assignedTo,
      questions = [] 
    } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    // Validate content is provided as it's required in the model
    if (!content) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    // Check if workbooks exist in mockDb
    if (!mockDb.workbooks || !mockDb.workbooks.data) {
      console.log('Workbooks API - No workbooks found in mockDb, initializing empty array');
      mockDb.workbooks = { data: [] };
    }
    
    // Determine the status based on whether a user is assigned
    const status = assignedTo ? 'assigned' : 'in_progress';
    
    // Generate a unique ID for the new workbook
    const newId = `wb_${Date.now()}`;
    
    // Create a new workbook object
    const workbook: WorkbookType = {
      _id: newId,
      title,
      description,
      content: content || '', // Ensure content is never undefined
      questions: questions || [],
      assignedTo: assignedTo || null, // Ensure null is passed if no assignedTo
      status,
      userResponse: '',
      adminFeedback: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add the new workbook to the mock database
    // Create a properly typed object that matches MockWorkbook interface
    mockDb.workbooks.data.push({
      _id: String(workbook._id),
      title: workbook.title,
      description: workbook.description,
      content: workbook.content || '',
      questions: workbook.questions || [],
      status: workbook.status,
      assignedTo: workbook.assignedTo,
      userResponse: workbook.userResponse || '',
      adminFeedback: workbook.adminFeedback || '',
      createdAt: workbook.createdAt instanceof Date ? workbook.createdAt : new Date(),
      updatedAt: workbook.updatedAt instanceof Date ? workbook.updatedAt : new Date()
    });
    
    console.log(`Workbooks API - Created new workbook with ID: ${newId}`);
    

    return NextResponse.json({ 
      message: "Workbook created successfully",
      workbook 
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating workbook:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
