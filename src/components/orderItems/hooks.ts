// import type {FormProps} from 'react-final-form'
import {orderOrderItemOptions} from '../orders/hooks'
import {useDropdown as useProductDropdownAttrs} from '../products/hooks'
import {cost, weight} from '../orders/Calculator'
import DropdownList from '../dropdownList/DropdownList'
import {OrderItem, OrderItemFormValues, ProductOptions} from '../../../interfaces'

type OrderItemProductOptionsProps = {
  product: {
    children: ProductOptions
  }
}

export const orderItemProductOptions = (props: OrderItemProductOptionsProps) =>
  props?.product?.children

export const initOrderItem = {
  product: undefined,
  price: 0,
  amount: 0,
  cost: 0,
  weight: 0,
  _destroy: false,
}

export const formInitialOrderItem =
  (orderItem: OrderItem): OrderItemFormValues => ({
  ...orderItem,
  cost: cost(orderItem),
  weight: weight(orderItem),
})

export const formInitialOrderItems =
  (orderItems: OrderItem[] = []): OrderItemFormValues[] =>
    orderItems.map((orderItem) => formInitialOrderItem(orderItem)
)


// type deleteOrderItemActionProps = FormProps & {
//   id: number
// }

// export const deleteOrderItemAction = ({id, fields}: deleteOrderItemActionProps) => {
//   fields.update(id, initOrderItem)
//   fields.remove(id)
// }

// export const useDeleteOrderItem = ({
//   index,
//   fields,
//   commonConsts,
// }) => {
//   const onConfirm = () => deleteOrderItemAction(index, fields)
//   return {
//     onClick: confirmAction(
//         onConfirm, commonConsts?.delete, commonConsts?.yes, commonConsts?.no),
//     children: commonConsts?.delete,
//   }
// }

// export const addOrderItemAction = (push) => push('order_items', initOrderItem)

// export const useAddOrderItem = ({
//   form: {
//     mutators: {
//       push,
//     },
//   },
//   commonConsts,
// }) => ({
//   onClick: () => addOrderItemAction(push),
//   children: commonConsts?.add,
// })



// export const useFieldLabels = ({options}) => {
//   const orderItemOptions = orderOrderItemOptions(options)
//   return tableFieldNames.map((tableFieldName) =>
//     orderItemOptions[tableFieldName]?.label)
// }
