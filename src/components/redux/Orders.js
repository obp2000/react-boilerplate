import { CommonActions } from './CommonActions'
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

export const Actions = new CommonActions({ index_url,
                                           redirect_url,
                                           initObject,
                                           choices_names })
export const addOrderItemAction = (fields) => () => fields.push(initOrderItem)

export default Actions.getReducer()


// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearchOrder = Actions.searchObjectsAction()