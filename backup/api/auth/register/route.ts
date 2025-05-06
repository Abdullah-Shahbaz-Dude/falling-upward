import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    console.log(`Registration API: Attempting to register user ${name} with email ${email}`);

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if user already exists in mock DB
    const existingUser = mockDb.users.data.find((u: { email: string }) => u.email === email);
    if (existingUser) {
      console.log(`Registration API: User with email ${email} already exists`);
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Generate a simple ID for the new user
    const newUserId = (mockDb.users.data.length + 1).toString();
    
    // Create new user (always as a regular user)
    const newUser = {
      _id: newUserId,
      name,
      email,
      password: 'password123', // For simplicity, we'll use a fixed password
      role: 'user' as 'user', // All new users are regular users, with proper type
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add the user to the mock database
    mockDb.users.data.push(newUser);
    
    console.log(`Registration API: User registered successfully with ID ${newUserId}`);
    return NextResponse.json(
      { success: true, message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
