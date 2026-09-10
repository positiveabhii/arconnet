import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'arcon_demo_session';

const getRole = (request) => {
  const role = request.cookies.get(SESSION_COOKIE)?.value;
  return role === 'user' || role === 'admin' ? role : null;
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const role = getRole(request);
  const isLoginRoute = pathname === '/' || pathname === '/login';
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  const isUserRoute = [
    '/home',
    '/windows',
    '/linux-passwordbased',
    '/user',
    '/user/faviourite',
    '/user/windows',
    '/user/windows/terminal',
    '/user/linux-passwordbased'
  ].includes(pathname);

  if (isLoginRoute) {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (role === 'user') {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if ((isAdminRoute || isUserRoute) && !role) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && role !== 'admin') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (isUserRoute && role !== 'user') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/admin/:path*',
    '/home',
    '/windows',
    '/linux-passwordbased',
    '/user/:path*'
  ]
};