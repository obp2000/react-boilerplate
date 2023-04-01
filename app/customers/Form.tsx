'use client'

import { useOnSubmit } from '@/app/form/hooks'
import type { Translation } from '@/app/i18n/dictionaries'
import type { CustomerObject as Customer, Values } from '@/interfaces/customers'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import { useTransition } from 'react'
import {
  Controller, useForm, type SubmitHandler
} from "react-hook-form"
import CityField from './CityField'
import { Customer as ValidatonSchema } from './customer'

export type CustomerFormProps = {
  mutateUrl: string
  mutateMethod: string
  redirectUrl: string
  initialValues: Customer
  accessToken: string
  save: string
  notFound: string
  message: string
  errorMessages: Translation['errorMessages']
  labels: Translation['customer']
}

export default function FormComp({
  mutateUrl,
  mutateMethod,
  redirectUrl,
  initialValues,
  accessToken,
  save,
  notFound,
  message,
  errorMessages,
  labels
}: CustomerFormProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useOnSubmit({
    mutateUrl,
    mutateMethod,
    redirectUrl,
    accessToken,
    startTransition,
    message,
  })
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isDirty,
      isValid,
    }
  } = useForm<Customer>({
    defaultValues: initialValues,
    resolver: superstructResolver(ValidatonSchema)
  })
  const busy = isSubmitting || isPending
  console.log('errors ', errors)
  const toValues = ({ city, createdAt, ...values }: Customer) => {
    return onSubmit({ cityId: city?.id, ...values })
  }
  return <form onSubmit={handleSubmit(toValues)}>
    <Grid container spacing={2} sx={{ p: 2, opacity: busy ? 0.7 : 'inherit' }}>
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
      <Grid>
        <Button
          type='submit'
          variant="outlined"
          size="small"
          aria-label={save}
          disabled={busy || !isDirty}
        >
          {save}
        </Button>
      </Grid>
    </Grid>
  </form>
}
