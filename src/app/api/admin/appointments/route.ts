import { NextRequest, NextResponse } from 'next/server';
import { mockDb, AppointmentModel } from '@/lib/mockDb';
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

// GET: Get all appointments (admin only)
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAccess(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }
    
    // Get all appointments from mock database
    const appointments = await AppointmentModel.findAll();
    
    return NextResponse.json({ 
      success: true, 
      appointments 
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Create a new appointment (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAccess(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: 401 }
      );
    }
    
    const { userId, userName, userEmail, date, time, consultationType } = await request.json();
    
    // Validate required fields
    if (!userId || !userName || !userEmail || !date || !time || !consultationType) {
      return NextResponse.json(
        { success: false, message: 'All appointment fields are required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const userExists = mockDb.users.data.some((u: { _id: string | { toString(): string } }) => u._id.toString() === userId);
    if (!userExists) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create new appointment
    const newAppointment = await AppointmentModel.create({
      userId,
      userName,
      userEmail,
      date,
      time,
      consultationType,
      status: 'pending',
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Appointment created successfully',
        appointment: newAppointment
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
