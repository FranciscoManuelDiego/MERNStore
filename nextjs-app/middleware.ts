import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  
  // Protect routes that require authentication
  if (request.nextUrl.pathname.startsWith('/profile') || 
      request.nextUrl.pathname.startsWith('/cart')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/cart/:path*']
}

// Middleware in Next.js runs before a request is completed, allowing you to modify the response by rewriting, 
// redirecting, modifying headers, or setting cookies.