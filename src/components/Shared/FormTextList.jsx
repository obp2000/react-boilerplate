import PropTypes from 'prop-types'
import React from 'react'
import {FormText} from 'reactstrap'
import parse from 'html-react-parser'

const FormTextList = ({formText}) => {
  if (formText) {
    return <FormText>{parse(formText)}</FormText>
  } else {
    return null
  }
}

FormTextList.propTypes = {
  formText: PropTypes.string,
}

export default FormTextList
