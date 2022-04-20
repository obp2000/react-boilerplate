import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col, Badge } from 'reactstrap'
import { useSelector } from 'react-redux'
import { selectOptions } from '../redux/CommonConsts'

const ObjectsPageHeader = ({
    totalCount
}) => {
    return <Row>
        <Col sm={2}>
            <h3>
                {useSelector(selectOptions).name_plural}
            </h3>
        </Col>
        <Col>
            <h4>
                <Badge>
                    {totalCount}
                </Badge>
            </h4>
        </Col>
    </Row>
}

ObjectsPageHeader.propTypes = {
    totalCount: PropTypes.number,
}

export default ObjectsPageHeader