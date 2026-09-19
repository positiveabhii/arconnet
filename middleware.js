import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'arcon_demo_session';

const getRole = (request) => {
  const role = request.cookies.get(SESSION_COOKIE)?.value;
  return role === 'user' || role === 'admin' ? role : null;
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const role = getRole(request);
  const isLoginRoute = pathname === '/login';

  // Define valid routes to avoid redirect loops or breaking static assets
  const validRoutes = [
    '/',
    '/login',
    '/home',
    '/windows',
    '/linux-passwordbased',
    '/admin',
    '/user',
    '/admin/session-monitoring/log-view'
  ];

  const isStaticAsset = pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico';

  if (isStaticAsset) {
    return NextResponse.next();
  }

  if (isLoginRoute || pathname === '/') {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (role === 'user') {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
  }

  // If not logged in and trying to access any other route, redirect to root
  if (!role) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Fallback for random routes for logged in users
  const isKnownRoute = validRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  if (!isKnownRoute) {
    const dashboard = role === 'admin' ? '/admin' : '/home';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};