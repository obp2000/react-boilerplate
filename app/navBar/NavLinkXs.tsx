'use client'

// import clsx from 'clsx'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import MenuItem from '@mui/material/MenuItem'

export default function NavLinkXs({
  path,
  lng,
  children
}: { path: string, lng: string, children: string }) {
  const segment = useSelectedLayoutSegment()
  const currentPath = segment === null ? '' : segment
  const isActive = path === currentPath
  return <MenuItem selected={isActive}>
    <Link
      href={`/${lng}/${path}`}
      // prefetch={false}
    >
      {children}
    </Link>
  </MenuItem>
}

// {/*<MenuItem key={page} onClick={handleCloseNavMenu}>
//   <Typography textAlign="center">{page}</Typography>
// </MenuItem>*/}
