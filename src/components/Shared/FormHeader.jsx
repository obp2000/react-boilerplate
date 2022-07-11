import PropTypes from 'prop-types'
import React from 'react'
import {Row, Col} from 'reactstrap'
import SubmitButton from './SubmitButton'
import BackButton from './BackButton'
import {useOutletContext} from 'react-router-dom'

const FormHeader = ({
  id,
  created_at,
  ...props
}) => {
  const {options, commonConsts} = useOutletContext()
  return <Row>
    <Col sm={2}>
      <BackButton />
    </Col>
    <Col sm={6}>
      <h4 aria-label={options?.name_singular}>
        {options?.name_singular} № {id} {commonConsts?.from} {created_at}
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
