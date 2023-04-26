'use client'

import { toastSuccess } from '@/app/components/toast'
import Button from '@/app/useClient/Button'
import Tooltip from '@/app/useClient/Tooltip'
import AccountCircle from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { signOut } from "next-auth/react"
import Link from 'next/link'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import userMenuItem from './userMenuItem.json'
import { useParams } from 'next/navigation'
import { fallbackLng } from '@/app/i18n/settings'

export default function UserButton({
  name,
  labels: {
    successfulLogout,
    profile,
    logout,
  }
}: {
  name: string
  labels: Record<string, string>
}) {
  const params = useParams()
  const lng = String(params?.lng || fallbackLng)
  const [isPending, startTransition] = useTransition()
  const busy = isPending
  const { refresh, replace } = useRouter()
  const segment = useSelectedLayoutSegment()
  const onSignOut = () => {
    signOut()
    toastSuccess(successfulLogout)
    if (segment === 'user') {
      replace(`/${lng}`)
    }
    refresh()
  }
  const onSignOutButtonClick = useCallback(() => {
    if (busy) {
      return
    }
    onSignOut()
  }, [onSignOut, busy])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return <div>
    <Tooltip title={name}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </Tooltip>
    <Menu
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
          href={`/${lng}/${userMenuItem.path}`}
          style={{ textDecoration: 'none' }}
        // prefetch={false}
        >
          <Button>
            {profile}
          </Button>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Button
          aria-label='auth'
          disabled={busy}
          // onClick={onSignOut}
          onClick={() => startTransition(onSignOutButtonClick)}
        >
          {logout}
        </Button>
      </MenuItem>
    </Menu>
  </div>
}
