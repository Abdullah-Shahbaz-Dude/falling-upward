import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { mockDb } from "@/lib/mockDb";
import { authOptions } from "@/lib/auth";

// Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Only admins can access this endpoint
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    await connectDB();
    
    // Check if we're using the mock database
    const isUsingMockDb = process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI;
    
    let users;
    
    if (isUsingMockDb) {
      // For mock database
      users = mockDb.users.getAll();
    } else {
      // For real database - exclude password field
      // Handle MongoDB query differently to avoid TypeScript error
      const userDocs = await User.find({});
      users = userDocs.map((user: { _id: string; name: string; email: string; role: string; createdAt: Date; updatedAt: Date }) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
