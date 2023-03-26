'use client'

import Tooltip from '@/app/useClient/Tooltip'
import { useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { confirm } from '@/app/confirmation/Confirmation'
// import Button from '@/app/useClient/Button'
import { errorMessage as getErrorMessage } from '@/app/error/client'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

type Props = Required<({ id: number })> & {
  deletePath: string
  label: string
  message: string
  okText: string
  cancelText: string
  accessToken: string
}

export default function Button({
  deletePath,
  id,
  label,
  message,
  okText,
  cancelText,
  accessToken,
}: Props) {
  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const busy = isPending
  const onClick = async () => {
    const result = await confirm(`${label}?`, { okText, cancelText })
    if (result) {
      const headers = new Headers()
      headers.append('authorization', `Token ${accessToken}`)
      const res = await fetch(`${deletePath}${id}`, {
        method: 'DELETE',
        headers,
      })
      if (res.ok) {
        setSuccess(true)
        startTransition(() => {
          refresh()
          setSuccess(false)
        })
      } else {
        setErrorMessage(await getErrorMessage(res))
      }
    }
  }
  return <>
    <Tooltip title={label}>
      <IconButton aria-label={label} disabled={busy} onClick={onClick}>
        <DeleteIcon role='img' color='primary' />
      </IconButton>
    </Tooltip>
    <Snackbar open={success || !!errorMessage} autoHideDuration={3000}>
      <Alert severity={success ? "success" : (errorMessage ? "error" : undefined)}
        elevation={6} variant="filled" sx={{ width: '100%' }}>
        {success ? message : (errorMessage ? errorMessage : null)}
      </Alert>
    </Snackbar>
  </>
}
