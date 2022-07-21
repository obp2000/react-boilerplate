import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import FormTextList from './FormTextList'
import {useFormText, useSelectField} from './FieldProps'

const SelectField = (props) => {
  const {fieldAttrs, selectOptions} = useSelectField(props)
  return <>
    <Field {...fieldAttrs} className='form-select' component='select'>
      {selectOptions?.map(({value, label}, key) =>
        <option {...{value, key}}>{label}</option>
      )}
    </Field>
    <FormTextList formText={useFormText(props)} />
  </>
}

SelectField.propTypes = {
  props: PropTypes.object,
}

export default SelectField
