'use client'

import { useDropdown as useCityDropdownAttrs } from '@/cities/hooks'
import Col from '@/client/Col'
import Row from '@/client/Row'
import DropdownListFormGroup from '@/dropdownList/DropdownListFormGroup'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import { IdParam } from '@/interfaces/api'
import { AccessToken } from '@/interfaces/auth'
import { CommonConstsType } from '@/interfaces/commonConsts'
import type { Customer } from '@/interfaces/customers'
import { AnyObjectOptionsType } from '@/interfaces/options'
import Layout from '@/objectForm/Layout'
import { MainContext } from '@/options/context'
import { Field, Form } from 'react-final-form'
import { useForm } from './hooks'

type Props = IdParam & { initialValues: Customer | {} } &
  CommonConstsType & AnyObjectOptionsType & Required<AccessToken>

export default function FormComp({ initialValues, ...props }: Props) {
  const { commonConsts, options } = props
  return <Form {...{ initialValues }} {...useForm(props)} >
    {(props) => <MainContext.Provider value={{ commonConsts, options }}>
      <Layout {...props}>
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
    </MainContext.Provider>}
  </Form>
}
