import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col } from 'reactstrap'

const UserRow = ({
    name,
    options,
    ...object
}) => {
    const field = options[name] || {}
	return <Row>
        <Col sm={2}>
            {field.label}
        </Col>
        <Col sm={8}>
            {object[name]}
        </Col>
    </Row>
}

UserRow.propTypes = {
    name: PropTypes.string,
    options: PropTypes.object,
    object: PropTypes.object
}

export default UserRow