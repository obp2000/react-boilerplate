import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-widgets/scss/styles.scss'

import { indexUrl } from '@/customers/serverConfig'
import type { AsyncLayoutType } from '@/interfaces/layout'
import { mainContext } from '@/services/api/server'
import HeaderContainer from './headerContainer'

const name = "Best&C"

const RootLayout: AsyncLayoutType = async ({ children }) => {
  return <html>
    <head>
      <title>{name}</title>
    </head>
    <body>
      <div className="bg-light border mt-2 bg-light border mt-2 container-sm">
        <header>
          <HeaderContainer {...(await mainContext(indexUrl))} />
        </header>
        <main>
          {children}
        </main>
      </div>
    </body>
  </html>
}

export default RootLayout
