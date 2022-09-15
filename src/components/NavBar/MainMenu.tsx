import React from 'react'
import { NavItem } from 'reactstrap'
import NavLink from './NavLink'
import { useOptionsOuery } from '../options/hooks'
import { MainMenuItem } from '../../../interfaces'

type Props = {
  indexUrl: string
}

const MainMenu = ({ indexUrl }: Props): JSX.Element => {
  const { commonConsts } = useOptionsOuery(indexUrl)
  return <>
    {commonConsts?.main_menu.map((mainMenuItem: MainMenuItem, key: number) =>
      <NavItem key={key}>
        <NavLink {...mainMenuItem} />
      </NavItem>)}
  </>
}

export default MainMenu
