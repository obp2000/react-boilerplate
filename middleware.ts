import { fallbackLng, languages as locales } from '@/app/i18n/settings'
import { verifyAccessToken } from '@/services/jwt'
import { match } from '@formatjs/intl-localematcher'
import { Unauthorized } from 'http-errors'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

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
    if (!request.headers.has('authorization')) {
      return NextResponse.next(Unauthorized('Access token is required'))
    }
    const token = request.headers.get('authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.next(Unauthorized())
    }
    // console.log('ver')
    await verifyAccessToken(token, String(accessTokenSecret))
      .then((user) => {
        // req.user = user
        // NextResponse.next()
      })
      .catch(({ message }) => NextResponse.next(Unauthorized(message)))
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
