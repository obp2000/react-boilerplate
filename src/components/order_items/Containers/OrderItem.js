import {
	connect
} from 'react-redux'
import OrderItem from '../OrderItem'
import {
	OrderItemSumSelector
} from '../Selectors'
import {
	onChangeProduct,
	onSelectProduct
} from '../../redux/Products'

const mapStateToProps = (state, {
		index
	}) =>
	({
		products: state.products,
		...OrderItemSumSelector(index)(state)
	})

export default connect(mapStateToProps, {
	onChangeProduct,
	onSelectProduct
})(OrderItem)