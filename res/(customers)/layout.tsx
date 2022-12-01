// import { indexUrl } from '@/app/customers/serverConfig'
import type { AsyncLayoutType } from '@/interfaces/layout'
import NavBar from '@/navBar/NavBar'
import { preloadOptions } from '@/services/api/server'

const Layout: AsyncLayoutType = async ({ children }) => {
  // preloadOptions(indexUrl)
  return <>
    <header>
      <NavBar {...{ indexUrl: '/' }} />
    </header>
    <main>
      {children}
    </main>
  </>
}

export default Layout
