'use client'

import { Translation } from '@/app/i18n/dictionaries'
import {
  useDropdown as useCityDropdownAttrs
} from '@/app/[lng]/customers/cities/helpers'
import Button from '@/client/Button'
import Form from '@/client/Form'
import DropdownListFormGroup from '@/dropdownList/DropdownListFormGroup'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import { mutateObject } from '@/app/[lng]/[table]/[id]/client'
import { isDisabled } from '@/submitButton/hooks'
import { useRouter } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import { Field, type FormProps } from 'react-final-form'
import type { Values } from './calculator'
import { City } from '@/pages/api/cities/validators'
import { required, requiredObject } from '@/validators/validators'
import clsx from 'clsx'
import { useTransition } from 'react'

export type CustomerFormProps = FormProps['initialValues'] & {
  lng: string
  isNewObject: boolean
  params: ParsedUrlQuery
  save: string
  notFound: string
  message: string
  errorMessages: Translation['errorMessages'],
  labels: Translation['customer']
}

export default function FormComp({
  lng,
  isNewObject,
  params,
  initialValues,
  save,
  notFound,
  message,
  errorMessages,
  labels
}: CustomerFormProps) {
  const { refresh, push } = useRouter()
  const [isPending, startTransition] = useTransition()
  const onSubmit = (values: Values) => mutateObject({
    isNewObject,
    lng,
    modValues: values,
    indexUrl: '/customers/',
    refresh,
    push,
    id: params.id,
    message,
    startTransition,
  })
  return <Form {...{
    name: 'objectForm',
    initialValues,
    onSubmit,
  }} >
    {({ handleSubmit, submitting, ...props }) => {
      const busy = submitting || isPending
      return <div className={clsx('bg-white shadow-md rounded p-2 text-sm',
        { 'opacity-70': busy })}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2 pt-4">
            <Field name="nick"
              label={labels.nick}
              component={FloatingFormGroup}
              required
              validate={required(errorMessages)}
              disabled={busy}
            />
            <Field name="name"
              label={labels.name}
              component={FloatingFormGroup}
              disabled={busy}
            />
            <Field name="city"
              label={labels.city.city}
              component={DropdownListFormGroup}
              {...useCityDropdownAttrs()}
              required
              validate={requiredObject(City, errorMessages)}
              messages={{ emptyList: notFound, emptyFilter: notFound }}
              labels={labels.city}
              disabled={busy}
            />
            <Field name="address"
              label={labels.address}
              component={FloatingFormGroup}
              disabled={busy}
            />
          </div>
          <Button
            type='submit'
            size='sm'
            aria-label={save}
            disabled={isDisabled(props) || busy} >
            {save}
          </Button>
        </form>
      </div>
    }}
  </Form >
}
