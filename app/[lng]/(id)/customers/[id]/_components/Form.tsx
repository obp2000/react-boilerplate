'use client'

import { useMutate } from '@/app/_objects/hooks'
import Button from '@/app/components/Button'
import { struct } from '@/app/customer/struct'
import type {
  CustomerFormProps,
  SerializedCustomerObject,
  Values
} from '@/interfaces/customers'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { useCallback, useTransition } from 'react'
import {
  useForm,
  type SubmitHandler
} from "react-hook-form"
import Address from './Address'
import CityField from './CityField'
import CreatedAt from './CreatedAt'
import Name from './Name'
import Nick from './Nick'

function FormComp({
  mutateArgs,
  initialValues,
  save,
  notFound,
  errorMessages,
  labels,
}: CustomerFormProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useMutate(mutateArgs)
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    }
  } = useForm({
    defaultValues: initialValues,
    resolver: superstructResolver(struct)
  })
  const onSubmitButtonClick = useCallback(() => {
    handleSubmit(
      ({ city, createdAt, ...values }: SerializedCustomerObject) =>
        onSubmit({ cityId: city?.id, ...values })
    )()
  },
    [handleSubmit, onSubmit]
  )
  // console.log('errors ', errors)
  const busy = isSubmitting || isPending
  return <div
    className={`grid grid-cols-2 gap-4 p-2 ${busy ? 'opacity-70' : ''}`}>
    <Nick {...{ control, labels, busy, errorMessages, errors }} />
    <Name {...{ control, labels, busy }} />
    <CityField {...{
      labels,
      busy,
      errors,
      errorMessages,
      notFound,
      control,
      initialValues,
    }} />
    <Address {...{ control, labels, busy }} />
    <CreatedAt {...{ initialValues, labels }} />
    <Button
      aria-label={save}
      disabled={busy || !isDirty}
      onClick={() => startTransition(onSubmitButtonClick)}>
      {save}
    </Button>
  </div>
}

export default FormComp
