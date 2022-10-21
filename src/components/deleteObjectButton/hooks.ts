import { useContext } from 'react'
import type {
  DeleteObjectButtonType
} from '../../../interfaces/deleteObjectButton'
import { selectAuth } from '../auth/selectors'
import confirmAction from '../confirmation/confirmAction'
import { useAppSelector } from '../hooks'
import { OptionsContext } from '../layout/Layout'
import { toastError, toastSuccess } from '../notifications/toast'

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
