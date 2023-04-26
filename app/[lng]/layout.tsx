import '@/styles/globals.css'

import { fallbackLng } from '@/app/i18n/settings'
import NavBar from '@/app/components/navBar/NavBar'
import type { ParsedUrlQuery } from 'querystring'
import type { PropsWithChildren } from 'react'
import LocaleSwitcher from '@/app/components/LocaleSwitcher'
import { getDictionary } from '@/app/i18n/dictionaries'
import Container from '@/app/useClient/Container'
import getUser from '@/services/getUser'
import Toaster from '@/app/useClient/Toaster'
// import ToastContainer from '@/app/useClient/ToastContainer'

// export async function generateStaticParams() {
//   // return languages.map((lng) => ({ lng }))
//   return [{ lng: 'ru', table: 'customers' }]
// }

const name = "Best&C"

export const metadata = {
  title: name,
}

export default async function RootLayout({
  children,
  params
}: PropsWithChildren<{ params: ParsedUrlQuery }>) {
  const lng = String(params.lng || fallbackLng)
  const dict = await getDictionary(lng)
  const user = await getUser()
  return <html lang={lng} >
    <body>
      <Container>
        <header>
          <NavBar {...{ lng, dict, user }} />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <LocaleSwitcher label={dict.localeSwitcher} />
        </footer>
      </Container>
      <div>
        <Toaster position="bottom-left" />
      </div>
      {/*<ToastContainer />*/}
    </body>
  </html >
}
