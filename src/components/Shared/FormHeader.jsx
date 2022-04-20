import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import SubmitButton from './SubmitButton'
import BackButton from './BackButton'
// import { selectOptions } from '../redux/CommonConsts'
// import { useOptions } from '../../services/apiSlice'

const FormHeader = ({
    initialValues: {
        id
    },
    name_singular,
    children,
    ...rest
}) => {
    return <Row>
        <Col sm={2}>
            <BackButton />
        </Col>
        <Col sm={6}>
            <h4>
                {name_singular} № {id}{children}
            </h4>
        </Col>
        <Col sm={2}>
            <SubmitButton {...rest} />
        </Col>
    </Row>
}

FormHeader.propTypes = {
    id: PropTypes.number,
    // object_name: PropTypes.string
}

export default FormHeader
