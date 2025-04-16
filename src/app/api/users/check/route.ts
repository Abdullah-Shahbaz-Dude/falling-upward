import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { mockDb } from '@/lib/mockDb';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Check if we're using the mock database
    const isUsingMockDb = process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI;
    
    let user;
    
    if (isUsingMockDb) {
      // Use mock database
      user = mockDb.users.findByEmail(email);
    } else {
      // Use real database
      // Handle MongoDB query differently to avoid TypeScript error
      const userDoc = await User.findOne({ email });
      user = userDoc ? { name: userDoc.name, role: userDoc.role } : null;
    }
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Return only necessary information
    return NextResponse.json({
      name: user.name,
      role: user.role
    });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
