'use client'

import Button from '@/app/components/Button'
import { Menu, MenuItem } from '@mui/material'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { useCallback, useRef, useState, useTransition } from 'react'
import userMenuItem from './userMenuItem.json'
// import Button from '@/app/components/Button'

export default function UserButtonMenu({
  lng,
  labels: {
    profile,
    logout,
  }
}: {
  lng: string
  labels: {
    profile: string
    logout: string
  },
}) {
  const [isPending, startTransition] = useTransition()
  const busy = isPending
  // console.log('segms ', useSelectedLayoutSegments(), segment)
  const segment = useSelectedLayoutSegment()
  const onSignOutButtonClick = useCallback(() => {
    handleClose()
    const signOutOptions = segment === 'user'
      ? { callbackUrl: `${lng}` }
      : undefined
    signOut(signOutOptions)
  }, [lng, segment])
  const { back } = useRouter()
  // const elementRef = useRef<null | HTMLDivElement>(null)
  // const [open, setOpen] = useState<boolean>(true)
  const handleClose = () => {
    // elementRef.current = null
    // setOpen(false)
    back()
  }
  return <>
    <Link
      href={`/${lng}/customers`}
    >
      Back
    </Link>
    <Button onClick={back}>
      Back button
    </Button>
    {/*<div ref={elementRef} />*/}
{/*    <Menu
      id="menu-appbar"
      // anchorEl={elementRef.current}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      // keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
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
    </Menu>*/}
  </>
}
