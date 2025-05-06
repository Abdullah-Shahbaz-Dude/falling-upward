import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Console log helper for debugging
function logDebugInfo(message: string, data?: any) {
  console.log(`Verify API - ${message}`, data ? data : '');
}

// API endpoint to verify the current user's session and role
export async function GET(request: NextRequest) {
  try {
    logDebugInfo('Verifying session cookie');
    
    // Get the session cookie directly from the request headers
    const cookieHeader = request.headers.get('cookie') || '';
    logDebugInfo('Cookie header:', cookieHeader);
    
    // Parse the cookie header to find the session cookie
    const cookies = cookieHeader.split(';').reduce<Record<string, string>>((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    const sessionToken = cookies['session'];
    
    if (!sessionToken) {
      logDebugInfo('No session cookie found');
      return NextResponse.json(
        { authenticated: false, message: "No session found" },
        { status: 401 }
      );
    }
    
    logDebugInfo('Session cookie found');
    
    // Verify the token
    try {
      logDebugInfo('Decoding JWT token');
      const decoded = verify(
        sessionToken, 
        process.env.NEXTAUTH_SECRET || 'fallingupsecret'
      ) as { id: string; email: string; name: string; role: string };
      
      logDebugInfo(`Session verified for user: ${decoded.email}, role: ${decoded.role}`);
      
      // Return user info
      return NextResponse.json({
        authenticated: true,
        user: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role
        }
      });
    } catch (err) {
      console.error('Invalid or expired token:', err);
      return NextResponse.json(
        { authenticated: false, message: "Invalid session" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { authenticated: false, message: "Error verifying session" },
      { status: 500 }
    );
  }
}
