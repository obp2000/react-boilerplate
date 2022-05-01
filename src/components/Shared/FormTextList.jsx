import PropTypes from 'prop-types'
import React from 'react'
import {FormText} from 'reactstrap'
import parse from 'html-react-parser'

const FormTextList = ({formText}) =>
  <FormText>{parse(formText)}</FormText>

FormTextList.propTypes = {
  formText: PropTypes.string,
}

export default FormTextList
