import { indexUrl } from '@/products/serverConfig'
import type { AsyncLayoutType } from '@/interfaces/layout'
import { mainContext } from '@/services/api/server'
import { MainProvider } from '@/services/context'
import NavBar from '@/navBar/NavBar'

const Layout: AsyncLayoutType = async ({ children }) => {
  const optionsData = await mainContext(indexUrl)
  return <>
    <header>
      <NavBar />
    </header>
    <main>
      <MainProvider {...optionsData}>
        {children}
      </MainProvider>
    </main>
  </>
}

export default Layout

