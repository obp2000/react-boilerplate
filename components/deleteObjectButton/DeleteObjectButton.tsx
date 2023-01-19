'use client'

import { useTranslation } from '@/app/i18n/client'
import Tooltip from '@/client/Tooltip'
// import { confirm } from '@/confirmation/Confirmation'
import type { CustomersSelect, OrdersSelect, ProductsSelect } from '@/interfaces/api'
import { useRouter } from 'next/navigation'
import { AiOutlineDelete } from 'react-icons/ai'
import { deleteObject } from './client'

type Props = { indexUrl: string } &
  Required<({ object: CustomersSelect | ProductsSelect | OrdersSelect })> &
{ label: string, message: string, okText: string, cancelText: string, lng: string }

export default function DeleteObjectButton({
  indexUrl,
  object,
  label,
  message,
  okText,
  cancelText,
  lng
}: Props) {
  const { refresh } = useRouter()
  const onClick = async () => {
    const confirm = (await import('@/confirmation/Confirmation')).confirm
    const result = await confirm(`${label}?`, { okText, cancelText })
    const { t } = useTranslation(lng)
    if (result) {
      deleteObject({
        id: object.id,
        indexUrl,
        message,
        refresh,
        t
      })
    }
  }
  return <Tooltip content={label}>
    <AiOutlineDelete
      aria-labelledby={label}
      onClick={onClick}
      cursor='pointer' />
  </Tooltip>
}
