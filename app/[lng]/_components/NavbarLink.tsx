'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { isActiveLink } from './navBarLib'

export default function NavbarLink({
  lng,
  path,
  label,
}: {
  lng: string
  path: string
  label: string
}) {
  const href = `/${lng}${path}`
  const active = isActiveLink({
    href,
    path,
    pathname: usePathname()
  })
  return <Link
    href={href}
    className={`uppercase ${active
      ? 'text-yellow-500'
      : 'text-white'}`}
    prefetch={false}
  >
    {label}
  </Link>
}
