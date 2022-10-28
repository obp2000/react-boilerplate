import Link from 'next/link'
import { FC } from 'react'
import type { MainMenuItem } from '../../interfaces/commonConsts'
import { useMainMenuItemClassName } from './hooks'

const NavLink: FC<MainMenuItem> = ({ path, label, }) => <Link
  href={path}
  className={useMainMenuItemClassName(path)}>
  {label}
</Link>

export default NavLink
