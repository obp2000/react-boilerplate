import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import {useDeleteOrderItem} from './hooks'

const DeleteOrderItemButton = (props) => {
  const buttonAttrs = useDeleteOrderItem(props)
  return 	<Button
    size='sm'
    outline
    {...buttonAttrs}
  />
}

DeleteOrderItemButton.propTypes = {
  props: PropTypes.object,
}

export default DeleteOrderItemButton
