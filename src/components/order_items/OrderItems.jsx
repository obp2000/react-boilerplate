import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import OrderItem from './OrderItem'
import orderItemsConfig from '../order_items/config'

const OrderItems = ({fields, options, ...commonConsts}) => {
  return <>
    <thead>
      <tr>
        <th scope="col">№</th>
        {orderItemsConfig.tableFieldNames.map((tableFieldName, key) =>
          <th scope="col" key={key}>
            {options[tableFieldName]?.label}
          </th>
        )}
        <th scope='col'>
          <Button size='sm'
            outline
            onClick={() => orderItemsConfig.addOrderItemAction(fields)}>
            {commonConsts?.add}
          </Button>
        </th>
      </tr>
    </thead>
    <tbody >
      {fields.map((orderItemName, index) =>
        <OrderItem key={index}
          {...{orderItemName,
            fields,
            index,
            options,
            ...commonConsts,
          }}
        />,
      )}
    </tbody>
  </>
}

OrderItems.propTypes = {
  fields: PropTypes.object,
  options: PropTypes.object,
  commonConsts: PropTypes.object,
}

export default OrderItems
