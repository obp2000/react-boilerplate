import PropTypes from 'prop-types'
import React from 'react'
import {Input} from 'reactstrap'
import {useOutletContext} from 'react-router-dom'
import WidgetErrors from './WidgetErrors'
import FormTextList from './FormTextList'
import {getFieldAttrs, getFormText} from './FieldProps'

const InputComp = ({
  input,
  meta,
  options = useOutletContext()?.options,
  ...props
}) => {
  if (input.type == 'file') {delete input.value}
  return <>
    <Input
      {...input}
      {...getFieldAttrs(input, meta, options)}
      {...props}
    />
    <WidgetErrors {...meta} />
    <FormTextList formText={getFormText(input, options, props)} />
  </>
}

InputComp.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  options: PropTypes.object,
  props: PropTypes.object,
}

export default InputComp


// const InputComp22 = ({
//   input,
//   options: {
//     [input.name]: fieldProps = {},
//   } = {},
//   formText = fieldProps.help_text,
//   meta,
//   ...props
// }) => {
//   // console.log('input ', input)
//   return <>
//   <Input
//     {...input}
//     {...{name: input.name,
//       id: input.name,
//       placeholder: fieldProps.label,
//       required: fieldProps.required,
//       readOnly: fieldProps.read_only,
//       min: fieldProps.min_value,
//       max: fieldProps.max_value,
//     }
//     }
//     checked={props.type == 'checkbox' && input.value ? true : false}
//     invalid={invalid(meta)}
//     valid={valid(meta)}
//     {...props}
//   />
//   <WidgetErrors { ...meta }/>
//   {formText && <FormTextList {...{formText}} />}
// </>
// }
