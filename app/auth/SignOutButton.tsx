'use client'

import Button from '@/app/useClient/Button'
import Tooltip from '@/app/useClient/Tooltip'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useState, useTransition } from 'react'
import { useSignOut } from './hooks'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function SignOutButton({
  lng,
  username,
  labels
}: {
  lng: string
  username: string
  labels: Record<string, string>
}) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const busy = isPending
  return <>
    <Tooltip title={labels?.logout}>
      <Button
        color='inherit'
        aria-label='auth'
        onClick={useSignOut({ lng, startTransition, setSuccess, setErrorMessage })}
        disabled={busy}
      >
        {username}&nbsp;&nbsp;<LogoutOutlinedIcon />
      </Button>
    </Tooltip>
    <Snackbar open={success || !!errorMessage} autoHideDuration={3000}>
      <Alert severity={success ? "success" : "error"} elevation={6} variant="filled" sx={{ width: '100%' }}>
        {success ? labels.successfulLogout : errorMessage}
      </Alert>
    </Snackbar>
  </>
}


