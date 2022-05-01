import PropTypes from 'prop-types'
import React from 'react'
import {FormGroup} from 'reactstrap'
import Input from '../Shared/Input'
import Label from './Label'

const ImageFormGroup = (props) =>
  <FormGroup floating>
    <Input {...props} />
    <Label {...props} />
  </FormGroup>

export default ImageFormGroup
