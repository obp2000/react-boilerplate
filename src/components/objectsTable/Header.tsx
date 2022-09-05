import {Row, Col, Badge} from 'reactstrap'
import {useOptionsOuery} from '../options/hooks'
import type {TableConfig} from '../objectsTable/ObjectsTable'

export type Props = TableConfig & {
  totalCount?: number
}

export default ({totalCount = 0, indexUrl}: Props): JSX.Element => {
  // const {totalCount = 0} = useObjects(getObjects)
  const {options} = useOptionsOuery(indexUrl)
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
