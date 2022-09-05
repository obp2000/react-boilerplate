import {Row, Col} from 'reactstrap'
import type {FormRenderProps} from 'react-final-form'
import SubmitButton from '../submitButton/SubmitButton'
import BackButton from '../backButton/BackButton'
import Date from '../Shared/date'
import {
  Customer,
  Product,
  Order,
  CustomerOptions,
  ProductOptions,
  OrderOptions,
  CommonConsts,
} from '../../../interfaces'

type Props = FormRenderProps & {
  object: Customer | Product | Order
  options: CustomerOptions | ProductOptions | OrderOptions
  commonConsts: CommonConsts
}

export default function ({object, options, ...props}: Props): JSX.Element {
  const label = object?.id
    ? `${options?.name_singular} № ${object?.id} ${props.commonConsts?.from} `
    : `${props.commonConsts?.new} ${options?.name_singular.toLowerCase()} `
  return <Row>
    <Col sm={2}>
      <BackButton {...props} />
    </Col>
    <Col sm={6}>
      <h4 aria-label={options?.name_singular}>
        {label}
        <Date dateString={object?.created_at} />
      </h4>
    </Col>
    <Col sm={2}>
      <SubmitButton {...props} />
    </Col>
  </Row>
}
