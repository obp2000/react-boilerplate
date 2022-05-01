import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import FormTextList from './FormTextList'
import {getFormText, getFieldAttrs} from './FieldProps'

const SelectField = ({
  name,
  options,
  dataKey,
  textField,
  ...props
}) => {
  const formText = getFormText({name}, options, props)
  const fieldAttrs = getFieldAttrs({name}, null, options)
  const choices = fieldAttrs?.choices
  delete fieldAttrs.choices
  return <>
    <Field
      {...fieldAttrs}
      className='form-select'
      component='select'
      {...props}
    >
      {choices.map((choice, key) =>
        // <option value={choice[dataKey] == null ? '' : choice[dataKey]}
        <option value={choice[dataKey] ?? ''} key={key}>
          {choice[textField]}
        </option>,
      )}
    </Field>
    {formText && <FormTextList {...{formText}} />}
  </>
}

SelectField.propTypes = {
  name: PropTypes.string,
  options: PropTypes.object,
  dataKey: PropTypes.string,
  textField: PropTypes.string,
  props: PropTypes.object,
}

export default SelectField


// const SelectField = ({
//   name,
//   // id = name,
//   options,
//   // options: {
//   //   [name]: field_props = {},
//   // } = {},
//   // label: placeholder = field_props.label,
//   // required = field_props.required,
//   // readOnly = field_props.read_only,
//   // choices = field_props.choices || [],
//   dataKey,
//   textField,
//   // formText = field_props.help_text,
//   ...props
// }) => {
//   const formText = getFormText({name}, options, props)
//   const fieldAttrs = getFieldAttrs({name}, null, options)
//   const choices = fieldAttrs?.choices
//   delete fieldAttrs.choices
//   return <>
//     <Field
//       {...fieldAttrs}
//       className='form-select'
//       component='select'
//       {...props}
//     >
//       {choices.map((choice, key) =>
//         <option value={choice[dataKey] == null ? '' : choice[dataKey]}
//           key={key}>
//           {choice[textField]}
//         </option>,
//       )}
//     </Field>
//     {formText && <FormTextList {...{formText}} />}
//   </>
// }
