import { auth } from '@/auth';
import { NextAuthRequest } from 'next-auth';
import { NextResponse } from 'next/server';
import { routerPermission } from './lib/router-permission';

const hasPermission = (
  p: string | string[] | undefined,
  permissions: string[]
) => {
  if (!p) return false;
  if (Array.isArray(p)) {
    return p.some((permission) => permissions.includes(permission));
  }
  return permissions.includes(p);
};

export default auth((req: NextAuthRequest, ctx) => {
  const token = req.auth;
  const { pathname, origin, searchParams } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login'];

  if (publicRoutes.includes(pathname)) {
    if (token) {
      const callbackUrl = searchParams.get('callbackUrl') || origin;
      return NextResponse.redirect(callbackUrl);
    }
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    const signInUrl = new URL('/auth/login', origin);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // if the permissions not match with token then redirect to unauthorize page
  const route = routerPermission.find(
    ({ url }: RoutePermission) => url === pathname
  );

  if (route !== undefined) {
    if (route?.global) return NextResponse.next();

    const isAllowed = hasPermission(route.permission, token?.user.permissions);
    if (!isAllowed) {
      const notFound = new URL('/not-found', origin);
      return NextResponse.rewrite(notFound);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
