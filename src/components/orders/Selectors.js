import createDecorator from 'final-form-calculate'
import { getPostCost } from '../redux/PostCost'

export const post_cost_with_packet = ({
    post_cost = 0,
    packet = 0
}) => (Number(packet) + Number(post_cost))

export const post_discount = ({
    order_items_cost = 0,
    post_cost = 0,
    packet = 0,
    SUM_FOR_POST_DISCOUNT = 0,
    POST_DISCOUNT_PERCENT = 0,
}) => order_items_cost >= SUM_FOR_POST_DISCOUNT ? (post_cost_with_packet({
    post_cost,
    packet
}) * POST_DISCOUNT_PERCENT / 100) : 0

export const total_postals = ({
    order_items_cost = 0,
    post_cost = 0,
    packet = 0,
    ...Consts
}) => (post_cost_with_packet({
        post_cost,
        packet
    }) -
    post_discount({
        order_items_cost,
        post_cost,
        packet,
        ...Consts
    }))

export const total_sum = ({
    order_items_cost = 0,
    post_cost = 0,
    packet = 0,
    ...Consts
}) => (Number(order_items_cost) + total_postals({
    order_items_cost,
    post_cost,
    packet,
    ...Consts
}))

export const needGift = ({
    order_items_cost,
    SUM_FOR_GIFT = 0
}) => order_items_cost >= SUM_FOR_GIFT

export const total_weight = ({
        order_items_weight,
        order_items_cost,
        SAMPLES_WEIGHT,
        PACKET_WEIGHT,
        GIFT_WEIGHT,
        ...Consts
    }) => Number(order_items_weight) +
          SAMPLES_WEIGHT +
          PACKET_WEIGHT +
          (needGift({ order_items_cost, ...Consts }) ? GIFT_WEIGHT : 0)

export const order_calculator = createDecorator(
    // {
    //         field: 'customer',
    //         updates: customer => {
    //             const {
    //                 name: customer_name,
    //                 address: customer_address,
    //                 city
    //             } = customer || {}
    //             return {
    //                 customer_name,
    //                 customer_address,
    //                 pindex: city && city.pindex,
    //                 city: city && city.city
    //             }
    //         }
    //     },
    {
        field: 'post_cost',
        updates: (post_cost, name, {
            packet,
            order_items_cost,
            Consts
        }) => ({
            post_cost_with_packet: post_cost_with_packet({
                post_cost,
                packet
            }).toFixed(2),
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
            }).toFixed(2)
        })
    }, {
        field: 'packet',
        updates: (packet, name, {
            post_cost,
            order_items_cost,
            Consts
        }) => ({
            post_cost_with_packet: post_cost_with_packet({
                post_cost,
                packet
            }).toFixed(2),
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
            }).toFixed(2)
        })
    }, {
        field: 'address1',
        updates: (address, name, {
            pindex,
            total_weight
        }) => ({
            post_cost: getPostCost(pindex, total_weight)
        })
    },
)