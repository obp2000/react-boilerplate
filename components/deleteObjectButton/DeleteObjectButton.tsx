import { FC } from 'react'
import { Button } from 'reactstrap'
import type {
  DeleteObjectButtonType
} from '../../interfaces/deleteObjectButton'
import { useDeleteObject } from './hooks'

const DeleteObjectButton: FC<DeleteObjectButtonType> = (props) => {
  const {
    isAuthenticated,
    isDeletingObject,
    ...buttonAttrs
  } = useDeleteObject(props)
  if (!isAuthenticated) { return null }
  return <Button
    size='sm'
    outline
    {...buttonAttrs}
  />
}

export default DeleteObjectButton
