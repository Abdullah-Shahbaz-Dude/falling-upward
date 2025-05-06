import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

// Helper function to verify admin access
async function verifyAdminAccess(request: NextRequest) {
  // Get cookies from the request directly
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

// GET: Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAccess(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }
    
    // Get all users from mock database
    const users = mockDb.users.data.map((user: { _id: string | { toString(): string }, name: string, email: string, role: string, createdAt: Date }) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }));
    
    return NextResponse.json({ 
      success: true, 
      users 
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Create a new user (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAccess(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }
    
    const { name, email, role } = await request.json();
    
    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = mockDb.users.data.find((u: { email: string }) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Create new user with fixed password as per memory
    const newUserId = (mockDb.users.data.length + 1).toString();
    const newUser = {
      _id: newUserId,
      name,
      email,
      password: 'password123', // Fixed password as mentioned in the memory
      role: role || 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add to mock database
    mockDb.users.data.push(newUser);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'User created successfully',
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
