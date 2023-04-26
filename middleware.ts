import { fallbackLng, languages as locales } from '@/app/i18n/settings'
import { match } from '@formatjs/intl-localematcher'
import { Unauthorized } from 'http-errors'
import Negotiator from 'negotiator'
import { type NextRequest, NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware"
// import getUser from '@/services/getUser'

// import { getIronSession } from "iron-session/edge"
// import { ironConfig } from "@/services/ironConfig"

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|blank.png).*)',
  ],
}

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Negotiator.Headers = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return match(languages, locales, fallbackLng)
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (pathname.startsWith('/api')) {
    withAuth(
      // `withAuth` augments your `Request` with the user's token.
      function middleware(req) {
        console.log(req.nextauth.token)
        return NextResponse.next(req)
      },
      {
        callbacks: {
          authorized: ({ token }) => !!token,
        },
      }
    )
    return NextResponse.next(Unauthorized())

    // const res = NextResponse.next()
    // const { user } = await getIronSession(request, res, ironConfig)

    // const user = await getUser()
    // if (!user) {
    //   return NextResponse.next(Unauthorized())
    // }

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
  } else {
    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request)
      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      return NextResponse.redirect(
        new URL(`/${locale}/${pathname}`, request.url)
      )
    }
  }
}
