import '@/styles/globals.scss'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { fallbackLng } from '@/app/i18n/settings'
import NavBar from '@/app/navBar/NavBar'
import type { ParsedUrlQuery } from 'querystring'
import type { PropsWithChildren } from 'react'
import LocaleSwitcher from '@/app/i18n/LocaleSwitcher'
import { getDictionary } from '@/app/i18n/dictionaries'
import Container from '@/app/useClient/Container'
import ToastContainer from '@/app/useClient/ToastContainer'

// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
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
  return <html lang={lng} >
    <body>
      <Container maxWidth="lg">
        <header>
          <NavBar {...{ lng, dict }} />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <LocaleSwitcher lng={lng} label={dict.localeSwitcher} />
        </footer>
      </Container>
      <ToastContainer />
    </body>
  </html >
}
