import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col, Badge } from 'reactstrap'
// import SearchForm from '../Search/SearchForm'

const ObjectsPageHeader = ({
        options: {
            name_plural
        } = {},
        totalCount
    }) =>
    <Row>
        <Col sm={2}>
            <h3>
                {name_plural}
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

ObjectsPageHeader.propTypes = {
    name_plural: PropTypes.string,
    totalCount: PropTypes.number,
}

export default ObjectsPageHeader