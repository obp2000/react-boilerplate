import { fallbackLng, languages as locales } from '@/app/i18n/settings'
import { verifyAccessToken } from '@/services/jwt'
import { match } from '@formatjs/intl-localematcher'
import { Unauthorized } from 'http-errors'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

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
    await verifyAccessToken(token)
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


  // let headers = { 'Accept-Language': String(request.headers.get('Accept-Language')) }
  // console.log('headers ', headers)
  // let languages = new Negotiator({ headers }).languages(locales)
  // console.log('languages ', languages, locales, fallbackLng)

// acceptLanguage.languages(languages)

// export const config = {
//   matcher: '/:lng*'
// }

// const cookieName = 'i18next'

// export async function middleware1({
//   cookies,
//   headers,
//   nextUrl: {
//     pathname
//   },
//   url
// }: NextRequest) {

//   if (pathname.startsWith('/api')) {
//     if (!headers.has('authorization')) {
//       return NextResponse.next(Unauthorized('Access token is required'))
//     }
//     const token = headers.get('authorization')?.split(' ')[1]
//     if (!token) {
//       return NextResponse.next(Unauthorized())
//     }
//     // try {
//     //   verifyAccessToken(token)
//     // } catch (e) {
//     //   return NextResponse.next(Unauthorized((e as HttpError).message))
//     // }
//     await verifyAccessToken(token)
//       .then((user) => {
//         // req.user = user
//         // NextResponse.next()
//       })
//       .catch(({ message }) => NextResponse.next(Unauthorized(message)))
//   }

//   let lng
//   if (cookies.has(cookieName)) {
//     lng = acceptLanguage.get(cookies.get(cookieName)?.value)
//   }
//   if (!lng) lng = acceptLanguage.get(headers.get('Accept-Language'))
//   if (!lng) lng = fallbackLng

//   // Redirect if lng in path is not supported
//   if (
//     !languages.some(loc => pathname.startsWith(`/${loc}`)) &&
//     !pathname.startsWith('/_next') &&
//     !pathname.startsWith('/api')
//   ) {
//     return NextResponse.redirect(new URL(`/${lng}${pathname}`, url))
//   }

//   if (headers.has('referer')) {
//     const refererUrl = new URL(String(headers.get('referer')))
//     const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
//     const response = NextResponse.next()
//     if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
//     return response
//   }

//   return NextResponse.next()
// }
