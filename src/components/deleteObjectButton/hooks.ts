import { useContext } from 'react'
import { useAppSelector } from '../hooks'
import { selectAuth } from '../auth/selectors'
import { OptionsContext } from '../layout/Layout'
import { toastSuccess, toastError } from '../notifications/toast'
import confirmAction from '../confirmation/confirmAction'
import type {
  DeleteObjectButtonType
} from '../../../interfaces/deleteObjectButton'

export const useDeleteObject = ({
  object,
  useDeleteObjectMutation,
}: DeleteObjectButtonType) => {
  const { isAuthenticated } = useAppSelector(selectAuth)
  const { commonConsts } = useContext(OptionsContext)
  const [deleteObject, { isLoading: isDeletingObject }] =
    useDeleteObjectMutation()
  const onConfirm = () => {
    deleteObject({ id: object.id }).unwrap()
      .then(() => toastSuccess(commonConsts?.successfully))
      .catch(({ data }) => toastError(data?.detail))
  }
  return {
    isAuthenticated,
    'aria-labelledby': commonConsts?.delete,
    onClick: confirmAction(onConfirm, commonConsts?.delete, commonConsts?.yes,
      commonConsts?.no),
    children: commonConsts?.delete,
    isDeletingObject,
  }
}
