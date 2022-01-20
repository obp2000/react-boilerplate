import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import dropdownListComponent from '../Shared/renderDropdownList'

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
        />

DeliveryTypeField.propTypes = {
    delivery_types: PropTypes.array.isRequired,
}

export default DeliveryTypeField

//   <option value="" />
//   {delivery_types.map((delivery_type, index) =>
//       <option key={index} value={delivery_type.value}>
//           {delivery_type.label}
//       </option>)}
// </Field>