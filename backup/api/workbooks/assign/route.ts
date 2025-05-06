import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import Workbook from "@/models/Workbook";
import { WorkbookModel } from "@/lib/mockDb";
import { authOptions } from "@/lib/auth";

// Assign a workbook to a user (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Only admins can assign workbooks
    if (session.user.role !== 'admin') {
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

    await connectDB();
    
    // Check if we're using the mock database
    const isUsingMockDb = process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI;
    
    let updatedWorkbook;
    
    if (isUsingMockDb) {
      // For mock database
      updatedWorkbook = await WorkbookModel.assignToUser(workbookId, userId);
      
      if (!updatedWorkbook) {
        return NextResponse.json(
          { message: "Workbook not found" },
          { status: 404 }
        );
      }
    } else {
      // For real database
      updatedWorkbook = await Workbook.findByIdAndUpdate(
        workbookId,
        { 
          assignedTo: userId,
          status: 'assigned'
        },
        { new: true }
      );
      
      if (!updatedWorkbook) {
        return NextResponse.json(
          { message: "Workbook not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({ 
      message: "Workbook assigned successfully",
      workbook: updatedWorkbook 
    }, { status: 200 });
  } catch (error) {
    console.error("Error assigning workbook:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
