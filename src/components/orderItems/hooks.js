import PropTypes from 'prop-types'
import React from 'react'
import {orderOrderItemOptions} from '../orders/hooks'
import confirmAction from '../confirmation/ConfirmAction'
import ProductName from '../products/ProductName'
import {useDropdown as useProductDropdownAttrs} from '../products/hooks'
import {cost, weight} from '../orders/Calculator'
import DropdownList from '../dropdownList/DropdownList'

const emptyObject = {}

const emptyArray = []

export const tableFieldNames = [
  'product',
  'price',
  'amount',
  'cost',
  'weight',
]

export const orderItemProductOptions = ({
  product: {
    children,
  } = emptyObject,
} = emptyObject) => children

const initOrderItem = {
  product: undefined,
  price: 0,
  amount: 0,
  cost: 0,
  weight: 0,
  _destroy: false,
}

const deleteOrderItemAction = (id, fields) => {
  fields.update(id, initOrderItem)
  fields.remove(id)
}

export const useDeleteOrderItem = ({
  index,
  fields,
  commonConsts,
}) => {
  const onConfirm = () => deleteOrderItemAction(index, fields)
  return {
    onClick: confirmAction(
        onConfirm, commonConsts?.delete, commonConsts?.yes, commonConsts?.no),
    children: commonConsts?.delete,
  }
}

const addOrderItemAction = (push) => push('order_items', initOrderItem)

export const useAddOrderItem = ({
  form: {
    mutators: {
      push,
    },
  },
  commonConsts,
}) => ({
  onClick: () => addOrderItemAction(push),
  children: commonConsts?.add,
})

export const useProductDropdown = ({options}) => {
  return {
    ...useProductDropdownAttrs(orderItemProductOptions(orderOrderItemOptions(options))),
    component: DropdownList,
    options,
  }
}

export const formInitialOrderItem = (orderItem) => ({
  ...orderItem,
  cost: cost(orderItem),
  weight: weight(orderItem),
})

export const formInitialOrderItems = (orderItems = emptyArray) =>
  orderItems.map((orderItem, index) => formInitialOrderItem(orderItem)
  )

export const useFieldLabels = ({options}) => {
  const orderItemOptions = orderOrderItemOptions(options)
  return tableFieldNames.map((tableFieldName) =>
    orderItemOptions[tableFieldName]?.label)
}
