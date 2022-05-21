import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Button} from 'reactstrap'
import confirmAction from '../Shared/ConfirmAction'
import productsConfig from '../redux/Products'
import productName from '../products/ProductName'
import DropdownList from '../Shared/DropdownList'
import Input from '../Shared/Input'

const OrderItem = ({
  orderItemName,
  index,
  productLabels,
  tableLabels,
  deleteOrderItem,
  delete: textDelete,
  yes,
  no,
  not_found: notFound,
}) => <tr>
  <th scope="row">
    {index+1}
  </th>
  <td className="min-vw-35">
    <Field name={`${orderItemName}.product`}
      label={tableLabels[0]}
      containerClassName='form-field'
      component={DropdownList}
      dataKey='id'
      textField={(item) => productName(item, productLabels)}
      search_path={productsConfig.searchUrl}
      renderListItem={({item}) => productName(item, productLabels)}
      renderValue={({item}) => productName(item, productLabels)}
      not_found={notFound}
    />
  </td>
  <td>
    <Field name={`${orderItemName}.price`}
      type='number'
      label={tableLabels[1]}
      step={1}
      min={0}
      component={Input} />
  </td>
  <td>
    <Field name={`${orderItemName}.amount`}
      type='number'
      label={tableLabels[2]}
      step={0.1}
      min={0}
      component={Input} />
  </td>
  <td>
    <Field name={`${orderItemName}.cost`}
      type="number"
      label={tableLabels[3]}
      disabled
      component={Input} />
  </td>
  <td>
    <Field name={`${orderItemName}.weight`}
      type="number"
      label={tableLabels[4]}
      disabled
      component={Input} />
  </td>
  <td>
    <Button size='sm' outline
      onClick={confirmAction(deleteOrderItem, `${textDelete}?`, yes, no)}>
      {textDelete}
    </Button>
  </td>
</tr>

OrderItem.propTypes = {
  orderItemName: PropTypes.string,
  index: PropTypes.number,
  productLabels: PropTypes.object,
  tableLabels: PropTypes.array,
  deleteOrderItem: PropTypes.func,
  delete: PropTypes.string,
  yes: PropTypes.string,
  no: PropTypes.string,
}

export default OrderItem
