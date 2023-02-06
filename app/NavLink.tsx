'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function NavLink({
  path,
  lng,
  children
}: { path: string, lng: string, children: string }) {
  const segment = useSelectedLayoutSegment()
  const currentPath = segment === '(main)' ? '' : segment
  const isActive = path === currentPath
  return <Link
    href={`/${lng}/${path}`}
    className={clsx('mt-2 mr-1 rounded-lg px-2 py-1 text-sm font-medium', {
      'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white': !isActive,
      'bg-blue-600 text-white': isActive,
    })}
  >
    {children}
  </Link>
}
