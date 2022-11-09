import confirmAction from '@/confirmation/confirmAction'
import { MainContext } from '@/services/context'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { deleteObject } from '@/services/api/client'
import { AnyObject } from '@/interfaces/api'

export const useDeleteObject = (object: AnyObject) => {
  const { commonConsts, accessToken, indexUrl } = useContext(MainContext)
  const { refresh } = useRouter()
  const onConfirm = () =>
    deleteObject(object, indexUrl as string, accessToken as string,
      commonConsts?.successfully, refresh)
  return {
    'aria-labelledby': commonConsts?.delete,
    onClick: confirmAction(onConfirm, commonConsts?.delete, commonConsts?.yes,
      commonConsts?.no),
    children: commonConsts?.delete,
    // isDeletingObject,
  }
}
