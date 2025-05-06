import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

// Simple login API endpoint
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { email, password } = await request.json();
    console.log(`Login API: Attempting login for ${email}`);
    
    // Validate the input
    if (!email || !password) {
      console.log('Login API: Missing email or password');
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }
    
    // Find the user in our mock database
    const user = mockDb.users.findByEmail(email);
    
    if (!user) {
      console.log(`Login API: User not found for email: ${email}`);
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }
    
    // In a real app, you would verify the password here
    // For this demo, we're allowing any password
    
    // Determine which page to redirect to based on user role
    const redirectUrl = user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
    
    // Store basic user info in the session cookie
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    // Create a simple session value (JSON string of user data)
    const sessionValue = JSON.stringify(userData);
    
    // Create a response with the session cookie
    const response = NextResponse.json({
      success: true,
      redirectUrl: redirectUrl,
      user: userData
    });
    
    // Set a simple cookie with user data - not httpOnly so client JS can read it
    response.cookies.set({
      name: 'user-session',
      value: sessionValue,
      httpOnly: false, // Set to false so it can be accessed by client-side JavaScript
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    
    console.log(`Login successful for ${email}, redirecting to ${redirectUrl}`);
    return response;
    
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
