import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Badge } from 'reactstrap'

const OrderNumber = () => {
    const object = useSelector(({
        orders: {
            object: {
                id,
                created_at,
            }
        }
    }) => ({
        id,
        created_at,
    }))
	return <>
        &nbsp;от {object.created_at}
    </>
}

export default OrderNumber