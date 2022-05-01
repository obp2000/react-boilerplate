import { ShortName } from '../customers/CustomerName';
import { customerLabels } from './Customers';
import { cityLabels } from './Cities';
// import { useOptions } from '../../services/apiSlice'

const indexUrl = '/orders/';
const redirectUrl = '/orders/';
const searchUrl = indexUrl;
const preSubmitAction = (values) => {
  if (values.customer) {
    values.customer_id = values.customer.id;
    delete values.customer;
  }
  (values.order_items || []).map((order_item, index) => {
    delete order_item.cost;
    delete order_item.weight;
    delete order_item._destroy;
    if (order_item.product) {
      order_item.product_id = order_item.product.id;
      delete order_item.product;
      // delete order_item.product.name
      // delete order_item.product.get_product_type_display
      // delete order_item.product.get_threads_display
      // delete order_item.product.get_contents_display
    }
  });
  delete values.delivery_types;
  delete values.packets;
  delete values.samples_weight;
  delete values.packet_weight;
  delete values.post_cost_with_packet;
  delete values.post_discount;
  delete values.total_postals;
  delete values.total_sum;
  delete values.total_text;
  delete values.total_weight;
  delete values.order_items_amount;
  delete values.order_items_cost;
  delete values.order_items_weight;
  delete values.created_at;
  delete values.updated_at;
  delete values.Consts;
  delete values.gift_weight;
  delete values.order_items_cost_label;
  delete values.need_gift_label;
  delete values.need_gift;
};

const tableFieldNames = [
  'id',
  'customer',
  'order_items_cost',
  'created_at',
  'updated_at',
];

const rowData = (object, options) => [
  object.id,
  ShortName(object?.customer, customerLabels(options?.customer?.children)),
  object.order_items_cost,
  object.created_at,
  object.updated_at,
];

export const config = {
  indexUrl,
  redirectUrl,
  preSubmitAction,
  searchUrl,
  tableFieldNames,
  rowData,
};

export const addOrderItemAction = (fields) => () => fields.push(initOrderItem);

export const deleteOrderItemAction = (fields) => (id) => fields.remove(id);

export const formInitialValues = (object, {
  Consts = {},
  order_items_cost = {},
  need_gift = {},
}) => ({
  ...object,
  Consts,
  samples_weight: Consts?.SAMPLES_WEIGHT,
  packet_weight: Consts?.PACKET_WEIGHT,
  gift_weight: Consts?.GIFT_WEIGHT,
  order_items_cost_label: order_items_cost.label,
  need_gift_label: need_gift.label,
});

export const customerAndCityLabels = (options) => {
  const customerProps = options?.customer?.children;
  const cityProps = customerProps?.city?.children;
  return {
    ...customerLabels(customerProps),
    ...cityLabels(cityProps),
  };
};

export const fromCreatedAt = ({ created_at = '' }, { from }) => `${from} ${created_at}`;

// createSelector([selectObject, selectCommonConsts], ({
//     created_at = '',
// }, {
//     from
// }) => `${from} ${created_at}`)

// export default Actions.getReducer()
// export default createReducer(Actions.getReducerActions(), Actions.getInitialState())

// export const Actions = new CommonActions({ indexUrl,
//                                            redirectUrl,
//                                            initObject,
//                                            preSubmitAction })

// export const getObjectsAction = Actions.getObjectsAction()
// export const getObjectAction = Actions.getObjectAction()
// export const onSubmit = Actions.onSubmitAction()
// export const deleteObjectAction = Actions.deleteObjectAction()
// export const onSearchOrder = Actions.searchObjectsAction()

// export const selectTableLabels =
//     createSelector([useOptions], ({
//         id = {},
//         customer = {},
//         order_items_cost = {},
//         created_at = {},
//         updated_at = {}
//     }) => [
//         id.label,
//         customer.label,
//         order_items_cost.label,
//         created_at.label,
//         updated_at.label
//     ])

// export const selectTableValues = results =>
//     createSelector([
//             selectCustomerLabels(selectCustomerProps),
//             selectTableLabels
//         ],
//         (
//             customer_labels,
//             table_labels
//         ) => results.reduce((result, object) => {
//             result.push({
//                 id: object.id,
//                 customer: ShortName(object.customer, customer_labels),
//                 order_items_cost: object.order_items_cost,
//                 created_at: object.created_at,
//                 updated_at: object.updated_at
//             })
//             return result
//         }, [table_labels])
//     )

// export const selectFromCreatedAt =
//     createSelector([selectObject, selectCommonConsts], ({
//         created_at = '',
//     }, {
//         from
//     }) => `${from} ${created_at}`)

// export const selectCustomerAndCityLabels =
//     createSelector([selectCustomerLabels(selectCustomerProps),
//             selectShortLabels(selectCityProps)
//         ],
//         (customer_labels, city_labels) => ({
//             ...customer_labels,
//             ...city_labels
//         }))

// const config = {
//     initObject,
//     indexUrl
// }

// const Slice = createCommonSlice(initObject)
// export const Actions = {}
// export default Slice.reducer

// export const Actions = createActions()

// export default createReducer(reducerActions(Actions, initObject),
//     initialState(initObject))

// Actions.indexUrl = indexUrl
// Actions.base_url = `${config.BACKEND}/api${indexUrl}`
// Actions.redirectUrl = redirectUrl
// Actions.initObject = initObject
// Actions.preSubmitAction = preSubmitAction

// export const selectObjects = ({
//     orders: {
//         results = {}
//     } = {}
// }) => results
