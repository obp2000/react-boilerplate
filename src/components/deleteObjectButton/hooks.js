import {useSelector} from 'react-redux'
import {selectAuth} from '../auth/selectors'
import {toastSuccess, toastError} from '../Shared/Toast'
import confirmAction from '../confirmation/ConfirmAction'

const emptyObject = {}

export const useDeleteObject = ({
  useDeleteObjectMutation,
  object,
  commonConsts = emptyObject,
}) => {
  const {isAuthenticated} = useSelector(selectAuth)
  const {
    successfully,
    delete: textDelete,
    yes,
    no,
  } = commonConsts
  const [deleteObject, {isLoading: isDeletingObject}] =
		useDeleteObjectMutation()
  const onConfirm = () => deleteObject({id: object.id}).unwrap()
	        .then(() => toastSuccess(successfully))
	        .catch(({data}) => toastError(data?.detail))
  return {
    isAuthenticated,
    'aria-labelledby': textDelete,
	  onClick: confirmAction(onConfirm, textDelete, yes, no),
	  children: textDelete,
	  isDeletingObject,
  }
}
