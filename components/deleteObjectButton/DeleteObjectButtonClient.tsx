'use client'

import confirmAction from '@/confirmation/confirmAction'
import type { AnyObjectType } from '@/interfaces/api'
import { CommonConstsType } from '@/interfaces/commonConsts'
import { IndexUrl } from '@/interfaces/index'
import { deleteObject } from '@/services/api/client'
import { useRouter } from 'next/navigation'
import { Button } from 'reactstrap'

export default function DeleteObjectButtonClient({
  object,
  indexUrl,
  commonConsts,
  accessToken
}: Required<AnyObjectType> & IndexUrl & CommonConstsType &
  { accessToken: string }) {
  const { refresh } = useRouter()
  const onConfirm = () => deleteObject(object, indexUrl, accessToken,
    commonConsts?.successfully, refresh)
  return <Button
    size='sm'
    outline
    aria-labelledby={commonConsts?.delete}
    onClick={confirmAction(onConfirm, commonConsts?.delete, commonConsts?.yes,
      commonConsts?.no)}
  >
    {commonConsts?.delete}
  </Button>
}
