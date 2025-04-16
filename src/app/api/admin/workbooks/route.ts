import { NextRequest, NextResponse } from 'next/server';
import { mockDb, WorkbookModel } from '@/lib/mockDb';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

// Helper function to verify admin access
async function verifyAdminAccess(request: NextRequest) {
  // Get cookies from the request directly instead of using the cookies() function
  const sessionCookie = request.cookies.get('falling-upward-session');
  
  if (!sessionCookie?.value) {
    return { authorized: false, message: 'Not authenticated' };
  }
  
  try {
    const decoded = verify(
      sessionCookie.value, 
      process.env.NEXTAUTH_SECRET || 'fallingupsecret'
    ) as { id: string; email: string; name: string; role: string };
    
    if (decoded.role !== 'admin') {
      return { authorized: false, message: 'Admin access required' };
    }
    
    return { authorized: true, userId: decoded.id };
  } catch (err) {
    return { authorized: false, message: 'Invalid session' };
  }
}

// GET: Get all workbooks (admin only)
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAccess(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }
    
    // Get all workbooks from mock database
    const workbooks = await WorkbookModel.findAll();
    
    // Add user information to each workbook
    const workbooksWithUserInfo = workbooks.map((workbook: any) => {
      if (workbook.assignedTo) {
        const user = mockDb.users.data.find((u: { _id: string | { toString(): string }, name: string, email: string }) => u._id.toString() === workbook.assignedTo);
        if (user) {
          return {
            ...workbook,
            userName: user.name,
            userEmail: user.email
          };
        }
      }
      
      return {
        ...workbook,
        userName: 'Unassigned',
        userEmail: ''
      };
    });
    
    return NextResponse.json({ 
      success: true, 
      workbooks: workbooksWithUserInfo 
    });
  } catch (error) {
    console.error('Error fetching workbooks:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Create a new workbook (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAccess(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }
    
    const { title, description, content, userId } = await request.json();
    
    // Validate required fields
    if (!title || !description || !content) {
      return NextResponse.json(
        { success: false, message: 'Title, description, and content are required' },
        { status: 400 }
      );
    }
    
    // Check if user exists if userId is provided
    if (userId) {
      const userExists = mockDb.users.data.some((u: { _id: string | { toString(): string } }) => u._id.toString() === userId);
      if (!userExists) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }
    }
    
    // Create new workbook
    const newWorkbook = await WorkbookModel.create({
      title,
      description,
      content,
      assignedTo: userId || null,
      status: userId ? 'assigned' : 'in_progress',
      questions: [],
      userResponse: '',
      adminFeedback: '',
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Workbook created successfully',
        workbook: newWorkbook
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating workbook:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
