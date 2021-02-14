import PropTypes from 'prop-types'
import React from 'react'
import {
	connect
} from 'react-redux'
import {
	push,
	goBack
} from 'connected-react-router'
import {
	reduxForm
} from 'redux-form'
import OrderForm from '../OrderForm'
import {
	OrderSumSelector
} from '../Selectors'
import {
	getDeliveryTypesAction
} from '../../redux/DeliveryTypes'
import {
	getOrderAction,
	onSubmit,
	onSubmitSuccess
} from '../../redux/Orders'
import {
	getPostCost
} from '../../redux/PostCost'
import {
	onSearchCustomer
} from '../../redux/Customers'
import {
	validate
} from '../Validators'

const ReduxOrderForm = reduxForm({
	form: 'order',
	validate,
	onSubmit,
	onSubmitSuccess,
	enableReinitialize: true
})(OrderForm)

class Order extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const {
			id,
			getDeliveryTypesAction,
			getOrderAction
		} = this.props
		getDeliveryTypesAction()
		getOrderAction(id)
	}

	render = () => < ReduxOrderForm { ...this.props
	}
	/>
}

const mapStateToProps = (state, {
	match: {
		params: {
			id
		}
	}
}) => {
	const {
		orders: {
			order,
			isFetching
		},
		customers,
		delivery_types
	} = state
	return {
		id,
		initialValues: order,
		created_at: order.created_at,
		isFetching,
		customers,
		delivery_types,
		...OrderSumSelector(state)
	}
}

export default connect(mapStateToProps, {
	getOrderAction,
	getDeliveryTypesAction,
	getPostCost,
	onSearchCustomer,
	goBack
})(Order)