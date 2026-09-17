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

  if (isLoginRoute) {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (role === 'user') {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
  }

  // Redirect root to /home if not explicitly going to login
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Fallback for random routes
  const isKnownRoute = validRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  if (!isKnownRoute) {
    return NextResponse.redirect(new URL('/home', request.url));
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