import { createReducer } from 'redux-act'
import { CommonActions, getReducerActions, getInitialState } from './CommonActions'
import { initObject as initCustomer } from './Customers'
import { initObject as initProduct } from './Products'

const index_url = '/orders'
const redirect_url = '/orders'
const choices_names = [['delivery_types','delivery_type'],
                       ['packets', 'packet']]

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
    (values.order_items || []).map((order_item, index) =>{
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
    delete values.post_cost_with_packet_and_post_discount
    delete values.cost_with_postal_and_post_discount
    delete values.total_text
    delete values.tolalWeight
    delete values.order_items_amount
    delete values.order_items_cost
    delete values.order_items_weight
    delete values.created_at
    delete values.updated_at
}

export const Actions = new CommonActions({ index_url,
                                           redirect_url,
                                           initObject,
                                           choices_names,
                                           pre_submit_action })
export const addOrderItemAction = (fields) => () => fields.push(initOrderItem)

// export default Actions.getReducer()
export default createReducer(Actions.getReducerActions(), Actions.getInitialState())


// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearchOrder = Actions.searchObjectsAction()