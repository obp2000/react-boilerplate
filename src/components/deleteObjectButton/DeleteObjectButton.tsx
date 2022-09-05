import {Button} from 'reactstrap'
import {useDeleteObject} from './hooks'
import type {TableConfig} from '../objectsTable/ObjectsTable'
import {
  Customer,
  Product,
  Order,
} from '../../../interfaces'

type Props = TableConfig & {
  object: Customer | Product | Order
}

const DeleteObjectButton = (props: Props) => {
  const {isAuthenticated, isDeletingObject, ...buttonAttrs} = useDeleteObject(props)
  if (!isAuthenticated) {return null}
  return 	<Button
    size='sm'
    outline
    {...buttonAttrs}
  />
}

export default DeleteObjectButton
