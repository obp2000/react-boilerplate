import { useAppSelector } from '../hooks'
import { selectAuth } from '../auth/selectors'
import { toastSuccess, toastError } from '../Shared/toast'
import confirmAction from '../confirmation/confirmAction'
import type { DeleteObjectButtonType } from '../../../interfaces'

export const useDeleteObject = ({
  object,
  commonConsts,
  useDeleteObjectMutation,
}: DeleteObjectButtonType) => {
  const { isAuthenticated } = useAppSelector(selectAuth)
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
