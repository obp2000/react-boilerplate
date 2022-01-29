import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col, Badge } from 'reactstrap'
// import SearchForm from '../Search/SearchForm'

const ObjectsPageHeader = ({ title, totalCount }) =>
    <Row>
        <Col sm={2}>
            <h3>
                {title}
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
    title: PropTypes.string,
    totalCount: PropTypes.number,
}

export default ObjectsPageHeader