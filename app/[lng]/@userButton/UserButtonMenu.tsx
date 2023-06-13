import { Menu, MenuItem } from '@mui/material'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useTransition
} from 'react'
import userMenuItem from './userMenuItem.json'
// import Button from '@/app/components/Button'

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
  // console.log('segms ', useSelectedLayoutSegments(), segment)
  const segment = useSelectedLayoutSegment()
  const onSignOutButtonClick = useCallback(() => {
    handleClose()
    const signOutOptions = segment === 'user'
      ? { callbackUrl: (new URL(`/${lng}`, window.location.href)).href}
      : undefined
    signOut(signOutOptions)
  }, [lng, segment])
  const handleClose = () => {
    setAnchorEl(null)
  }
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
