import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import OrderItem from './OrderItem'
// import AddOrderItemButton from './AddOrderItemButton'
import {deleteOrderItemAction, addOrderItemAction} from '../redux/Orders'
import {tableFieldNames} from '../redux/OrderItems'
// import { selectCommonConsts } from '../redux/CommonConsts'
import {productLabels} from '../redux/Products'
import {getTableLabels} from '../redux/Router'

const OrderItems = ({fields, options, add, ...consts}) => {
  // console.log('fields ', fields)
  // const deleteObjectAction = deleteOrderItemAction(fields)
  const orderItemProps = options?.order_items?.child?.children
  const productProps = orderItemProps?.product?.children
  const tableLabels = getTableLabels(tableFieldNames, orderItemProps)
  return <>
    <thead>
      <tr>
        <th scope="col">№</th>
        {tableLabels.map((label, key) =>
          <th scope="col" key={key}>{label}</th>,
        )}
        <th scope='col'>
          <Button size='sm'
            outline
            onClick={() => addOrderItemAction(fields)}>
            {add}
          </Button>
        </th>
      </tr>
    </thead>
    <tbody >
      {fields.map((orderItemName, index) =>
        <OrderItem key={index}
          {...{orderItemName,
            index,
            productLabels: productLabels(productProps),
            tableLabels,
            deleteOrderItem: () => deleteOrderItemAction(fields, index),
            ...consts,
          }}
        />,
      )}
    </tbody>
  </>
}

OrderItems.propTypes = {
  fields: PropTypes.object,
  options: PropTypes.object,
  add: PropTypes.string,
  const: PropTypes.object,
}

export default OrderItems
