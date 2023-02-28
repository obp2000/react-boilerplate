'use client'

import Tooltip from '@/app/client/Tooltip'
import type { Customer } from '@/app/customers/helpers'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteObject } from './client'
import type { Product } from '@/app/products/helpers'
import type { Order } from '@/app/orders/helpers'
import { confirm } from '@/app/confirmation/Confirmation'
// import Button from '@/app/client/Button'

type Props = Required<({ object: Customer | Product | Order })> & {
  table: string
  label: string
  message: string
  okText: string
  cancelText: string
  accessToken: string
}

export default function DeleteObjectButton({
  table,
  object,
  label,
  message,
  okText,
  cancelText,
}: Props) {
  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()
  const busy = isPending
  const onClick = async () => {
    // const confirm = (await import('@/confirmation/Confirmation')).confirm
    const result = await confirm(`${label}?`, { okText, cancelText })
    if (result) {
      return deleteObject({
        id: object.id as number,
        table,
        message,
        refresh,
        startTransition,
        accessToken,
      })
    }
  }
  return <Tooltip title={label}>
    <DeleteIcon
      role='img'
      aria-label={label}
      onClick={busy ? () => undefined : onClick}
      cursor='pointer' />
  </Tooltip>
}


  // return <Button
  //           size='sm'
  //           onClick={busy ? () => undefined : onClick}
  //         >
  //           {label}
  //         </Button>

  // return <AiOutlineDelete
  //     role='img'
  //     aria-label={label}
  //     onClick={busy ? () => undefined : onClick}
  //     cursor='pointer' />
