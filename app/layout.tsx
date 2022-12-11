import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'
// import 'react-widgets/scss/styles.scss'

import NavBar from '@/navBar/NavBar'
import NavBarPlaceholder from '@/navBar/placeholders/NavBar'
import ToastContainer from '@/notifications/toastContainer'
import { ReactNode, Suspense } from 'react'

export default function RootLayout({
  children
}: { children: ReactNode }) {
  return <html>
    <body>
      <div className="bg-light border mt-2 container-sm">
        <header>
          <Suspense fallback={<NavBarPlaceholder />}>
            <NavBar />
          </Suspense>
        </header>
        <main>
          {children}
        </main>
      </div>
      <ToastContainer />
    </body>
  </html>
}
