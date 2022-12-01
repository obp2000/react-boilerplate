import '@/styles/globals.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-widgets/scss/styles.scss'

import ToastContainer from '@/notifications/toastContainer'
import { ReactNode } from 'react'
import NavBar from '@/navBar/NavBar'
import { preloadOptions } from '@/services/api/server'
import { indexUrl } from './customers/serverConfig'

export default async function RootLayout({ children }: { children: ReactNode }) {
  // preloadOptions(indexUrl)
  return <html>
    <body>
      <div className="bg-light border mt-2 container-sm">
{/*        <header>
          <NavBar />
        </header>
        <main>
          {children}
        </main>*/}
        {children}
      </div>
      <ToastContainer />
    </body>
  </html>
}
