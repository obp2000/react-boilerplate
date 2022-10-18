import { useContext } from 'react'
import { Col, Row } from 'reactstrap'
import type { CommonConstsType } from '../../../interfaces/commonConsts'
import type { HeaderProps } from '../../../interfaces/objectForm'
import type { AnyObjectOptionsType } from '../../../interfaces/options'
import BackButton from '../backButton/BackButton'
import { OptionsContext } from '../layout/Layout'
import Date from '../Shared/Date'
import SubmitButton from '../submitButton/SubmitButton'

const Header = ({ object, ...props }: HeaderProps): JSX.Element => {
  const { commonConsts, options } =
    useContext(OptionsContext) as CommonConstsType & AnyObjectOptionsType
  const label = object?.id
    ? `${options?.name_singular} № ${object?.id} ${commonConsts?.from} `
    : `${commonConsts?.new} ${options?.name_singular.toLowerCase()} `
  return <Row>
    <Col sm={2}>
      <BackButton />
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

export default Header
