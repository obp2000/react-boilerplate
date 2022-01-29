import createDecorator from 'final-form-calculate'
import { SamplesWeight, PostPacketWeight, GiftWeight } from './Consts'
import { getPostCost } from '../redux/PostCost'

export const post_cost_with_packet = (post_cost = 0, packet = 0) =>
    (packet + Number(post_cost))

export const post_discount = (order_items_cost = 0, post_cost = 0, packet = 0) =>
    order_items_cost >= 1000 ?
    (post_cost_with_packet(post_cost, packet) * 0.3) : 0

export const post_cost_with_packet_and_post_discount =
    (order_items_cost = 0, post_cost = 0, packet = 0) =>
    (post_cost_with_packet(post_cost, packet) -
        post_discount(order_items_cost, post_cost, packet))

export const cost_with_postal_and_post_discount =
    (order_items_cost = 0, post_cost = 0, packet = 0) => (order_items_cost +
        post_cost_with_packet_and_post_discount(order_items_cost, post_cost, packet))

const hasPostDiscount = (order_items_cost = 0, post_cost = 0, packet = 0) =>
    post_discount(order_items_cost, post_cost, packet) > 0

export const needGift = order_items_cost => order_items_cost >= 2000

export const tolalWeight = (order_items_weight, order_items_cost) => order_items_weight +
    PostPacketWeight + SamplesWeight + (needGift(order_items_cost) ? GiftWeight : 0)

export const order_calculator = createDecorator(
    {
        field: 'customer',
        updates: ({
            name: customer_name,
            address: customer_address,
            city
        }) => ({
            customer_name,
            customer_address,
            pindex: city && city.pindex,
            city: city && city.city
        })
    }, {
        field: 'post_cost',
        updates: (post_cost, name, { packet, order_items_cost }) => ({
            post_cost_with_packet: post_cost_with_packet(post_cost, packet),
            post_discount: post_discount(order_items_cost, post_cost, packet),
            post_cost_with_packet_and_post_discount: post_cost_with_packet_and_post_discount(
                order_items_cost, post_cost, packet),
            cost_with_postal_and_post_discount: cost_with_postal_and_post_discount(order_items_cost, post_cost, packet)
        })
    }, {
        field: 'packet',
        updates: (packet, name, { post_cost, order_items_cost }) => ({
            post_cost_with_packet: post_cost_with_packet(post_cost, packet),
            post_discount: post_discount(order_items_cost, post_cost, packet),
            post_cost_with_packet_and_post_discount: post_cost_with_packet_and_post_discount(
                order_items_cost, post_cost, packet),
            cost_with_postal_and_post_discount: cost_with_postal_and_post_discount(order_items_cost, post_cost, packet)
        })
    }, {
        field: 'address1',
        updates: (address, name, { pindex, tolalWeight }) => ({
            post_cost: getPostCost(pindex, tolalWeight)
        })
    },





    // {
    //     field: /order_items\[\d+\]\.amount/,
    //     updates: (value, name, { order_items }) => {
    //         const index = findIndex(name)
    //         const {
    //             price,
    //             product: {
    //                 density,
    //                 width
    //             }
    //         } = (order_items[index] || { product: {} })
    //         return {
    //             [name.replace('.amount', '.cost')]: cost(value, price),
    //             [name.replace('.amount', '.weight')]: weight(value, density, width),
    //             'order_items_amount': order_items_sum(order_items, 'amount'),
    //             // 'order_items_count': order_items_count(order_items)
    //         }
    //     }
    // }, {
    //     field: /order_items\[\d+\]\.price/,
    //     updates: (value, name, { order_items }) => {
    //         const index = findIndex(name)
    //         const { amount } = (order_items[index] || {})
    //         return {
    //             [name.replace('.price', '.cost')]: cost(amount, value)
    //         }
    //     }
    // }, {
    //     field: /order_items\[\d+\]\.product/,
    //     updates: ({ price, density, width } = {}, name, { order_items }) => {
    //         const index = findIndex(name)
    //         const { amount } = (order_items[index] || {})
    //         return {
    //             [name.replace('.product', '.price')]: price,
    //             [name.replace('.product', '.weight')]: weight(amount, density, width)
    //         }
    //     }
    // }, {
    //     field: /order_items\[\d+\]\.cost/,
    //     updates: (value, name, { order_items }) => {
    //         return {
    //             'order_items_cost': order_items_sum(order_items, 'cost'),
    //         }
    //     }
    // }, {
    //     field: /order_items\[\d+\]\.weight/,
    //     updates: (value, name, { order_items }) => {
    //         return {
    //             'order_items_weight': order_items_sum(order_items, 'weight'),
    //         }
    //     }
    // },
)



// import {
//  createSelector
// } from 'reselect'
// import {
//  formValueSelector
// } from 'redux-form'
// import {
//  order_item_sum
// } from '../order_items/Selectors'
// import {
//  SamplesWeight
// } from '../samples/Consts'
// import {
//  GiftWeight
// } from '../gifts/Consts'
// import {
//  PacketWeight
// } from '../post_packets/Consts'
// import {
//  initCustomer
// } from '../redux/Customers'
// import {
//  initCity
// } from '../redux/Cities'

// const init_order_items_sum = {
//  count: 0,
//  amount: 0,
//  cost: 0,
//  weight: 0
// }

// const order_items_sum = (order_items = []) =>
//  order_items.reduce((sum, order_item, index) => {
//      const {
//          amount,
//          cost,
//          weight,
//          _destroy
//      } = order_item_sum(order_item)
//      if (_destroy) return sum
//      return {
//          count: sum.count + 1,
//          amount: sum.amount + 1 * amount,
//          cost: sum.cost + cost,
//          weight: sum.weight + weight
//      }
//  }, init_order_items_sum)

// const OrderSelector = state => formValueSelector('order')(state, 'customer', 'post_cost', 'packet', 'order_items')

// const order_sum = ({
//  customer = initCustomer,
//  post_cost = 0,
//  packet = 0,
//  order_items = []
// }) => {
//  const {
//      city: city1 = initCity,
//      address = '',
//      name
//  } = customer || initCustomer
//  const {
//      pindex = '',
//      city = ''
//  } = city1 || initCity
//  const {
//      count = 0,
//          amount = 0,
//          cost = 0,
//          weight = 0
//  } = order_items_sum(order_items)
//  return {
//      pindex,
//      city,
//      address,
//      name,
//      post_cost_with_packet: post_cost_with_packet(post_cost, packet),
//      post_discount: post_discount(cost, post_cost, packet),
//      post_cost_with_packet_and_post_discount: post_cost_with_packet_and_post_discount(cost, post_cost, packet),
//      cost_with_postal_and_post_discount: cost_with_postal_and_post_discount(cost, post_cost, packet),
//      needGift: needGift(cost),
//      tolalWeight: tolalWeight(weight, cost),
//      hasPostDiscount: hasPostDiscount(cost, post_cost, packet),
//      count,
//      amount,
//      cost,
//      weight
//  }
// }

// export const OrderSumSelector = createSelector(
//  OrderSelector,
//  order_sum
// )