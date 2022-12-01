import 'server-only'

import Badge from '@/client/Badge'
import Col from '@/client/Col'
import Row from '@/client/Row'
import { AnyObjectOptionsType } from '@/interfaces/options'

export default async function Header({
  totalCount,
  options
}: { totalCount: number } & AnyObjectOptionsType) {
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
