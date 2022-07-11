import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {Button} from 'reactstrap'
import confirmAction from '../Shared/ConfirmAction'
import orderItemsConfig from '../orderItems/config'

const DeleteOrderItemButton = ({index, fields}) => {
	const {commonConsts} = useOutletContext()
	return <Button size='sm' outline
        onClick={confirmAction(() =>
            orderItemsConfig.deleteOrderItemAction(index, fields),
          	`${commonConsts?.delete}?`,
          	commonConsts?.yes,
          	commonConsts?.no)}>
        {commonConsts?.delete}
      </Button>
}

DeleteOrderItemButton.propTypes = {
  index: PropTypes.number,
  fields: PropTypes.object,
}

export default DeleteOrderItemButton
