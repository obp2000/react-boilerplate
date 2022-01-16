import { connect } from 'react-redux'
import OrderItem from '../OrderItem'
// import { OrderItemSumSelector } from '../Selectors'

const mapStateToProps = (state, {
    index,
    fields,
    _destroy
}) => ({
    // row_number: index + 1,
    row_class_name: (_destroy == true) ? 'd-none' : 'd-flex',
    deleteOrderItemAction: () => fields.remove(index),
    // ...OrderItemSumSelector(index)(state)
})

export default connect(mapStateToProps)(OrderItem)