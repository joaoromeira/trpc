import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@root/server/auth';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await auth();

  if (session && path === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  if (!session && path !== '/') {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
