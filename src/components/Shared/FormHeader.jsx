import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import SubmitButton from '../Shared/SubmitButton'
import BackButton from '../Shared/BackButton'

const FormHeader = ({
        submitting,
        invalid,
        pristine,
        id,
        options: {
            name_singular
        } = {},
        children
    }) => <Row>
        <Col sm={2}>
            <BackButton />
        </Col>
        <Col sm={6}>
            <h4>
                {name_singular} № {id}{children}
            </h4>
        </Col>
        <Col sm={2}>
            <SubmitButton submitDisabled={submitting || invalid || pristine}/>
        </Col>
    </Row>

FormHeader.propTypes = {
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    id: PropTypes.number,
    object_name: PropTypes.string,
}

export default FormHeader
