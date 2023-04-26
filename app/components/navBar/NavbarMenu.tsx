'use client'

import Box from '@/app/useClient/Box'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type MouseEvent, type PropsWithChildren, type ReactNode } from 'react'
import Typography from '@/app/useClient/Typography'

export function NavbarXsMenu({ children }: PropsWithChildren) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  return <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleOpenNavMenu}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: 'block', md: 'none' },
      }}
    >
      {children}
    </Menu>
  </Box>
}

export function NavLinkXs({
  path,
  lng,
  children
}: { path: string, lng: string, children: string }) {
  // const segment = useSelectedLayoutSegment()
  // const currentPath = segment === null ? '' : segment
  const pathname = usePathname()
  const segment = pathname?.split('/')[2] || 'customers'
  const isActive = path === segment
  return <MenuItem selected={isActive}>
    <Link
      href={`/${lng}/${path}`}
      // prefetch={false}
    >
      {children}
    </Link>
  </MenuItem>
}

export function NavLink({
  path,
  lng,
  children
}: {
  path: string
  lng: string
  children: ReactNode
}) {
  // const segment = useSelectedLayoutSegment()
  // console.log({ segment })
  // const currentPath = segment === null ? '' : segment
  // const isActive = path === currentPath
  const pathname = usePathname()
  const segment = pathname?.split('/')[2] || 'customers'
  const isActive = path === segment
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
  </Typography>
}
