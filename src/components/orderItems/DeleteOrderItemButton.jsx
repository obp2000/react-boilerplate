import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import {useDeleteOrderItem} from './hooks'

const DeleteOrderItemButton = ({index, fields}) => {
	const buttonAttrs = useDeleteOrderItem(index, fields)
	return 	<Button
				size='sm'
				outline
				{...buttonAttrs}
			/>
}

DeleteOrderItemButton.propTypes = {
  index: PropTypes.number,
  fields: PropTypes.object,
}

export default DeleteOrderItemButton
