import { createReducer } from 'redux-act'
import { createSelector } from 'reselect'
// import config from '../Config'
import {
    createActions,
    reducerActions,
    createCommonSlice
} from './CommonActions'
import {
    selectConsts,
    selectCommonConsts
} from './CommonConsts'
import { initObject as initCustomer } from './Customers'
import { initObject as initProduct } from './Products'
import { ShortName } from '../customers/CustomerName'
import { selectCustomerLabels } from './Customers'
import { selectShortLabels } from './Cities'
import { useOptions } from '../../services/apiSlice'

const index_url = '/orders/'
const redirect_url = '/orders/'

const initObject = {
    post_cost: 0,
    packet: 0,
    created_at: '',
    customer: initCustomer,
    order_items: [],
    delivery_types: []
}

export const initOrderItem = {
    product: initProduct,
    price: 0,
    amount: 0,
    _destroy: false,
}

const pre_submit_action = values => {
    if (values.customer) {
        values.customer_id = values.customer.id
        delete values.customer
    }
    (values.order_items || []).map((order_item, index) => {
        delete order_item.cost
        delete order_item.weight
        delete order_item._destroy
        if (order_item.product) {
            order_item.product_id = order_item.product.id
            delete order_item.product
            // delete order_item.product.name
            // delete order_item.product.get_product_type_display
            // delete order_item.product.get_threads_display
            // delete order_item.product.get_contents_display
        }
    })
    delete values.delivery_types
    delete values.packets
    delete values.samples_weight
    delete values.packet_weight
    delete values.post_cost_with_packet
    delete values.post_discount
    delete values.total_postals
    delete values.total_sum
    delete values.total_text
    delete values.total_weight
    delete values.order_items_amount
    delete values.order_items_cost
    delete values.order_items_weight
    delete values.created_at
    delete values.updated_at
    delete values.Consts
    delete values.gift_weight
    delete values.order_items_cost_label
    delete values.need_gift_label
    delete values.need_gift
}

// const config = {
//     initObject,
//     index_url
// }

const Slice = createCommonSlice(initObject)
export const Actions = Slice.actions
export default Slice.reducer

// export const Actions = createActions()

// export default createReducer(reducerActions(Actions, initObject),
//     initialState(initObject))

Actions.index_url = index_url
// Actions.base_url = `${config.BACKEND}/api${index_url}`
Actions.redirect_url = redirect_url
Actions.initObject = initObject
Actions.pre_submit_action = pre_submit_action

export const addOrderItemAction = fields => () => fields.push(initOrderItem)
export const deleteOrderItemAction = fields => id => fields.remove(id)

export const selectCustomerProps =
    createSelector([useOptions], ({
        customer: {
            children = {}
        } = {}
    }) => children)

export const selectCityProps =
    createSelector([selectCustomerProps], ({
        city: {
            children = {}
        } = {}
    }) => children)

export const selectObject = ({
    orders: {
        object
    }
}) => object

// const FormConsts = ({
//     Consts = {},
//     Consts: {
//         SAMPLES_WEIGHT: samples_weight,
//         PACKET_WEIGHT: packet_weight,
//         GIFT_WEIGHT: gift_weight,
//     } = {},
//     order_items_cost: {
//         label: order_items_cost_label
//     } = {},
//     need_gift: {
//         label: need_gift_label
//     } = {}
// } = {}) => ({
//     Consts,
//     samples_weight,
//     packet_weight,
//     gift_weight,
//     order_items_cost_label,
//     need_gift_label
// })

export const selectFormInitialValues =
    createSelector([selectObject, selectConsts, useOptions],
        (object, Consts, {
            order_items_cost = {},
            need_gift = {}
        }) => ({ ...object,
            Consts,
            samples_weight: Consts.SAMPLES_WEIGHT,
            packet_weight: Consts.PACKET_WEIGHT,
            gift_weight: Consts.GIFT_WEIGHT,
            order_items_cost_label: order_items_cost.label,
            need_gift_label: need_gift.label
        })
    )

export const selectObjects = ({
    orders: {
        results = {}
    } = {}
}) => results

export const selectTableLabels =
    createSelector([useOptions], ({
        id = {},
        customer = {},
        order_items_cost = {},
        created_at = {},
        updated_at = {}
    }) => [
        id.label,
        customer.label,
        order_items_cost.label,
        created_at.label,
        updated_at.label
    ])

export const selectTableValues = results =>
    createSelector([
            selectCustomerLabels(selectCustomerProps),
            selectTableLabels
        ],
        (
            customer_labels,
            table_labels
        ) => results.reduce((result, object) => {
            result.push({
                id: object.id,
                customer: ShortName(object.customer, customer_labels),
                order_items_cost: object.order_items_cost,
                created_at: object.created_at,
                updated_at: object.updated_at
            })
            return result
        }, [table_labels])
    )

export const selectFromCreatedAt =
    createSelector([selectObject, selectCommonConsts], ({
        created_at = '',
    }, {
        from
    }) => `${from} ${created_at}`)

export const selectCustomerAndCityLabels =
    createSelector([selectCustomerLabels(selectCustomerProps),
            selectShortLabels(selectCityProps)
        ],
        (customer_labels, city_labels) => ({
            ...customer_labels,
            ...city_labels
        }))

export const tableFieldNames = [
    'id',
    'customer',
    'order_items_cost',
    'created_at',
    'updated_at'
]

export const rowData = (object, options) => [
    object.id,
    ShortName(object.customer, options?.customer?.children),
    object.order_items_cost,
    object.created_at,
    object.updated_at
]

// export default Actions.getReducer()
// export default createReducer(Actions.getReducerActions(), Actions.getInitialState())

// export const Actions = new CommonActions({ index_url,
//                                            redirect_url,
//                                            initObject,
//                                            pre_submit_action })


// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearchOrder = Actions.searchObjectsAction()