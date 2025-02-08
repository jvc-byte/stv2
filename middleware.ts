// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME || "jwt";

// Add your public paths here
const publicPaths = new Set([
  '/',
  '/about',
  '/api/auth/login',
  '/api/auth/logout',
])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public paths
  if (publicPaths.has(pathname)) {
    return NextResponse.next()
  }

  // Check for JWT token
  const token = request.cookies.get(JWT_COOKIE_NAME)

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    // Add other protected path patterns
  ],
}