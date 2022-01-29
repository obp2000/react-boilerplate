import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col } from 'reactstrap'

const UserRow = ({name, value}) =>
	<Row>
        <Col sm={2}>
            {name}
        </Col>
        <Col sm={8}>
            {value}
        </Col>
    </Row>

UserRow.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string
}

export default UserRow