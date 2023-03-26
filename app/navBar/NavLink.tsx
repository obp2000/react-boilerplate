'use client'

// import Button from '@mui/material/Button'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import type { ReactNode } from 'react'
import Typography from '@/app/useClient/Typography'

export default function NavLink({
  path,
  lng,
  children
}: {
  path: string
  lng: string
  children: ReactNode
}) {
  const segment = useSelectedLayoutSegment()
  // console.log({ segment })
  const currentPath = segment === null ? '' : segment
  const isActive = path === currentPath
  return <Typography variant="h6" component="div" sx={{
    flexGrow: 1,
    '&:hover': {
      opacity: [0.9, 0.8, 0.7],
    }
  }}>
    <Link
      href={`/${lng}/${path}`}
      style={{ textDecoration: 'none' }}
    // prefetch={false}
    >
      <Typography variant='button' sx={{
        color: isActive ? 'yellow' : 'white',
      }}>
        {children}
      </Typography>
    </Link>
    {/*{children}*/}
  </Typography>
}
