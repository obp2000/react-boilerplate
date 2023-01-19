import '@/styles/globals.scss'
// import 'react-toastify/dist/ReactToastify.min.css'

import ToastContainer from '@/notifications/toastContainer'
import NavBar from '@/app/NavBar'
import { Footer } from '@/app/Footer'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { PropsWithChildren } from 'react'
import { useTranslation } from '@/app/i18n'
import { fallbackLng } from '@/app/i18n/settings'

// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }

export default async function RootLayout({
  children,
  params: {
    lng = fallbackLng,
  }
}: PropsWithChildren<Params>) {
  const { t } = await useTranslation(lng)
  return <html lang={lng} >
    <body className="overflow-y-scroll overflow-x-auto">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
        <header>
          <NavBar {...{ lng, t }} />
        </header>
        <main>
          {children}
        </main>
        <footer className='mt-3'>
          <Footer {...{ lng, t }} />
        </footer>
        <ToastContainer />
        </div>
      </div>
    </body>
  </html >
}
