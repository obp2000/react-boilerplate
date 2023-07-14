import { Menu, MenuItem } from '@mui/material'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  useCallback,
  useTransition
} from 'react'

import userMenuItem from './userMenuItem.json'

import type {
  Dispatch,
  SetStateAction,
} from 'react'

export default function UserButtonMenu({
  lng,
  labels: {
    profile,
    logout,
  },
  anchorEl,
  setAnchorEl,
}: {
  lng: string
  labels: {
    profile: string
    logout: string
  }
  anchorEl: HTMLElement | null
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
}) {
  const [isPending, startTransition] = useTransition()
  const busy = isPending
  const pathname = usePathname()
  // console.log('pathname in user button ', usePathname())
  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])
  const onSignOutButtonClick = useCallback(() => {
    handleClose()
    const signOutOptions = pathname.split('/')[2] === 'user'
      ? { callbackUrl: `/${lng}` }
      : undefined
    signOut(signOutOptions)
  }, [lng, pathname, handleClose])
  return <Menu
    id="menu-appbar"
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem onClick={handleClose}>
      <Link
        href={`/${lng}${userMenuItem.path}`}
        style={{ textDecoration: 'none' }}
      // prefetch={false}
      >
        {profile}
      </Link>
    </MenuItem>
    <MenuItem
      aria-label='auth'
      disabled={busy}
      onClick={() => startTransition(onSignOutButtonClick)}
    >  
      {logout}
    </MenuItem>
  </Menu>
}
