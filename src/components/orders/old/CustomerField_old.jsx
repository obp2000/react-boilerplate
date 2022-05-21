import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Actions} from '../redux/Customers'
import CustomerName from '../customers/CustomerName'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'

const CustomerField = ({
  options,
  options: {
    customer: {
      children: customer_props = {},
    } = {},
  } = {},
}) =>
  <Field name="customer"
    component={DropdownListFormGroup}
    dataKey='id'
    textField={(item) => CustomerName(item, customer_props)}
    search_path={Actions.searchUrl}
    label_col_size={2}
    renderListItem={({item}) => CustomerName(item, customer_props)}
    renderValue={({item}) => CustomerName(item, customer_props)}
    {...{options}}
  />

CustomerField.propTypes = {
  options: PropTypes.object,
  customer_props: PropTypes.object,
}

export default CustomerField
