'use client'

import clsx from 'clsx'
import Button from '@mui/material/Button'
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
  return  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
    <Link
      href={`/${lng}/${path}`}
      prefetch={false}
    className={clsx({
      'hover:text-gray-300': !isActive,
      'text-yellow-300': isActive,
    })}
    >
      {children}
    </Link>
  </Button>
}
