import MainContainer from '@/app/mainContainer'
import type { AsyncLayoutType } from '@/interfaces/layout'
import { mainContext } from '@/services/api/server'
import { indexUrl } from '@/users/serverConfig'

const Layout: AsyncLayoutType = async ({ children }) => {
  // console.log('rest ', rest)
  return <MainContainer mainContext={await mainContext(indexUrl)}>
    {children}
  </MainContainer>
}

export default Layout
