import PropTypes from 'prop-types'
import React from 'react'
// import { useSelector } from 'react-redux'

const OrderNumber = ({ initialValues: {
    created_at = ''
} }) => {
	return <>
        &nbsp;от {created_at}
    </>
}

export default OrderNumber