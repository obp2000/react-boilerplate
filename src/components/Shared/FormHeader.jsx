import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col } from 'reactstrap'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/BackButton'

const FormHeader = ({
        title,
        submitting,
        invalid,
        pristine,
        object,
        children
    }) =>
    <Row>
        <Col sm={2}>
            <BackButton />
        </Col>
        <Col sm={6}>
            <h4>
                Id {object.id} {title}{children}
            </h4>
        </Col>
        <Col sm={2}>
            <SubmitButton submitDisabled={submitting || invalid || pristine}/>
        </Col>
    </Row>

FormHeader.propTypes = {
    title: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool
}

export default FormHeader
