import type { MainMenuItem } from '@/interfaces/commonConsts'
import { MainContext } from '@/services/context'
import { FC, useContext } from 'react'
import { NavItem } from 'reactstrap'
import NavLink from './NavLink'

const MainMenu: FC = () => {
  const { commonConsts } = useContext(MainContext)
  return <>
    {commonConsts?.main_menu.map((
      mainMenuItem: MainMenuItem,
      key: number) => <NavItem key={key}>
                        <NavLink {...mainMenuItem} />
                      </NavItem>)}
  </>
}

export default MainMenu
