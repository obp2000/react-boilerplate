import '@/styles/globals.css'

import { fallbackLng } from '@/app/i18n/settings'
import type { ReactNode } from 'react'
import {
	getDictionary
} from '@/app/i18n/dictionaries'
import { Toaster } from 'react-hot-toast'
import NavBar from './_components/NavBar'
import LocaleSwitcher from './_components/LocaleSwitcher'

const name = "Best&C"

export const metadata = {
  title: name,
  description: `Site of ${name}`,
}

// export async function generateStaticParams() {
//   return [{ lng: 'en' }, { lng: 'ru' }]
// }

export default async function RootLayout({
  params: {
    lng = fallbackLng
  },
  authButton,
  userButton,
  confirm,
  children,
}: {
  params: { lng: string }
  authButton: ReactNode
  userButton: ReactNode
  confirm: ReactNode
  children: ReactNode
}) {
  console.log('RootLayout', lng)
  const dict = await getDictionary(lng)
  return <html lang={lng}>
    <body>
      <div className='container'>
        <NavBar {...{ lng, userButton, authButton }} />
        <main>
          {confirm}
          {children}
        </main>
        <footer>
          <LocaleSwitcher {...{ lng, label: dict.localeSwitcher }} />
        </footer>
      </div>
      <div>
        <Toaster position="bottom-left" />
      </div>
    </body>
  </html >
}
