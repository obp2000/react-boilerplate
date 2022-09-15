import React from 'react'
import { Row, Col, Badge } from 'reactstrap'
import { useOptionsOuery } from '../options/hooks'

export type Props = {
  indexUrl: string
  totalCount: number
}

const Header = ({ indexUrl, totalCount }: Props): JSX.Element => {
  const { options } = useOptionsOuery(indexUrl)
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

export default Header
