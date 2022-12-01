import 'server-only'

import NavItem from '@/client/NavItem'
import type { CommonConstsType, MainMenuItem } from '@/interfaces/commonConsts'
// import { getAuth } from '@/services/api/server'
import NavLink from './NavLink'
import { IndexUrl } from '@/interfaces/index'

export default async function MainMenu({
  indexUrl,
  mainMenu
  // commonConsts,
}: IndexUrl & CommonConstsType & { mainMenu: MainMenuItem[] }) {
  // const { isAuthenticated } = getAuth()
  // let menu = commonConsts?.main_menu || []
  // if (isAuthenticated) {
  //   menu.push(commonConsts?.user_menu_item as MainMenuItem)
  // }
  return <>
    {mainMenu.map((mainMenuItem, key) => <NavItem key={key}>
      <NavLink {...{ ...mainMenuItem, indexUrl }} />
    </NavItem>)}
  </>
}
