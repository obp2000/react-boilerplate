'use client'

import type { Translation } from '@/app/i18n/dictionaries'
import { mutateObject } from '@/app/[lng]/[table]/[id]/client'
import Button from '@mui/material/Button'
// import { isDisabled } from '@/submitButton/hooks'
import { useRouter } from 'next/navigation'
import type { ParsedUrlQuery } from 'querystring'
// import { Field, type FormProps } from 'react-final-form'
import type { Values } from './calculator'
// import { required, requiredObject } from '@/validators/validators'
// import clsx from 'clsx'
import { Customer } from './customer'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { useState, useTransition, type SyntheticEvent } from 'react'
import {
  Controller, FormProvider, useForm, type Path, type SubmitHandler, type UseFormRegister
} from "react-hook-form"
import { onSearch } from '@/dropdownList/hooks'
import { getGetOptionLabel, type City } from '@/app/customers/cities/helpers'
// import DropdownList from '@/app/client/DropdownList'
// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'

export type CustomerFormProps = {
  lng: string
  isNewObject: boolean
  params: ParsedUrlQuery
  initialValues: Values
  save: string
  notFound: string
  message: string
  errorMessages: Translation['errorMessages']
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
  // const onSubmit: SubmitHandler<Values> = (values) => mutateObject({
  //   isNewObject,
  //   lng,
  //   values,
  //   indexUrl: '/customers/',
  //   refresh,
  //   push,
  //   id: params.id,
  //   message,
  //   startTransition,
  // })
  const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const {
    control,
    watch,
    handleSubmit,
    formState: {
      errors,
      isLoading,
      isValidating,
      isSubmitting
    }
  } = useForm<Values>({
    defaultValues: initialValues,
    resolver: superstructResolver(Customer)
  })
  const busy = isSubmitting || isPending
  const [cities, setCities] = useState([initialValues.city || null])
  const [loading, setLoading] = useState(false)
  // console.log(watch("city")) // watch input value by passing the name of it
  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 md:grid-cols-2 pt-4">
        <Controller name="nick"
          control={control}
          render={({ field }) => <TextField {...field}
            id="nick"
            label={`${labels.nick} *`}
            variant="outlined"
            size="small"
            disabled={busy}
            error={errors?.nick ? true : undefined}
            helperText={errors?.nick ? errorMessages[errors.nick.message] : undefined}
          />}
        />
        <Controller name="name"
          control={control}
          render={({ field }) => <TextField {...field}
            id="name"
            label={labels.name}
            variant="outlined"
            size="small"
            disabled={busy}
          />}
        />
        <Controller name="city"
          control={control}
          render={({ field: { ref, onChange, ...field } }) => <Autocomplete {...field}
            onChange={(_, data) => onChange(data)}
            id='city'
            size='small'
            getOptionLabel={getGetOptionLabel(labels.city)}
            options={cities}
            // filterOptions={(x) => x}
            onInputChange={onSearch('/cities/', setCities, setLoading)}
            noOptionsText={notFound}
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                inputRef={ref}
                label={labels.city.city}
                required
                error={errors?.city ? true : undefined}
                helperText={errors?.city ? errorMessages[errors.city.message] : undefined}
                InputProps={{
                  disabled: busy,
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={15} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />}
        />
        <Controller name="address"
          control={control}
          render={({ field }) => <TextField {...field}
            id="address"
            label={labels.address}
            variant="outlined"
            size="small"
            disabled={busy}
          />}
        />
      </div>
      <Button
        type='submit'
        variant="outlined"
        size="small"
        aria-label={save}
        disabled={busy}
      >
        {save}
      </Button>
    </form>
  </div>
}


// {/*          <Controller name="city"
//             control={control}
//             render={({ field }) => <DropdownList {...field}
//               label={labels.city.city}
//               {...useCityDropdownAttrs()}
//               labels={labels.city}
//               messages={{ emptyList: notFound, emptyFilter: notFound }}
//               disabled={busy}
//             />}
//           />*/}

  // return <Form {...{
  //   name: 'objectForm',
  //   initialValues,
  //   onSubmit,
  // }} >
  //   {({ handleSubmit, submitting, ...props }) => {
  //     const busy = submitting || isPending
  //     return <div className={clsx('bg-white shadow-md rounded p-2 text-sm',
  //       { 'opacity-70': busy })}>
  //       <form onSubmit={handleSubmit}>
  //         <div className="grid gap-6 mb-6 md:grid-cols-2 pt-4">
  //           <Field name="nick"
  //             label={labels.nick}
  //             component={FloatingFormGroup}
  //             required
  //             validate={required(errorMessages)}
  //             disabled={busy}
  //           />
  //           <Field name="name"
  //             label={labels.name}
  //             component={FloatingFormGroup}
  //             disabled={busy}
  //           />
  //           <Field name="city"
  //             label={labels.city.city}
  //             component={DropdownListFormGroup}
  //             {...useCityDropdownAttrs()}
  //             required
  //             validate={requiredObject(City, errorMessages)}
  //             messages={{ emptyList: notFound, emptyFilter: notFound }}
  //             labels={labels.city}
  //             disabled={busy}
  //           />
  //           <Field name="address"
  //             label={labels.address}
  //             component={FloatingFormGroup}
  //             disabled={busy}
  //           />
  //         </div>
  //         <Button
  //           type='submit'
  //           size='sm'
  //           aria-label={save}
  //           disabled={isDisabled(props) || busy} >
  //           {save}
  //         </Button>
  //       </form>
  //     </div>
  //   }}
  // </Form >
// }
