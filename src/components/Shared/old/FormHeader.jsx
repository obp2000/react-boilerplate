import PropTypes from 'prop-types'
import React from 'react'
import {Row, Col} from 'reactstrap'
import SubmitButton from '../submitButton/SubmitButton'
import BackButton from '../backButton/BackButton'
import {useOutletContext} from 'react-router-dom'

const emptyObject = {}

const FormHeader = ({
  initialValues: {
    id,
    created_at
  } = {},
  ...props
}) => {
  const {
    options: {
      name_singular: nameSingular,
    } = {},
    commonConsts: {
      from,
    } = {}
  } = useOutletContext()
  return <Row>
    <Col sm={2}>
      <BackButton />
    </Col>
    <Col sm={6}>
      <h4 aria-label={nameSingular}>
        {nameSingular} № {id} {from} {created_at}
      </h4>
    </Col>
    <Col sm={2}>
      <SubmitButton {...props} />
    </Col>
  </Row>
}

FormHeader.propTypes = {
  id: PropTypes.number,
  created_at: PropTypes.string,
  props: PropTypes.object,
}

export default FormHeader
