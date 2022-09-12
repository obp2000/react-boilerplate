import React from 'react'
import { NavItem } from 'reactstrap'
import NavLink from './NavLink'
import { useOptionsOuery } from '../options/hooks'
import { CommonConsts, MainMenuItem } from '../../../interfaces'

type Props = {
  indexUrl: string
  commonConsts?: CommonConsts
}

const MainMenu = ({ indexUrl, commonConsts }: Props): JSX.Element => {
  // const { commonConsts } = useOptionsOuery(indexUrl)
  // console.log('commonConsts ', commonConsts)
  return <>
    {commonConsts?.main_menu.map((mainMenuItem: MainMenuItem, key: number) =>
      <NavItem key={key}>
        <NavLink {...mainMenuItem} />
      </NavItem>)}
  </>
}

export default MainMenu
