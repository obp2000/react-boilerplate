import createDecorator from 'final-form-calculate'
import {
    post_cost_with_packet,
    post_discount,
    post_cost_with_packet_and_post_discount,
    cost_with_postal_and_post_discount,
    needGift,
    tolalWeight
} from '../orders/Selectors'
// import { initOrderItem } from '../redux/Orders'

const weight = (amount = 0, density = 0, width = 0) =>
    parseInt(amount * density * width / 100)

const cost = (amount = 0, price = 0) => amount * price

const findIndex = (name) => parseInt(name.replace('order_items[', ''))

const order_items_sum = (order_items, name) => (order_items || [])
    .reduce((sum, {
        [name]: value
    }) => sum + Number(value || 0), 0)

const order_items_count = (order_items) => (order_items || []).length

const total_text = (order_items_cost) => needGift(order_items_cost) ?
    'Итого - Нужен подарок!!!' : 'Итого'

export const order_items_calculator = createDecorator({
        field: /order_items\[\d+\]\.amount/,
        updates: (value, name, { order_items }) => {
            const index = findIndex(name)
            const {
                price,
                product
            } = order_items[index] //|| { product: {} })
            const density = product && product.density
            const width = product && product.width
            return {
                [name.replace('.amount', '.cost')]: cost(value, price),
                [name.replace('.amount', '.weight')]: weight(value, density, width),
                order_items_amount: order_items_sum(order_items, 'amount'),
            }
        }
    }, {
        field: /order_items\[\d+\]\.price/,
        updates: (value, name, { order_items }) => {
            const index = findIndex(name)
            const { amount } = (order_items[index] || {})
            return {
                [name.replace('.price', '.cost')]: cost(amount, value)
            }
        }
    }, {
        field: /order_items\[\d+\]\.product/,
        updates: (product, name, { order_items }) => {
            const price = product && product.price
            const density = product && product.density
            const width = product && product.width
            const index = findIndex(name)
            const { amount } = (order_items[index] || {})
            return {
                [name.replace('.product', '.price')]: price,
                [name.replace('.product', '.weight')]: weight(amount, density, width)
            }
        }
    }, {
        field: /order_items\[\d+\]\.cost/,
        updates: (value, name, { order_items }) => ({
            order_items_cost: order_items_sum(order_items, 'cost'),
        })
    }, {
        field: /order_items\[\d+\]\.weight/,
        updates: (value, name, { order_items }) => ({
            order_items_weight: order_items_sum(order_items, 'weight'),
        })
    }, {
        field: 'order_items_cost',
        updates: (order_items_cost, name, { post_cost, packet, order_items_weight }) => ({
            post_discount: post_discount(order_items_cost, post_cost, packet),
            post_cost_with_packet_and_post_discount: post_cost_with_packet_and_post_discount(
                order_items_cost, post_cost, packet),
            cost_with_postal_and_post_discount: cost_with_postal_and_post_discount(order_items_cost, post_cost, packet),
            total_text: total_text(order_items_cost),
            tolalWeight: tolalWeight(order_items_weight, order_items_cost)
        })
    },{
        field: 'order_items_weight',
        updates: (order_items_weight, name, { order_items_cost }) => ({
            tolalWeight: tolalWeight(order_items_weight, order_items_cost)
         })
    },


)

// import { createSelector } from 'reselect'
// import { formValueSelector } from 'redux-form'

// const FormValues = state => formValueSelector('product')(state, 'density', 'width',
//  'weight_for_count', 'length_for_count', 'weight', 'dollar_price', 'dollar_rate')

// const calc = ({
//  density,
//  width,
//  weight_for_count,
//  length_for_count,
//  weight,
//  dollar_price,
//  dollar_rate
// }) => {
//  return {
//      density_for_count: density_for_count(weight_for_count, length_for_count, width),
//      meters_in_roll: meters_in_roll(weight, density, width),
//      prices: prices(dollar_price, dollar_rate, density, width)
//  }
// }

// export const ProductSelector = createSelector(
//  FormValues,
//  calc
// )

// const empty_order_item = {
//     price: 0,
//     product: {
//         density: 0,
//         width: 0
//     }
// }














// import {
//     createSelector
// } from 'reselect'
// import {
//     formValueSelector
// } from 'redux-form'
// import {
//     initOrderItem
// } from '../redux/Orders'

// const weight = (amount = 0, density = 0, width = 0) => amount * density * width / 100

// const cost = (amount = 0, price = 0) => amount * price

// const OrderItemSelector = index => state => formValueSelector('order')(state, 'order_items')[index]

// export const order_item_sum = ({
//     price = initOrderItem.price,
//     amount = initOrderItem.amount,
//     _destroy = initOrderItem._destroy,
//     product = initOrderItem.product
// }) => {
//     const {
//         density,
//         width
//     } = product || initOrderItem.product
//     return {
//         price,
//         amount,
//         cost: cost(amount, price),
//         weight: weight(amount, density, width),
//         density,
//         width,
//         _destroy
//     }
// }

// export const OrderItemSumSelector = index => createSelector(
//     OrderItemSelector(index),
//     order_item_sum
// )