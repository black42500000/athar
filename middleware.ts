import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/admin/login' || pathname.startsWith('/admin/login/');
  const isApiRoute = pathname.startsWith('/api/');
  const isLogoutRoute = pathname === '/admin/api/logout';

  if (isLoginPage || isApiRoute || isLogoutRoute) {
    return NextResponse.next();
  }

  const adminAuth = request.cookies.get('admin_auth')?.value;
  if (adminAuth !== 'true') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
