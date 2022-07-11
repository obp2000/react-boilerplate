import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'

const emptyObject = {}

export const orderCustomerOptions = ({
  customer: {
    children
  } = emptyObject
} = emptyObject) => children

export const orderOrderItemOptions = ({
  order_items: {
    child: {
      children
    } = emptyObject
  } = emptyObject
} = emptyObject) => children

export const useOrderCustomerOptions = () => {
  const {options: orderOptions} = useOutletContext()
  return orderCustomerOptions(orderOptions)
}
