import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

// Simple test endpoint to check if the API is working
export async function GET() {
  try {
    // Return some basic data to verify the API is working
    return NextResponse.json({
      success: true,
      message: 'API is working correctly',
      timestamp: new Date().toISOString(),
      data: {
        users: mockDb.users.data.length,
        workbooks: mockDb.workbooks?.data?.length || 0,
        appointments: mockDb.appointments.data.length,
        mockDbStructure: {
          hasWorkbooks: !!mockDb.workbooks,
          hasAppointments: !!mockDb.appointments,
          keys: Object.keys(mockDb)
        },
        sample: {
          user: mockDb.users.data[4] || null, // The "one" user
          appointment: mockDb.appointments.data[0] || null
        }
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({
      success: false,
      message: 'API test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
