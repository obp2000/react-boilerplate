import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import {useDeleteObject} from './hooks'

const DeleteObjectButton = (props) => {
  const {isAuthenticated, isDeletingObject, ...buttonAttrs} = useDeleteObject(props)
  if (!isAuthenticated) {return null}
  return 	<Button
    size='sm'
    outline
    {...buttonAttrs}
  />
}

DeleteObjectButton.propTypes = {
  props: PropTypes.object,
}

export default DeleteObjectButton
