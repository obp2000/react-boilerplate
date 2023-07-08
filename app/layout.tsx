// import '@/app/globals.css'
import './globals.css'

import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
// import '@/scripts/wdyr'

const name = "Best&C"

export const metadata = {
  title: name,
  description: `Site of ${name}`,
}

// export async function generateStaticParams() {
//   return [{ lng: 'en' }, { lng: 'ru' }]
// }

export default function RootLayout({ children,
}: { children: ReactNode }) {
  return <html lang='en'>
    <body>
      {children}
      <div>
        <Toaster position="bottom-left" />
      </div>
    </body>
  </html >
}
