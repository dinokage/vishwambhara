import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the request is to the inquire API
  if (path === '/api/inquire' && request.method === 'POST') {
    // Get the referer header
    const referer = request.headers.get('referer') || '';
    const host = request.headers.get('host') || '';
    
    // Block if no referer is provided (direct API access)
    if (!referer) {
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          message: 'Direct API access is not allowed' 
        }),
        { 
          status: 403,
          headers: { 'content-type': 'application/json' }
        }
      );
    }
    
    // Only allow requests from our own website
    const refererHost = new URL(referer).host;
    if (refererHost !== host && !isLocalhost(refererHost) && !isLocalhost(host)) {
      console.warn(`Blocked cross-origin request from ${refererHost} to ${host}`);
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          message: 'Cross-origin requests are not allowed' 
        }),
        { 
          status: 403,
          headers: { 'content-type': 'application/json' }
        }
      );
    }
  }

  // For non-API routes or if the checks pass, continue with the request
  return NextResponse.next();
}

// Helper to check if host is localhost (for development)
function isLocalhost(host: string): boolean {
  return host.includes('localhost') || host.includes('127.0.0.1');
}

// Only apply this middleware to API routes
export const config = {
  matcher: '/api/:path*',
};
