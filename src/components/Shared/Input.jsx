import PropTypes from 'prop-types'
import React from 'react'
import {Input} from 'reactstrap'
import WidgetErrors from './WidgetErrors'
import FormTextList from './FormTextList'
import {useInput, useFormText} from './FieldProps'

const InputComp = (props) => <>
  <Input {...useInput(props)} />
  <WidgetErrors {...props.meta} />
  <FormTextList formText={useFormText(props)} />
</>

InputComp.propTypes = {
  props: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  options: PropTypes.object,
}

export default InputComp
