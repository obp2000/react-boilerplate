import {useAppSelector} from '../hooks'
import {selectAuth} from '../auth/selectors'
import {toastSuccess, toastError} from '../Shared/Toast'
import confirmAction from '../confirmation/ConfirmAction'
import {useOptionsOuery} from '../options/hooks'
import type {TableConfig} from '../objectsTable/ObjectsTable'
import {
  Customer,
  Product,
  Order,
} from '../../../interfaces'

type Props = TableConfig & {
  object: Customer | Product | Order
}

export const useDeleteObject = ({
  indexUrl,
  useDeleteObjectMutation,
  object,
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
