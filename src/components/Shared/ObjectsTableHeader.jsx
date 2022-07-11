import React from 'react'
import {useOutletContext} from 'react-router-dom'
import {Row, Col, Badge} from 'reactstrap'
import {useObjectsData} from '../../services/entityAdapter'

const ObjectsTableHeader = () => {
  const {options, getObjects} = useOutletContext()
  const {totalCount = 0} = useObjectsData(getObjects)
  return <Row>
      <Col sm={2}>
        <h3 aria-labelledby={options?.name_plural}>
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

export default ObjectsTableHeader
