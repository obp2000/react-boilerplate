import { FC, useContext } from 'react'
import { Badge, Col, Row } from 'reactstrap'
import type { HeaderProps } from '@/interfaces/objectsTable'
import type { TableOptionsType } from '@/interfaces/options'
import { MainContext } from '@/services/context'

const Header: FC<HeaderProps> = ({ totalCount }) => {
  const { options } = useContext(MainContext) as TableOptionsType
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
