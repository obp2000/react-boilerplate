'use client'

import { useDropdown as useCityDropdownAttrs } from '@/cities/hooks'
import DropdownListFormGroup from '@/dropdownList/DropdownListFormGroup'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import { CommonConstsType } from '@/interfaces/commonConsts'
import type { Customer, CustomerFormValues } from '@/interfaces/customers'
import { AnyObjectOptionsType } from '@/interfaces/options'
import Layout from '@/objectForm/Layout'
import { mutateObject } from '@/services/api/client'
import { MainContext } from '@/services/context'
import { validate } from "@/validators/validators"
import { useRouter } from 'next/navigation'
import { Field, Form } from 'react-final-form'
import { Col, Row } from 'reactstrap'
import { indexUrl, modFormValues, validatedFields } from './config'

export default function FormComp({
  id,
  initialValues,
  commonConsts,
  options,
  accessToken
}: { id: string } & { initialValues: Customer | {} } & CommonConstsType &
  AnyObjectOptionsType & { accessToken: string }) {
  const { refresh, push } = useRouter()
  const onSubmit = (values: CustomerFormValues) => mutateObject(id,
    modFormValues(values), indexUrl, accessToken, commonConsts?.successfully,
    refresh, push)
  return <Form {...{
    name: 'objectForm',
    initialValues,
    validate: validate({
      errorMessages: commonConsts?.error_messages,
      validatedFields
    }),
    onSubmit
  }} >
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
