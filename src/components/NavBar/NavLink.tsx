import React from 'react'
import Link from 'next/link'
import { useMainMenuItemClassName } from './hooks'
import { MainMenuItem } from '../../../interfaces'

const NavLink = ({ path, label, }: MainMenuItem) => <Link
  href={path} shallow={true}>
  <a className={useMainMenuItemClassName(path)}>
    {label}
  </a>
</Link>

export default NavLink
