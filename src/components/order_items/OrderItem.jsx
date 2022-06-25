import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Button} from 'reactstrap'
import confirmAction from '../Shared/ConfirmAction'
import productsConfig from '../products/config'
import productName from '../products/name'
import {productLabels} from '../products/options'
import DropdownList from '../Shared/DropdownList'
import Input from '../Shared/Input'
import {orderItemProductOptions} from '../order_items/options'
import orderItemsConfig from '../order_items/config'

const OrderItem = ({
  orderItemName,
  fields,
  index,
  options,
  ...commonConsts
}) => <tr>
  <th scope="row">
    {index+1}
  </th>
  <td className="min-vw-35">
    <Field name={`${orderItemName}.product`}
      placeholder={options?.product.label}
      containerClassName='form-field'
      component={DropdownList}
      textField={(item) =>
        productName(item, productLabels(orderItemProductOptions(options)))}
      searchPath={productsConfig.searchUrl}
      renderListItem={({item}) =>
        productName(item, productLabels(orderItemProductOptions(options)))}
      renderValue={({item}) =>
        productName(item, productLabels(orderItemProductOptions(options)))}
      notFound={commonConsts?.not_found}
    />
  </td>
  <td>
    <Field name={`${orderItemName}.price`}
      type='number'
      placeholder={options?.price.label}
      step={1}
      min={0}
      component={Input} />
  </td>
  <td>
    <Field name={`${orderItemName}.amount`}
      type='number'
      placeholder={options?.amount.label}
      step={0.1}
      min={0}
      component={Input} />
  </td>
  <td>
    <Field name={`${orderItemName}.cost`}
      type="number"
      placeholder={options?.cost.label}
      disabled
      component={Input} />
  </td>
  <td>
    <Field name={`${orderItemName}.weight`}
      type="number"
      placeholder={options?.weight.label}
      disabled
      component={Input} />
  </td>
  <td>
    <Button size='sm' outline
      onClick={confirmAction(() =>
          orderItemsConfig.deleteOrderItemAction(fields, index),
        `${commonConsts?.delete}?`, commonConsts?.yes, commonConsts?.no)}>
      {commonConsts?.delete}
    </Button>
  </td>
</tr>

OrderItem.propTypes = {
  orderItemName: PropTypes.string,
  fields: PropTypes.object,
  index: PropTypes.number,
  options: PropTypes.object,
  commonConsts: PropTypes.object,
}

export default OrderItem
