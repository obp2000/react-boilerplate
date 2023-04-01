'use client'

import { confirm } from '@/app/confirmation/Confirmation'
import Tooltip from '@/app/useClient/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toastError, toastSuccess } from '@/app/notifications/toast'
import IconButton from '@mui/material/IconButton'

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
        startTransition(() => {
          refresh()
          toastSuccess(message)
        })
      } else {
        const { message } = await res.json()
        toastError(message)
      }
    }
  }
  return <>
    <Tooltip title={label}>
      <IconButton aria-label={label} disabled={busy} onClick={onClick}>
        <DeleteIcon role='img' color='primary' />
      </IconButton>
    </Tooltip>
  </>
}
