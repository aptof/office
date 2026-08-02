import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { routes } from './helpers/routes';

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL(routes.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Specify the routes the middleware applies to
};
