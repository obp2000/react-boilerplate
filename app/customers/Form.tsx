'use client'

import { useOnSubmit } from '@/app/form/hooks'
import type { Translation } from '@/app/i18n/dictionaries'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import clsx from 'clsx'
import type { ParsedUrlQuery } from 'querystring'
import { useState, useTransition } from 'react'
import {
  Controller, useForm, type SubmitHandler
} from "react-hook-form"
import CityField from './CityField'
import { Customer as ValidatonSchema } from './customer'
import type { Values, CustomerObject as Customer } from '@/interfaces/customers'

export type CustomerFormProps = {
  params: ParsedUrlQuery
  initialValues: Customer
  accessToken: string
  save: string
  notFound: string
  message: string
  errorMessages: Translation['errorMessages']
  labels: Translation['customer']
}

export default function FormComp({
  params,
  initialValues: {
    city,
    ...defaultValues
  },
  accessToken,
  save,
  notFound,
  message,
  errorMessages,
  labels
}: CustomerFormProps) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const onSubmit: SubmitHandler<Values> = useOnSubmit({
    params,
    table: 'customers',
    accessToken,
    startTransition,
    setSuccess,
    setErrorMessage,
  })
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isLoading,
      isValidating,
      isSubmitting
    }
  } = useForm<Values>({
    defaultValues,
    resolver: superstructResolver(ValidatonSchema)
  })
  const busy = isSubmitting || isPending
  console.log('errors ', errors)
  return <form onSubmit={handleSubmit(onSubmit)}
    className={clsx('p-2', { 'opacity-70': busy })}>
    <Grid container spacing={2}>
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
          city,
          labels: labels.city,
          busy,
          errors,
          errorMessages,
          setValue,
          notFound
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
          disabled={busy}
        >
          {save}
        </Button>
      </Grid>
    </Grid>
    <Snackbar open={success || !!errorMessage} autoHideDuration={3000}>
      <Alert severity={success ? "success" : "error"} elevation={6}
        variant="filled" sx={{ width: '100%' }}>
        {success ? message : errorMessage}
      </Alert>
    </Snackbar>
  </form>
}


        // {/*        <Controller name="city1"
        //   control={control}
        //   render={({ field: { ref, onChange, ...field } }) => <Autocomplete {...field}
        //     onChange={(_, data) => {
        //       setValue('city_id', data.id)
        //       return onChange(data)
        //     }}
        //     id='city1'
        //     // defaultValue={city}
        //     autoComplete
        //     includeInputInList
        //     filterSelectedOptions
        //     size='small'
        //     isOptionEqualToValue={(option, value) =>
        //       value.id ? option.id === value.id : true}
        //     getOptionLabel={getOptionLabel}
        //     renderOption={(props, city) => <li {...props} key={city?.id || -1}>
        //       {getOptionLabel(city)}
        //     </li>}
        //     options={cities}
        //     // filterOptions={(x) => x}
        //     onInputChange={onSearch('/cities/', setCities, setLoading)}
        //     noOptionsText={notFound}
        //     renderInput={(params) => <TextField {...params} {...field}
        //       inputRef={ref}
        //       label={`${labels.city.city} *`}
        //       disabled={busy}
        //       error={errors?.city ? true : undefined}
        //       helperText={errors?.city
        //         ? errorMessages[errors.city.message as keyof Translation['errorMessages']]
        //         : undefined}
        //       InputProps={{
        //         ...params.InputProps,
        //         endAdornment: (
        //           <>
        //             {loading ? <CircularProgress color="inherit" size={15} /> : null}
        //             {params.InputProps.endAdornment}
        //           </>
        //         ),
        //       }}
        //       inputProps={{
        //         ...params.inputProps,
        //         autoComplete: 'new-password',
        //       }}
        //     />}
        //   />}
        // />*/}
