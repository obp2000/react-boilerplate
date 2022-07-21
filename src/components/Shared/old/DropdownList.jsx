import PropTypes from 'prop-types'
import React from 'react'
import DropdownList from 'react-widgets/DropdownList'
import {useOutletContext} from 'react-router-dom'
import WidgetErrors from './WidgetErrors'
import FormTextList from './FormTextList'
import {useFormText, getFieldAttrs} from './FieldProps'
import {useSearchObjects} from './hooks'

const DropdownListComp = ({
  input,
  meta,
  options = useOutletContext()?.options,
  searchPath,
  ...props
}) => {
  const searchAttrs = useSearchObjects({searchPath, ...props})
  return <>
    <DropdownList
      {...input}
      {...getFieldAttrs({input, meta, options})}
      {...searchAttrs}
      filter='contains'
      {...props}
    />
    <WidgetErrors {...meta} />
    <FormTextList formText={useFormText(input, options, props)} />
  </>
}

DropdownListComp.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  options: PropTypes.object,
  props: PropTypes.string,
}

export default DropdownListComp
