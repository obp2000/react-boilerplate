import createDecorator from 'final-form-calculate'
import {
    post_discount,
    total_postals,
    total_sum,
    needGift,
    total_weight
} from '../orders/Selectors'
// import { initOrderItem } from '../redux/Orders'

const weight = ({
    amount = 0,
    density = 0,
    width = 0
}) => amount * density * width / 100

const cost = ({
    amount = 0,
    price = 0
}) => amount * price

const findIndex = name => parseInt(name.replace('order_items[', ''))

const order_items_sum = (order_items, name) =>
    (order_items || []).reduce((sum, {
            [name]: value
        }) => sum + Number(value || 0),
        0)

const order_items_count = order_items => (order_items || []).length

const total_text = ({
        order_items_cost,
        ...Consts
    }) => needGift({ order_items_cost, ...Consts }) ?
    'Итого - Нужен подарок!!!' : 'Итого'

export const order_items_calculator = createDecorator({
    field: /order_items\[\d+\]\.amount/,
    updates: (amount, name, { order_items }) => {
        const index = findIndex(name)
        const {
            price,
            product
        } = order_items[index]
        const density = product && product.density
        const width = product && product.width
        // console.log('amount', amount)
        // console.log('price', price)
        return {
            [name.replace('.amount', '.cost')]: cost({
                amount,
                price
            }).toFixed(2),
            [name.replace('.amount', '.weight')]: weight({
                amount,
                density,
                width
            }).toFixed(0),
            order_items_amount: order_items_sum(order_items, 'amount').toFixed(2),
        }
    }
}, {
    field: /order_items\[\d+\]\.price/,
    updates: (price, name, { order_items }) => {
        const index = findIndex(name)
        const { amount } = (order_items[index] || {})
        return {
            [name.replace('.price', '.cost')]: cost({
                amount,
                price
            }).toFixed(2)
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
            [name.replace('.product', '.weight')]: weight({
                amount,
                density,
                width
            }).toFixed(0)
        }
    }
}, {
    field: /order_items\[\d+\]\.cost/,
    updates: (value, name, { order_items }) => ({
        order_items_cost: order_items_sum(order_items, 'cost').toFixed(2),
    })
}, {
    field: /order_items\[\d+\]\.weight/,
    updates: (value, name, { order_items }) => ({
        order_items_weight: order_items_sum(order_items, 'weight').toFixed(0),
    })
}, {
    field: 'order_items_cost',
    updates: (order_items_cost, name, {
        post_cost,
        packet,
        order_items_weight,
        Consts
        // Consts: {
        //     SAMPLES_WEIGHT,
        //     PACKET_WEIGHT,
        //     GIFT_WEIGHT,
        //     SUM_FOR_POST_DISCOUNT,
        //     POST_DISCOUNT_PERCENT,
        //     SUM_FOR_GIFT
        // }
    }) => ({
        post_discount: post_discount({
            order_items_cost,
            post_cost,
            packet,
            ...Consts
        }).toFixed(2),
        total_postals: total_postals({
            order_items_cost,
            post_cost,
            packet,
            ...Consts
        }).toFixed(2),
        total_sum: total_sum({
            order_items_cost,
            post_cost,
            packet,
            ...Consts
        }).toFixed(2),
        total_text: total_text({
            order_items_cost,
            ...Consts
        }),
        total_weight: total_weight({
            order_items_weight,
            order_items_cost,
            ...Consts
        }).toFixed(0)
    })
}, {
    field: 'order_items_weight',
    updates: (order_items_weight, name, {
        order_items_cost,
        Consts
    }) => ({
        total_weight: total_weight({
            order_items_weight,
            order_items_cost,
            ...Consts
        }).toFixed(0)
    })
}, )