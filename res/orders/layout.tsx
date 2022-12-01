import { indexUrl } from '@/orders/serverConfig'
import type { AsyncLayoutType } from '@/interfaces/layout'
import { mainContext } from '@/services/api/server'
import { MainProvider } from '@/services/context'

const Layout: AsyncLayoutType = async ({ children }) => {
    const data = await mainContext(indexUrl)
    return <MainProvider {...data}>
        {children}
    </MainProvider>
}

export default Layout
