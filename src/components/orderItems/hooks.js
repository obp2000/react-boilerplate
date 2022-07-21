import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {orderOrderItemOptions} from '../orders/hooks'
import confirmAction from '../confirmation/ConfirmAction'
import ProductName from '../products/ProductName'
import {useDropdown as useProductDropdownAttrs} from '../products/hooks'
import {cost, weight} from '../orders/Calculator'

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
    children
  } = emptyObject
} = emptyObject) => children

export const useOrderItemOptions = () => {
  const {options} = useOutletContext()
  return orderOrderItemOptions(options) ?? emptyObject
}

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

export const useDeleteOrderItem = (index, fields) => {
  const {
    commonConsts: {
      delete: textDelete,
      yes,
      no
    } = emptyObject,
  } = useOutletContext()
  const onConfirm = () => deleteOrderItemAction(index, fields)
  return {
      onClick: confirmAction(onConfirm, textDelete, yes, no),
      children: textDelete,
  }
}

const addOrderItemAction = (push) => push('order_items', initOrderItem)

export const useAddOrderItem = ({
  form: {
    mutators: {
      push
    }
  }
}) => {
  const {
    commonConsts: {
      add,
    } = emptyObject,
  } = useOutletContext()
  return {
      onClick: () => addOrderItemAction(push),
      children: add,
  }
}

export const useProductDropdown = () => {
    const options = orderItemProductOptions(useOrderItemOptions())
    return useProductDropdownAttrs(options)
}

export const formInitialOrderItem = (orderItem) => ({
      ...orderItem,
      cost: cost(orderItem),
      weight: weight(orderItem),
  })

export const formInitialOrderItems = (orderItems = emptyArray) =>
  orderItems.map((orderItem, index) => formInitialOrderItem(orderItem)
  )

export const useFieldLabels = () => {
  const orderItemOptions = useOrderItemOptions()
  return tableFieldNames.map((tableFieldName) =>
          orderItemOptions[tableFieldName]?.label)
}
