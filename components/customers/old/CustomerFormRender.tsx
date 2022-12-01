import { useDropdown as useCityDropdownAttrs } from '@/cities/hooks'
import DropdownListFormGroup from '@/dropdownList/DropdownListFormGroup'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Row } from 'reactstrap'
import Layout from '@/objectForm/Layout'

export default function CustomerFormRender(props: FormRenderProps) {
  return <Layout {...props}>
    <Row>
      <Col sm={3}>
        <Field name="nick" component={FloatingFormGroup} />
      </Col>
      <Col sm={6}>
        <Field name="name" component={FloatingFormGroup} />
      </Col>
      <Col sm={6}>
        <Field
          name="city"
          component={DropdownListFormGroup}
          {...useCityDropdownAttrs()}
        />
      </Col>
      <Col sm={8}>
        <Field name="address" component={FloatingFormGroup} />
      </Col>
    </Row>
  </Layout>
}
