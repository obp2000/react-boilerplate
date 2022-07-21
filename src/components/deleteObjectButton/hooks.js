import {useOutletContext} from 'react-router-dom'
import {toastSuccess, toastError} from '../Shared/Toast'
import confirmAction from '../confirmation/ConfirmAction'

const emptyObject = {}

export const useDeleteObject = (useDeleteObjectMutation, {id}) => {
	const {
		commonConsts: {
			successfully,
			delete: textDelete,
			yes,
			no
		} = emptyObject,
	} = useOutletContext()
	const [deleteObject, {isLoading: isDeletingObject}] =
		useDeleteObjectMutation()
	const onConfirm = () => deleteObject({id}).unwrap()
	        .then(() => toastSuccess(successfully))
	        .catch(({data}) => toastError(data?.detail))
	return {
      'aria-labelledby': textDelete,
	    onClick: confirmAction(onConfirm, textDelete, yes, no),
	    children: textDelete,
	    isDeletingObject,
	}
}
