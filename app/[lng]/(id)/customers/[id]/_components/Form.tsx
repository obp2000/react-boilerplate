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
  type SubmitHandler,
  Controller
} from "react-hook-form"
import renderCity from './City'
// import TextField from './TextField'
import { errorText } from '@/app/_objects/formHelpers'
import { formatRu } from '@/app/components/Date'
import { DevTool } from '@hookform/devtools'
import { TextField } from '@mui/material'
import { getGetOptionLabel } from '@/app/customer/cities/helpers'

function FormComp({
  mutateArgs,
  initialValues,
  save,
  notFound,
  errorMessages,
  labels: {
    nick,
    name,
    address,
    createdAt,
    ...labels
  },
}: CustomerFormProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useMutate(mutateArgs)
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    handleSubmit,
    register,
    formState: {
      errors: {
        nick: nickError,
        ...errors
      },
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
  return <>
    <div
      className={`grid grid-cols-3 gap-4 p-2${busy ? ' opacity-70' : ''}`}>
      <TextField {...register('nick')}
        label={`${nick} *`}
        size="small"
        disabled={busy}
        error={!!nickError}
        helperText={errorText(errorMessages, nickError)}
      />
      <TextField {...register('name')}
        label={name}
        size="small"
        disabled={busy}
      />
      <Controller
        name="city"
        control={control}
        render={renderCity({
          label: labels.city.city,
          getOptionLabel: getGetOptionLabel(labels.city.pindex),
          busy,
          errorMessages,
          notFound,
        })} />
      <TextField {...register('address')}
        label={address}
        size="small"
        disabled={busy}
      />
      {initialValues.createdAt && <TextField
        label={createdAt}
        size="small"
        disabled
        value={formatRu(initialValues.createdAt)}
      />}
      <Button
        aria-label={save}
        disabled={busy || !isDirty}
        onClick={() => startTransition(onSubmitButtonClick)}>
        {save}
      </Button>
    </div>
    <DevTool control={control} />
  </>
}

export default FormComp
