import Link from 'next/link'
import type { MainMenuItem } from '../../../interfaces/commonConsts'
import { useMainMenuItemClassName } from './hooks'

const NavLink = ({ path, label, }: MainMenuItem) => <Link href={path}>
  <a className={useMainMenuItemClassName(path)}>
    {label}
  </a>
</Link>

export default NavLink
