'use client'

import Box from '@/app/useClient/Box'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import { useState, type MouseEvent, type ReactNode } from 'react'
import Typography from '@/app/useClient/Typography'
import type { Translation, ModelNames } from '@/app/i18n/dictionaries'
import mainMenu from './mainMenu.json'

export function NavLinkXs({
  path,
  table,
  lng,
  children
}: { path: string, table: string, lng: string, children: string }) {
  return <MenuItem selected={path === table}>
    <Link
      href={`/${lng}/${path}`}
    // prefetch={false}
    >
      {children}
    </Link>
  </MenuItem>
}

export function NavbarXsMenu({ lng, dict }: { lng: string, dict: Translation }) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const pathname = usePathname()
  const table = pathname?.split('/')[2] || 'customers'
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
      {mainMenu.map(({ path, label }, key) => <NavLinkXs key={key} {...{ path, table, lng }}>
        {dict[label as keyof ModelNames].plural as string ||
          dict[label as keyof Translation] as string}
      </NavLinkXs>)}
    </Menu>
  </Box>
}

export function NavLink({
  path,
  table,
  lng,
  children
}: {
  path: string
  table: string
  lng: string
  children: ReactNode
}) {
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
        color: path === table ? 'yellow' : 'white',
      }}>
        {children}
      </Typography>
    </Link>
  </Typography>
}

export function NavbarMenu({ lng, dict }: { lng: string, dict: Translation }) {
  const pathname = usePathname()
  const table = pathname?.split('/')[2] || 'customers'
  console.log('useSegm ', useSelectedLayoutSegments())
  return <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    {mainMenu.map(({ path, label }, key) => <NavLink key={key} {...{ path, table, lng }}>
      {dict[label as keyof ModelNames].plural as string ||
        dict[label as keyof Translation] as string}
    </NavLink>)}
  </Box>
}
