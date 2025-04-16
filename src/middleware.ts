import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname;
  
  // Check if the path is admin or dashboard related
  const isAdminPath = path.startsWith('/admin') && !path.startsWith('/admin/login');
  const isDashboardPath = path === '/dashboard';
  const isProtectedPath = isAdminPath || isDashboardPath;
  
  // If not a protected path, continue with the request
  if (!isProtectedPath) {
    return NextResponse.next();
  }
  
  // Check for the session cookie
  const sessionCookie = request.cookies.get('falling-upward-session');
  
  // If no session cookie, redirect to appropriate login page
  if (!sessionCookie) {
    if (isAdminPath) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  try {
    // Verify the token
    const decoded = verify(
      sessionCookie.value, 
      process.env.NEXTAUTH_SECRET || 'fallingupsecret'
    ) as { id: string; email: string; name: string; role: string };
    
    // Check if trying to access admin routes without admin role
    if (isAdminPath && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Continue with the request if authorized
    return NextResponse.next();
  } catch (err) {
    // Invalid token, redirect to login
    if (isAdminPath) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ['/admin/:path*', '/dashboard'],
};
