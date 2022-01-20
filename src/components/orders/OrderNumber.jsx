import PropTypes from 'prop-types'
import React from 'react'
import { Badge } from 'reactstrap'

const OrderNumber = ({id, created_at}) =>
	<Badge color="primary">
        № {id || ' Новый' } от {created_at}
    </Badge>

OrderNumber.propTypes = {
	id: PropTypes.number,
    created_at: PropTypes.string
}

export default OrderNumber