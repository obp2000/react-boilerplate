import PropTypes from 'prop-types'
import React from 'react'
// import { useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
// import { selectOptions } from '../redux/CommonConsts'

const UserRow = ({
    label,
    value,
    // options,
    // ...object
}) => {
    // const options = useSelector(selectOptions)
    // const field = useSelector(selectOptions)[field_name] || {}
	return <Row>
        <Col sm={2}>
            {label}
        </Col>
        <Col sm={8}>
            {value}
        </Col>
    </Row>
}

UserRow.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string
    // options: PropTypes.object,
    // object: PropTypes.object
}

export default UserRow