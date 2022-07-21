import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {Row, Col, Badge} from 'reactstrap'
import {useObjectsTableHeader} from './hooks'

const emptyObject = {}

const ObjectsTableHeader = ({totalCount}) => {
  const {
      options: {
          name_plural: namePlural
      } = emptyObject
  } = useOutletContext()
  return <Row>
      <Col sm={2}>
        <h3 aria-label={namePlural}>
          {namePlural}
        </h3>
      </Col>
      <Col>
        <h4 aria-label='Total count'>
          <Badge>{totalCount}</Badge>
        </h4>
      </Col>
    </Row>
}

ObjectsTableHeader.propTypes = {
  totalCount: PropTypes.number,
}

export default ObjectsTableHeader
