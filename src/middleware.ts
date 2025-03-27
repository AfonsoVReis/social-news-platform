import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { routes } from './constants/routes';
import { isAdminRoute, isProtectedRoute } from './utils/routes';
import { isAdmin } from './utils/users';
import type { NextRequest } from 'next/server';

const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();
  const session = request.cookies.get('appSession');

  const authSession = await getSession(request, response);

  if (isProtectedRoute(pathname) && !session) {
    return NextResponse.redirect(new URL(routes.home, request.url));
  }

  if (pathname === routes.home && session) {
    return NextResponse.redirect(new URL(routes.feed, request.url));
  }

  if (isAdminRoute(pathname) && !isAdmin(authSession?.user)) {
    return NextResponse.redirect(new URL(routes.feed, request.url));
  }

  return NextResponse.next();
};

export default middleware;
