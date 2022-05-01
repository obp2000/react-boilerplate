import PropTypes from 'prop-types'
import React from 'react'
// import { useSelector } from 'react-redux'
import {Row, Col} from 'reactstrap'
import SubmitButton from './SubmitButton'
import BackButton from './BackButton'
// import { selectOptions } from '../redux/CommonConsts'
// import { useOptions } from '../../services/apiSlice'

const FormHeader = ({
  initialValues: {
    id,
  },
  options: {
    name_singular: nameSingular,
  },
  children,
  ...rest
}) => {
  return <Row>
    <Col sm={2}>
      <BackButton {...rest} />
    </Col>
    <Col sm={6}>
      <h4>
        {nameSingular} № {id}{children}
      </h4>
    </Col>
    <Col sm={2}>
      <SubmitButton {...rest} />
    </Col>
  </Row>
}

FormHeader.propTypes = {
  initialValues: PropTypes.object,
  options: PropTypes.object,
  children: PropTypes.object,
}

export default FormHeader
