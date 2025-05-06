import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { mockDb } from "@/lib/mockDb";
import { cookies } from "next/headers";

// Get all appointments for the logged-in user or all appointments for admin
export async function GET(request: NextRequest) {
  try {
    console.log('Appointments API - Checking authentication');
    
    // Get the session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      console.log('Appointments API - No session cookie found');
      return NextResponse.json(
        { message: "Unauthorized - No session cookie" },
        { status: 401 }
      );
    }
    
    // Verify the JWT token
    let decoded;
    try {
      decoded = verify(
        sessionCookie.value, 
        process.env.NEXTAUTH_SECRET || 'fallingupsecret'
      );
    } catch (error) {
      console.error('Appointments API - Invalid session token:', error);
      return NextResponse.json(
        { message: "Unauthorized - Invalid session" },
        { status: 401 }
      );
    }
    
    // Get user data from decoded token
    const userId = (decoded as any).id;
    const userRole = (decoded as any).role;
    
    console.log(`Appointments API - User authenticated: ID=${userId}, Role=${userRole}`);
    
    // Get appointments from mock database
    let appointments = mockDb.appointments.data;
    
    // If not admin, filter appointments for the specific user
    if (userRole !== 'admin') {
      appointments = appointments.filter((appointment: any) => 
        appointment.userId === userId
      );
    }
    
    console.log(`Appointments API - Returning ${appointments.length} appointments`);
    

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Create a new appointment
export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, date, time, consultationType, message } = await request.json();

    // Validate input
    if (!name || !email || !phone || !date || !time || !consultationType) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    // Get the session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    
    let userId = null;
    
    if (sessionCookie) {
      try {
        const decoded = verify(
          sessionCookie.value, 
          process.env.NEXTAUTH_SECRET || 'fallingupsecret'
        );
        userId = (decoded as any).id;
      } catch (error) {
        console.error('Invalid session when booking appointment:', error);
      }
    }

    // Create new appointment in mock database
    const newAppointment = {
      _id: (mockDb.appointments.data.length + 1).toString(),
      userId,
      userName: name, // Add userName to match MockAppointment interface
      userEmail: email, // Add userEmail to match MockAppointment interface
      date,
      time,
      consultationType,
      status: 'pending',
      message: message || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    mockDb.appointments.data.push(newAppointment);

    return NextResponse.json(
      { message: "Appointment booked successfully", appointment: newAppointment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
