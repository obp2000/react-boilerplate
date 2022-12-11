import 'server-only'

import BackButton from '@/backButton/BackButton'
import Date from '@/Date'
import type { CommonConstsType } from '@/interfaces/commonConsts'
import type { AnyObjectOptionsType } from '@/interfaces/options'
import Col from '@/client/Col'
import Row from '@/client/Row'
import { AnyObjectType } from '@/interfaces/api'

export default function Header({
  object,
  commonConsts,
  options
}: AnyObjectType & CommonConstsType & AnyObjectOptionsType) {
  const label = object?.id
    ? `${options?.name_singular} № ${object.id} ${commonConsts?.from} `
    : `${commonConsts?.new} ${options?.name_singular.toLowerCase()} `
  return <Row>
    <Col sm={2}>
      <BackButton {...{ commonConsts }} />
    </Col>
    <Col sm={6}>
      <h4 aria-label={options?.name_singular}>
        {label}
        {object?.created_at && <Date dateString={object.created_at} />}
      </h4>
    </Col>
  </Row>
}
