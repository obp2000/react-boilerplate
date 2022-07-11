import React from 'react'
import orderItemsConfig from './config'
import {useOrderItemOptions} from './options'

const OrderItemsTableFieldNames = () => {
  const options = useOrderItemOptions()
  return orderItemsConfig.tableFieldNames.map((tableFieldName, key) =>
        <th scope="col" {...{key}}>
           {options[tableFieldName]?.label}
        </th>
    )
}

export default OrderItemsTableFieldNames
