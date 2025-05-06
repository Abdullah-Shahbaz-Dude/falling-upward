import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { mockDb } from '@/lib/mockDb';
import { sign } from 'jsonwebtoken';

// Admin-specific login API for development purposes
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log(`Admin login API: Attempting login for ${email}`);

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();
    
    // In development mode, we'll use the mock database directly
    const isUsingMockDb = process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI;
    
    // Find the user directly from the mock database
    const mockUser = isUsingMockDb ? 
      mockDb.users.data.find((u: { email: string; role: string; _id: string | { toString(): string }; name: string; }) => u.email === email) : 
      null;
    
    if (isUsingMockDb) {
      // Mock database login logic
      if (!mockUser) {
        console.log(`Admin login API: User not found in mock DB - ${email}`);
        return NextResponse.json(
          { success: false, message: "Invalid credentials" },
          { status: 401 }
        );
      }
      
      // Check if the user is an admin
      if (mockUser.role !== 'admin') {
        console.log(`Admin login API: User is not an admin - ${email}`);
        return NextResponse.json(
          { success: false, message: "Access denied: Admin privileges required" },
          { status: 403 }
        );
      }
      
      console.log(`Admin login API: Admin user found in mock DB - ${mockUser.name}`);
      
      // For mock database, always accept 'password123'
      const isPasswordValid = password === 'password123';
      
      if (!isPasswordValid) {
        console.log(`Admin login API: Invalid password for ${email}`);
        return NextResponse.json(
          { success: false, message: "Invalid credentials" },
          { status: 401 }
        );
      }
      
    } else {
      // This would be real database logic, but we're not implementing it for now
      return NextResponse.json(
        { success: false, message: "Real database not implemented" },
        { status: 500 }
      );
    }

    // Create a session token using the mock user data
    const token = sign(
      { 
        id: mockUser._id.toString(),
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role
      },
      process.env.NEXTAUTH_SECRET || 'fallingupsecret',
      { expiresIn: '1d' }
    );
    
    // Create a response with the session token in a cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: mockUser._id.toString(),
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role
      }
    });
    
    // Set the cookie on the response
    response.cookies.set({
      name: 'falling-upward-session',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'lax',
    });

    console.log(`Admin login API: Login successful for ${email}, role: ${mockUser.role}`);
    
    // Return the response with the cookie
    return response;
  } catch (error) {
    console.error('Admin login API error:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
