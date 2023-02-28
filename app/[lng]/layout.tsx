import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'

import { fallbackLng } from '@/app/i18n/settings'
import NavBar from '@/app/NavBar'
import ToastContainer from '@/app/notifications/toastContainer'
import type { ParsedUrlQuery } from 'querystring'
import type { PropsWithChildren } from 'react'
import LocaleSwitcher from './LocaleSwitcher'
import { getDictionary } from '../i18n/dictionaries'

// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

export default async function RootLayout({
  children,
  params
}: PropsWithChildren<{ params: ParsedUrlQuery }>) {
  const lng = String(params.lng || fallbackLng)
  const dict = await getDictionary(lng)
  return <html lang={lng} >
    <body className="overflow-y-scroll overflow-x-auto">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <header>
            <NavBar {...{ lng, dict }} />
          </header>
          <main>
            {children}
          </main>
          <footer className='mt-3'>
            <LocaleSwitcher label={dict.localeSwitcher} />
          </footer>
          <ToastContainer />
        </div>
      </div>
    </body>
  </html >
}
