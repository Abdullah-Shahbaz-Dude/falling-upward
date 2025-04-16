import { NextRequest, NextResponse } from 'next/server';
import { AppointmentModel } from '@/lib/mockDb';
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

// GET: Get a specific appointment by ID (admin only)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAccess(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }
    
    const { id: appointmentId } = await context.params;
    
    // Get appointment from mock database
    const appointment = await AppointmentModel.findById(appointmentId);
    
    if (!appointment) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      appointment 
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH: Update an appointment status (admin only)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAccess(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }
    
    const { id: appointmentId } = await context.params;
    const { status } = await request.json();
    
    // Validate status
    if (!status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Check if appointment exists
    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    // Update appointment status
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Appointment status updated successfully',
      appointment: updatedAppointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE: Delete an appointment (admin only)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAccess(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }
    
    const { id: appointmentId } = await context.params;
    
    // Check if appointment exists
    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    // Delete appointment
    await AppointmentModel.findByIdAndDelete(appointmentId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
