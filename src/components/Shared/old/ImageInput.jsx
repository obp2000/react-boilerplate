import PropTypes from 'prop-types'
import React from 'react'
import {Input} from 'reactstrap'
import WidgetErrors from './WidgetErrors'
import FormTextList from './FormTextList'
import {getFieldAttrs, getFormText} from './FieldProps'

const ImageInputComp33 = ({
  input: {
    name: inputName,
    onChange,
    ...input
  } = {},
  name = inputName,
  id = name,
  options: {
    [name]: fieldProps = {},
  } = {},
  label: placeholder = fieldProps.label,
  required = fieldProps.required,
  readOnly = fieldProps.read_only,
  formText = fieldProps.help_text,
  meta,
  ...rest
}) => {
  console.log('input ', input)
  return <>
    <Input
      type={input.type}
      accept='.jpg, .png, .jpeg'
      {...{name,
        id,
        placeholder,
        required,
        readOnly,
      }}
      onChange={(e) => onChange(e.target.files[0])}
      invalid={meta.touched && !!meta.error}
      valid={meta.touched && !meta.error}
      {...rest}
    />
    <WidgetErrors {...meta} />
    {formText && <FormTextList {...{formText}} />}
  </>
}

const ImageInputComp = ({input, meta, options, ...props}) => {
  const formText = getFormText(input, options, props)
  delete input.value
  return <>
    <Input
    // type={input.type}
      {...input}
      {...getFieldAttrs(input, meta, options)}
      {...props}
    />
    <WidgetErrors { ...meta }/>
    {formText && <FormTextList {...{formText}} />}
  </>
}


ImageInputComp.propTypes = {
  input: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  formText: PropTypes.string,
  meta: PropTypes.object,
}

export default ImageInputComp
