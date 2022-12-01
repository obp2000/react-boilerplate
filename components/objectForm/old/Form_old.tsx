'use client'

// import Form from '@/client/Form'
import { Form } from 'react-final-form'
import type { FormConfig as CustomerFormConfig } from '@/interfaces/customers'
import type { FormConfig as OrderFormConfig } from '@/interfaces/orders'
import type { FormConfig as ProductFormConfig } from '@/interfaces/products'
// import { useObjectForm } from './hooks'
import type { AnyObjectFormValues } from '@/interfaces/objectForm'
import { mutateObject } from '@/services/api/client'
import { MainContext } from '@/services/context'
import { validate } from '@/validators/validators'
import { useRouter } from 'next/navigation'
import type { AnyObjectType, Params } from '@/interfaces/api'
import { IndexUrl } from '@/interfaces/index'
import { AuthState } from '@/interfaces/auth'
import { AnyOptionsType } from '@/interfaces/options'
import { CommonConstsType, ErrorMessagesType } from '@/interfaces/commonConsts'

type PageProps = IndexUrl & AnyObjectType & AuthState & AnyOptionsType &
  CommonConstsType & {initialValues: AnyObjectType} &
  {validateArgs: ErrorMessagesType}

export default function FormComp(
  props: CustomerFormConfig & PageProps
): JSX.Element
export default function FormComp(
  props: ProductFormConfig & PageProps
): JSX.Element
export default function FormComp(
  props: OrderFormConfig & PageProps
): JSX.Element
export default function FormComp({
  // useFormInitialValues,
  // formDecorators,
  // mutators,
  objectFormRender,
  // validatedFields,
  validateArgs,
  modFormValues,
  // objectFormConfig,
  indexUrl,
  object,
  initialValues,
  isAuthenticated,
  accessToken,
  commonConsts,
  options,
  ...props
}: any): JSX.Element {
  // const validateForm = validate(validateArgs)
  const { refresh, push } = useRouter()
  const onSubmit = (values: AnyObjectFormValues) =>
    mutateObject(object, modFormValues(values), indexUrl, accessToken,
      commonConsts?.successfully, refresh, push)
  return <MainContext.Provider value={{ commonConsts, options }}>
    <Form
      name='objectForm'
      initialValues={initialValues}
      validate={validate(validateArgs)}
      decorators={props?.formDecorators}
      mutators={props?.mutators}
      onSubmit={onSubmit}
      render={objectFormRender}
    />
  </MainContext.Provider>
}
