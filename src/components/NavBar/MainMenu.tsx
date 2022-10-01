import React from 'react'
import { NavItem } from 'reactstrap'
import NavLink from './NavLink'
import type { MainMenuItem, CommonConstsType } from '../../../interfaces'

const MainMenu = ({ commonConsts }: CommonConstsType): JSX.Element => <>
  {commonConsts?.main_menu.map((
    mainMenuItem: MainMenuItem,
    key: number) => <NavItem key={key}>
      <NavLink {...mainMenuItem} />
    </NavItem>)}
</>

export default MainMenu
