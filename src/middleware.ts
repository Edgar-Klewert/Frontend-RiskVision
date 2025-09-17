import { NextRequest, NextResponse } from 'next/server';
import { NEED_AUTH, NO_AUTH, PAGES } from '@/enums/pages.enum';

const AUTH_COOKIE_NAME = 'access_token';

const needAuthRoutes = Object.values(NEED_AUTH);
const noAuthRoutes = Object.values(NO_AUTH);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(token);

  // Se está tentando acessar uma rota que exige autenticação
  if (needAuthRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = PAGES.LOGIN;
      return NextResponse.redirect(loginUrl);
    }
  }

  // Se está tentando acessar uma rota pública estando autenticado
  if (noAuthRoutes.some((route) => pathname === route)) {
    if (isAuthenticated) {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = PAGES.HOME;
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protege tudo, exceto rotas do Next, estáticos e fontes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.css$|.*\\.js$|.*\\.svg$|.*\\.png$|.*\\.jpg$|lib/fonts).*)',
  ],
};
