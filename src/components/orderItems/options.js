import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {orderOrderItemOptions} from '../orders/options'

const emptyObject = {}

export const orderItemProductOptions = ({
  product: {
    children
  } = emptyObject
} = emptyObject) => children

export const useOrderItemOptions = () => {
  const {options: orderOptions} = useOutletContext()
  return orderOrderItemOptions(orderOptions) ?? emptyObject
}
