import {useAppSelector} from '../hooks'
import {selectAuth} from '../auth/selectors'
import {toastSuccess, toastError} from '../Shared/Toast'
import confirmAction from '../confirmation/ConfirmAction'
import {useOptionsOuery} from '../options/hooks'
import { Props } from './DeleteObjectButton'

export const useDeleteObject = ({
  object,
  indexUrl,
  useDeleteObjectMutation,
}: Props) => {
  const {isAuthenticated} = useAppSelector(selectAuth)
  const {commonConsts} = useOptionsOuery(indexUrl)
  const [deleteObject, {isLoading: isDeletingObject}] =
		useDeleteObjectMutation()
  const onConfirm = () => {
        deleteObject({id: object.id}).unwrap()
	        .then(() => toastSuccess(commonConsts?.successfully))
	        .catch(({data}) => toastError(data?.detail))
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
