import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages } from '@/app/i18n/settings'
import { verifyAccessToken } from '@/services/jwt'
import { Unauthorized } from 'http-errors'

acceptLanguage.languages(languages)

export const config = {
  matcher: '/:lng*'
}

const cookieName = 'i18next'

export async function middleware({
  cookies,
  headers,
  nextUrl: {
    pathname
  },
  url
}: NextRequest) {

  if (pathname.startsWith('/api')) {
    if (!headers.has('Authorization')) {
      return NextResponse.next(Unauthorized('Access token is required'))
    }
    const token = headers.get('Authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.next(Unauthorized())
    }
    await verifyAccessToken(token)
      .then((user) => {
        // req.user = user
        // NextResponse.next()
      })
      .catch(({ message }) => NextResponse.next(Unauthorized(message)))
  }

  let lng
  if (cookies.has(cookieName)) {
    lng = acceptLanguage.get(cookies.get(cookieName)?.value)
  }
  if (!lng) lng = acceptLanguage.get(headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => pathname.startsWith(`/${loc}`)) &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, url))
  }

  if (headers.has('referer')) {
    const refererUrl = new URL(String(headers.get('referer')))
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}



// const auth = async (req, res, next) => {
//     if (!req.headers.authorization) {
//         return next(Unauthorized('Access token is required'))
//     }
//     const token = req.headers.authorization.split(' ')[1]
//     if (!token) {
//         return next(Unauthorized())
//     }
//     await verifyAccessToken(token).then(user => {
//         req.user = user
//         next()
//     }).catch (e => {
//         next(Unauthorized(e.message))
//     })
// }
// module.exports = auth