import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { mockDb } from "@/lib/mockDb";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();
    
    // Check if we're using the mock database
    const isUsingMockDb = process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI;
    
    let existingUser;
    let user;
    
    if (isUsingMockDb) {
      // For mock database
      existingUser = mockDb.users.findByEmail(email);
      
      if (existingUser) {
        return NextResponse.json(
          { message: "User with this email already exists" },
          { status: 400 }
        );
      }
      
      // Create new user in mock database
      user = mockDb.users.create({
        name,
        email,
        password, // In mock DB we don't need to hash the password
        role: 'user', // Default role is user
      });
    } else {
      // For real database
      // Check if user already exists
      existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return NextResponse.json(
          { message: "User with this email already exists" },
          { status: 400 }
        );
      }
      
      // Create new user in real database
      user = await User.create({
        name,
        email,
        password, // Password will be hashed by the User model pre-save hook
      });
    }

    // Return success response without password
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
