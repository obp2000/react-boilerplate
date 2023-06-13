'use client'

import { IconButton } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { useCallback, useState, type MouseEvent } from 'react'
import dynamic from 'next/dynamic'

const UserButtonMenu = dynamic(() => import('./UserButtonMenu'), {
  ssr: false,
})

export default function UserButton({
  name,
  lng,
  labels,
}: {
  name?: string | null
  lng: string
  labels: {
    profile: string
    logout: string
  }
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = useCallback(
    ({ currentTarget }: MouseEvent<HTMLElement>) => {
      setAnchorEl(currentTarget)
    }, [setAnchorEl])
  return <div>
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={openMenu}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    {name}
    {anchorEl &&
      <UserButtonMenu {...{ lng, labels, anchorEl, setAnchorEl }} />}
  </div>
}


// export default function UserButton({
//   name,
//   lng,
//   labels,
// }: AuthOrUserButton) {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }
//   return <div>
//     <IconButton
//       size="large"
//       aria-label="account of current user"
//       aria-controls="menu-appbar"
//       aria-haspopup="true"
//       onClick={handleMenu}
//       color="inherit"
//     >
//       <AccountCircle />
//     </IconButton>
//     {name}
//     {anchorEl &&
//       <UserButtonMenu {...{ lng, labels, anchorEl, setAnchorEl }} />}
//   </div>
// }
