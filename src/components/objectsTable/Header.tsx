import React from 'react'
import { Row, Col, Badge } from 'reactstrap'
import { TableOptions } from '../../../interfaces'

export type Props = {
  options?: TableOptions
  totalCount: number
}

const Header = ({ options, totalCount }: Props): JSX.Element => <Row>
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

export default Header
