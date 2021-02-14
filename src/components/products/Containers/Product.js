import React from 'react'
import PropTypes from 'prop-types'
import {
	connect
} from 'react-redux'
import {
	goBack
} from 'connected-react-router'
import {
	reduxForm
} from 'redux-form'
import ProductForm from '../ProductForm'
import {
	ProductSelector
} from '../Selectors'
import {
	getProductAction,
	onSubmit,
	onSubmitSuccess
} from '../../redux/Products'
import {
	validate
} from '../Validators'
// import {
//     selectKeys
// } from '../../Shared/selectKeys'

// const formFields = ['id', 'name', 'price', 
// 					'weight', 'width', 'density', 
// 					'dollar_price', 'dollar_rate', 'width_shop', 
// 					'density_shop', 'weight_for_count', 'length_for_count', 
// 					'price_pre', 'image']

const ReduxProductForm = reduxForm({
	form: 'product',
	validate,
	onSubmit,
	onSubmitSuccess,
	enableReinitialize: true
})(ProductForm)

class Product extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const {
			id,
			getProductAction
		} = this.props
		getProductAction(id)
	}

	render() {
		return <ReduxProductForm { ...this.props}/>
	}
}

const mapStateToProps = (state, {
	match: {
		params: {
			id
		}
	}
}) => {
	const {
		products: {
			product,
			isFetching
		}
	} = state
	return {
		id,
		initialValues: product,
		isFetching,
		// image_url: product.image,
		...ProductSelector(state)
	}
}

export default connect(mapStateToProps, {
	getProductAction,
	goBack
})(Product)