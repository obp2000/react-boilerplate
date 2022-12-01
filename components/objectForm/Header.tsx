import BackButton from '@/backButton/BackButton'
import Date from '@/Date'
import type { CommonConstsType } from '@/interfaces/commonConsts'
import type { AnyObjectOptionsType } from '@/interfaces/options'
import { MainContext } from '@/services/context'
import SubmitButton from '@/submitButton/SubmitButton'
import { useContext } from 'react'
import type { FormRenderProps } from 'react-final-form'
import { Col, Row } from 'reactstrap'

export default function Header(props: FormRenderProps) {
  const { id, created_at } = props.initialValues
  const { commonConsts, options } =
    useContext(MainContext) as CommonConstsType & AnyObjectOptionsType
  const label = id
    ? `${options?.name_singular} № ${id} ${commonConsts?.from} `
    : `${commonConsts?.new} ${options?.name_singular.toLowerCase()} `
  return <Row>
    <Col sm={2}>
      <BackButton />
    </Col>
    <Col sm={6}>
      <h4 aria-label={options?.name_singular}>
        {label}
        <Date dateString={created_at} />
      </h4>
    </Col>
    <Col sm={2}>
      <SubmitButton {...props} />
    </Col>
  </Row>
}
