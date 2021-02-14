import {
    createSelector
} from 'reselect'
import {
    formValueSelector
} from 'redux-form'
import {
    initOrderItem
} from '../redux/Orders'

const weight = (amount = 0, density = 0, width = 0) => amount * density * width / 100

const cost = (amount = 0, price = 0) => amount * price

const OrderItemSelector = index => state =>
    formValueSelector('order')(state, 'order_items')[index]

export const order_item_sum = ({
    price = initOrderItem.price,
    amount = initOrderItem.amount,
    _destroy = initOrderItem._destroy,
    product = initOrderItem.product
}) => {
    const {
        density,
        width
    } = product || initOrderItem.product
    return {
        price,
        amount,
        cost: cost(amount, price),
        weight: weight(amount, density, width),
        density,
        width,
        _destroy
    }
}

export const OrderItemSumSelector = index => createSelector(
    OrderItemSelector(index),
    order_item_sum
)