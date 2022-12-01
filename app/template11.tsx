import { indexUrl } from '@/app/customers/serverConfig'
import type { AsyncLayoutType } from '@/interfaces/layout'
import { mainContext } from '@/services/api/server'
// import { HeaderProvider } from '@/services/context'
import NavBar from '@/navBar/NavBar'
// import AuthModal from '@/auth/AuthModal'

const RootTemplate: AsyncLayoutType = async ({ children }) => {
    const data = await mainContext(indexUrl)
    // console.log('data ', data)
    return <>
        <header>
{/*            <HeaderProvider {...data}>
                <NavBar />
            </HeaderProvider>*/}
        </header>
        <main>
            {children}
        </main>
    </>
}

export default RootTemplate