import { FC, useContext } from 'react'
import type { FormRenderProps } from 'react-final-form'
import { Col, Row } from 'reactstrap'
import type { CommonConstsType } from '../../../interfaces/commonConsts'
import type { AnyObjectOptionsType } from '../../../interfaces/options'
import BackButton from '../backButton/BackButton'
import { OptionsContext } from '../layout/Layout'
import Date from '../Shared/Date'
import SubmitButton from '../submitButton/SubmitButton'

const Header: FC<FormRenderProps> = (props) => {
  const { id, created_at } = props.initialValues
  const { commonConsts, options } =
    useContext(OptionsContext) as CommonConstsType & AnyObjectOptionsType
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

export default Header
