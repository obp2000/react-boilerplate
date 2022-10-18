import React from 'react'
import { Button } from 'reactstrap'
import { useDeleteObject } from './hooks'
import type {
  DeleteObjectButtonType
} from '../../../interfaces/deleteObjectButton'

const DeleteObjectButton = (props: DeleteObjectButtonType) => {
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
