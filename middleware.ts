import { fallbackLng, languages as locales } from '@/app/i18n/settings'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { type NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"

export const config = {
  matcher: [
    // '/((?!_next/static|_next/image|favicon.ico|blank.png).*)',
    '/',
    '/:lng/customers/:path*',
    '/customers/:path*',
    '/:lng/products/:path*',
    '/products/:path*',
    '/:lng/orders/:path*',
    '/orders/:path*',
    '/user',
    '/api/:lng/customers/:path',
    '/api/:lng/products/:path',
    '/api/:lng/orders/:path',
    '/api/cities/:path',
  ],
}

function apiPath(pathname: string) {
  return pathname.startsWith('/api')
}

function protectedPath(pathname: string) {
  return apiPath(pathname) ||
    pathname.match(/\/(customers|products|orders)\/(\d+|new)/)
}

async function checkProtectedPath(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  if (!session && protectedPath(pathname)) {
    throw new Error('Unauthorized')
  } 
}

function pathnameIsMissingLocale(pathname: string) {
  return locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) &&
      pathname !== `/${locale}`
  )
}

function getLocale({ headers }: NextRequest) {
  // console.log('headers ', headers)
  const languages = new Negotiator({
    headers:
      { 'accept-language': String(headers.get('accept-language')) }
  }).languages()
  const locale = match(languages, locales, fallbackLng)
  // console.log('locale ', locale)
  return locale
}

export default async function middleware(req: NextRequest) {
  checkProtectedPath(req)
  const pathname = req.nextUrl.pathname
  if (!apiPath(pathname) && pathnameIsMissingLocale(pathname)) {
    const redirectUrl = new URL(`/${getLocale(req)}${pathname}`, req.url)
    // console.log('redir ', String(redirectUrl))
    return NextResponse.redirect(redirectUrl)
  }
  return NextResponse.next()
}


// export async function middleware11(req: NextRequest) {
//   // Get the pathname of the request (e.g. /, /protected)
//   const path = req.nextUrl.pathname;

//   // If it's the root path, just render it
//   if (path === "/") {
//     return NextResponse.next();
//   }

//   const session = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   if (!session && path === "/protected") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   } else if (session && (path === "/login" || path === "/register")) {
//     return NextResponse.redirect(new URL("/protected", req.url));
//   }
//   return NextResponse.next();
// }

  // if (pathname.startsWith('/api') ||
  //     pathname.match(/\/(customers|products|orders)\/(\d+|new)/)) {
  //   withAuth(
  //     // `withAuth` augments your `Request` with the user's token.
  //     function middleware(req) {
  //       // console.log(req.nextauth.token)
  //       return NextResponse.next(req)
  //     },
  //     {
  //       callbacks: {
  //         authorized: ({ token }) => !!token,
  //       },
  //     }
  //   )
  //   return NextResponse.next(Unauthorized())

    // if (!request.headers.has('authorization')) {
    //   return NextResponse.next(Unauthorized('Access token is required'))
    // }
    // const token = request.headers.get('authorization')?.split(' ')[1]
    // if (!token) {
    //   return NextResponse.next(Unauthorized())
    // }
    // // console.log('ver')
    // await verifyAccessToken(token, String(accessTokenSecret))
    //   .then((user) => {
    //     // req.user = user
    //     // NextResponse.next()
    //   })
    //   .catch(({ message }) => NextResponse.next(Unauthorized(message)))
