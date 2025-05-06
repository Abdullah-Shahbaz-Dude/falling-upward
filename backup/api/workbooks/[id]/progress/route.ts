import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import Workbook from "@/models/Workbook";
import { WorkbookModel } from "@/lib/mockDb";
import { authOptions } from "@/lib/auth";

// Save workbook progress
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { userResponse } = await request.json();

    if (!userResponse) {
      return NextResponse.json(
        { message: "Progress content is required" },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Check if we're using the mock database
    const isUsingMockDb = process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI;
    
    let workbook;
    
    if (isUsingMockDb) {
      // For mock database
      const { id } = await context.params;
      workbook = await WorkbookModel.findById(id);
      
      if (!workbook) {
        return NextResponse.json(
          { message: "Workbook not found" },
          { status: 404 }
        );
      }
      
      // Check if user is authorized to update this workbook
      if (session.user.role !== 'admin' && 
          workbook.assignedTo !== session.user.id) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
      
      // Update workbook
      workbook = await WorkbookModel.findByIdAndUpdate(id, {
        userResponse,
        status: workbook.status === 'assigned' ? 'in_progress' : workbook.status
      });
    } else {
      // For real database
      const { id } = await context.params;
      workbook = await Workbook.findById(id);
      
      if (!workbook) {
        return NextResponse.json(
          { message: "Workbook not found" },
          { status: 404 }
        );
      }
      
      // Check if user is authorized to update this workbook
      if (session.user.role !== 'admin' && 
          workbook.assignedTo.toString() !== session.user.id) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
      
      // Update workbook
      workbook = await Workbook.findByIdAndUpdate(
        id,
        {
          userResponse,
          status: workbook.status === 'assigned' ? 'in_progress' : workbook.status
        },
        { new: true }
      );
    }

    return NextResponse.json({ 
      message: "Progress saved successfully",
      workbook 
    }, { status: 200 });
  } catch (error) {
    console.error("Error saving workbook progress:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
