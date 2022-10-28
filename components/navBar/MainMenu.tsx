import { FC, useContext } from 'react'
import { NavItem } from 'reactstrap'
import type { MainMenuItem } from '../../interfaces/commonConsts'
import { OptionsContext } from '../layout/Layout'
import NavLink from './NavLink'

const MainMenu: FC = () => {
  const { commonConsts } = useContext(OptionsContext)
  return <>
    {commonConsts?.main_menu.map((
      mainMenuItem: MainMenuItem,
      key: number) => <NavItem key={key}>
        <NavLink {...mainMenuItem} />
      </NavItem>)}
  </>
}

export default MainMenu
