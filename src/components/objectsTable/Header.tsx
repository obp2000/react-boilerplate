import {Row, Col, Badge} from 'reactstrap'
import {useOptionsOuery} from '../options/hooks'
import { useObjects } from '../../services/entityAdapter'
import type {GetObjectsEndpoint} from '../../services/entityAdapter'

export type Props = {
  indexUrl: string
  getObjects: GetObjectsEndpoint
}

const Header = ({indexUrl, getObjects}: Props): JSX.Element => {
  const {totalCount = 0} = useObjects(getObjects)
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

export default Header
