import React from 'react'
import Link from 'next/link'
import { useMainMenuItemClassName } from './hooks'
import type { MainMenuItem } from '../../../interfaces'

const NavLink = ({ path, label, }: MainMenuItem) => <Link href={path} >
  <a className={useMainMenuItemClassName(path)}>
    {label}
  </a>
</Link>

export default NavLink
