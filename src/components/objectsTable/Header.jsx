import PropTypes from 'prop-types'
import React from 'react'
import {Row, Col, Badge} from 'reactstrap'

const emptyObject = {}

const Header = ({totalCount, options}) => {
  return <Row>
    <Col sm={2}>
      <h3 aria-label={options?.name_plural}>
        {options?.name_plural}
      </h3>
    </Col>
    <Col>
      <h4 aria-label='Total count'>
        <Badge>{totalCount}</Badge>
      </h4>
    </Col>
  </Row>
}

Header.propTypes = {
  totalCount: PropTypes.number,
}

export default Header
