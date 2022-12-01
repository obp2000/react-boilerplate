// 'use client'

import type { MainMenuItem } from '@/interfaces/commonConsts'
import Link from 'next/link'
// import { useMainMenuItemClassName } from './hooks'
import { activeNavLink } from './helpers'

export default function NavLink({ path, label, indexUrl }: MainMenuItem) {
  return <Link
    href={path}
    // prefetch={false}
    // shallow={true}
    // className={useMainMenuItemClassName(path)}
    className={`nav-link${activeNavLink(path, indexUrl) ? ' active' : ''}`}
    >
    {label}
  </Link>
}
