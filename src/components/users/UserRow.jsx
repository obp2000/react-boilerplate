import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col } from 'reactstrap'

const UserRow = ({
    name,
    ...object
}) => {
    const {
        options = {},
        ...user
    } = object
    const field = options[name] || {}
	return <Row>
        <Col sm={2}>
            {field.label}
        </Col>
        <Col sm={8}>
            {user[name]}
        </Col>
    </Row>
}

UserRow.propTypes = {
    name: PropTypes.string,
    object: PropTypes.object
}

export default UserRow