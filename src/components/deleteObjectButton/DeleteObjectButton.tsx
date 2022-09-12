import {Button} from 'reactstrap'
import {useDeleteObject} from './hooks'
import { useDeleteCustomerMutation } from '../customers/apiSlice'
import { useDeleteProductMutation } from '../products/apiSlice'
import { useDeleteOrderMutation } from '../orders/apiSlice'
import { anyObject } from '../../../interfaces'

export type UseDeleteObjectMutation = typeof useDeleteCustomerMutation |
  typeof useDeleteProductMutation | typeof useDeleteOrderMutation

export type Props = {
  object: anyObject
  indexUrl: string
  useDeleteObjectMutation: UseDeleteObjectMutation
}

const DeleteObjectButton = (props: Props) => {
  const {
    isAuthenticated,
    isDeletingObject,
    ...buttonAttrs
  } = useDeleteObject(props)
  if (!isAuthenticated) {return null}
  return 	<Button
    size='sm'
    outline
    {...buttonAttrs}
  />
}

export default DeleteObjectButton
