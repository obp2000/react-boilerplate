'use client'

import type { MainMenuItem } from '@/interfaces/commonConsts'
import Link from 'next/link'
import { useNavLink } from './hooks'

export default function NavLink(props: MainMenuItem) {
  return <Link {...useNavLink(props)} />
}
