import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import Workbook from "@/models/Workbook";
import { authOptions } from "@/lib/auth";

// Get a specific workbook
export async function GET(
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

    await connectDB();
    
    const { id } = await context.params;
    const workbook = await Workbook.findById(id);
    
    if (!workbook) {
      return NextResponse.json(
        { message: "Workbook not found" },
        { status: 404 }
      );
    }

    // Check if user is authorized to view this workbook
    if (session.user.role !== 'admin' && 
        workbook.assignedTo.toString() !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({ workbook }, { status: 200 });
  } catch (error) {
    console.error("Error fetching workbook:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Update a workbook
export async function PUT(
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

    await connectDB();
    
    const { id } = await context.params;
    const workbook = await Workbook.findById(id);
    
    if (!workbook) {
      return NextResponse.json(
        { message: "Workbook not found" },
        { status: 404 }
      );
    }

    const data = await request.json();

    // Admin can update any field
    if (session.user.role === 'admin') {
      // Admin can update all fields
      const updatedWorkbook = await Workbook.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      );
      
      return NextResponse.json(
        { message: "Workbook updated successfully", workbook: updatedWorkbook },
        { status: 200 }
      );
    } else {
      // Regular users can only update userResponse and status
      if (workbook.assignedTo.toString() !== session.user.id) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
      
      // Users can only update their response and set status to submitted
      const updatedWorkbook = await Workbook.findByIdAndUpdate(
        id,
        { 
          userResponse: data.userResponse,
          status: 'submitted'
        },
        { new: true, runValidators: true }
      );
      
      return NextResponse.json(
        { message: "Workbook submitted successfully", workbook: updatedWorkbook },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error updating workbook:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Delete a workbook (admin only)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    
    const { id } = await context.params;
    const workbook = await Workbook.findByIdAndDelete(id);
    
    if (!workbook) {
      return NextResponse.json(
        { message: "Workbook not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Workbook deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting workbook:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
