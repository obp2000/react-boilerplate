'use client'

import { useMutate } from '@/app/_objects/hooks'
import type { Translation } from '@/app/i18n/dictionaries'
import type {
  SerializedCustomerObject,
  Values,
  CustomerFormProps
} from '@/interfaces/customers'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import { useCallback, useTransition } from 'react'
import {
  Controller, useForm, type SubmitHandler
} from "react-hook-form"
import CityField from './CityField'
import { struct } from './struct'
import { formatRu } from '@/app/components/Date'

export default function FormComp({
  lng,
  table,
  id,
  initialValues,
  save,
  notFound,
  errorMessages,
  labels
}: CustomerFormProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useMutate({ lng, table, id })
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
  const busy = isSubmitting || isPending
  function toValues({ city, createdAt, ...values }: SerializedCustomerObject) {
    return onSubmit({ cityId: city?.id, ...values })
  }
  const submitHandler = handleSubmit(toValues)
  const onSubmitButtonClick = useCallback(() => {
    if (busy) {
      return
    }
    submitHandler()
  }, [submitHandler, busy])
  console.log('errors ', errors)
  return <Grid container spacing={2} sx={{ p: 2, opacity: busy ? 0.7 : 'inherit' }}>
    <Grid xs={4}>
      <Controller name="nick"
        control={control}
        render={({ field }) => <TextField {...field}
          id="nick"
          label={`${labels.nick} *`}
          size="small"
          fullWidth
          disabled={busy}
          error={errors?.nick ? true : undefined}
          helperText={errors?.nick
            ? errorMessages[errors.nick.message as keyof Translation['errorMessages']]
            : undefined}
        />}
      />
    </Grid>
    <Grid xs={8}>
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
    </Grid>
    <Grid xs={5}>
      <CityField {...{
        labels: labels.city,
        busy,
        errors,
        errorMessages,
        notFound,
        control,
        initialValues,
      }} />
    </Grid>
    <Grid xs={7}>
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
    </Grid>
    <Grid xs={3}>
      {initialValues.createdAt && <TextField
        id='createdAt'
        label={labels.createdAt}
        size="small"
        disabled
        value={formatRu(initialValues.createdAt)}
      />}
    </Grid>
    <Grid>
      <Button
        variant="outlined"
        size="small"
        aria-label={save}
        disabled={busy || !isDirty}
        onClick={() => startTransition(onSubmitButtonClick)}
      >
        {save}
      </Button>
    </Grid>
  </Grid>
}
