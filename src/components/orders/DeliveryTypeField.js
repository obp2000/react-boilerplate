import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import dropdownListComponent from '../renderDropdownList'

const renderValue = ({ item }) => 
        <span>
            <strong>hi,</strong>{' ' + item.label}
        </span>




const DeliveryTypeField = ({
    delivery_types,
}) => <Field
        name='delivery_type'
        component={dropdownListComponent}
        textField='label'
        data={delivery_types}
        dataKey='id'
        filter={"contains"}
        // defaultValue={1000}
        // renderValue={renderValue}
        />
//   <option value="" />
//   {delivery_types.map((delivery_type, index) =>
//       <option key={index} value={delivery_type.value}>
//           {delivery_type.label}
//       </option>)}
// </Field>

DeliveryTypeField.propTypes = {
    delivery_types: PropTypes.array.isRequired,
}

export default DeliveryTypeField