import { NextResponse, NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
 
  // Redirect to login page if not authenticated
    //   return NextResponse.redirect(new URL('/login', request.url))
    console.log("test middleware")

}
 
export const config = {
  matcher: '/dashboard/:path*',
}