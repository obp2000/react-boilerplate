'use client'

import Button from '@/app/components/Button'
import { formatRu } from '@/app/components/Date'
import { useMutate } from '@/app/_objects/hooks'
import type {
  CustomerFormProps,
  SerializedCustomerObject,
  Values
} from '@/interfaces/customers'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { useCallback, useTransition } from 'react'
import {
  Controller,
  useForm,
  type SubmitHandler
} from "react-hook-form"
import CityField from './CityField'
import { struct } from './struct'
import { errorText } from '@/app/_objects/formHelpers'

export default function FormComp({
  tablePath,
  id,
  initialValues,
  save,
  notFound,
  errorMessages,
  labels
}: CustomerFormProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useMutate({ tablePath, id })
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    handleSubmit,
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
  const toValues = useCallback(
    ({ city, createdAt, ...values }: SerializedCustomerObject) =>
      onSubmit({ cityId: city?.id, ...values })
    , [onSubmit])
  const onSubmitButtonClick = useCallback(() => {
    handleSubmit(toValues)()
  }, [handleSubmit, toValues])
  // console.log('errors ', errors)
  const busy = isSubmitting || isPending
  return <div className={`grid grid-cols-2 gap-4 p-2 ${busy ? 'opacity-70' : ''}`}>
    <Controller name="nick"
      control={control}
      render={({ field }) => <TextField {...field}
        id="nick"
        label={`${labels.nick} *`}
        size="small"
        fullWidth
        disabled={busy}
        error={!!nickError}
        // helperText={nickError
        //   ? errorMessages[nickError.message as keyof Translation['errorMessages']]
        //   : undefined}
        helperText={errorText(errorMessages, nickError)}
      />}
    />
    <Controller name="name"
      control={control}
      render={({ field }) => <TextField {...field}
        id="name"
        label={labels.name}
        size="small"
        fullWidth
        disabled={busy}
      />}
    />
    <CityField {...{
      labels: labels.city,
      busy,
      errors,
      errorMessages,
      notFound,
      control,
      initialValues,
    }} />
    <Controller name="address"
      control={control}
      render={({ field }) => <TextField {...field}
        id="address"
        label={labels.address}
        size="small"
        fullWidth
        disabled={busy}
      />}
    />
    {initialValues.createdAt && <TextField
      id='createdAt'
      label={labels.createdAt}
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
}


    // {/*      <Button
    //     variant="outlined"
    //     size="small"
    //     aria-label={save}
    //     disabled={busy || !isDirty}
    //     onClick={() => startTransition(onSubmitButtonClick)}
    //   >
    //     {save}
    //   </Button>*/}
    // {/*    <button 
    //   aria-label={save}
    //   disabled={busy || !isDirty}
    //   onClick={() => startTransition(onSubmitButtonClick)}
    //   className='px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm'>
    //   {save}
    // </button>*/}
