'use client'

import { DevTool } from '@hookform/devtools'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { useCallback, useTransition } from 'react'
import { Form, useForm } from "react-hook-form"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { experimental_useOptimistic as useOptimistic } from 'react'

import { errorText } from '@/app/_objects/formHelpers'
import Button from '@/app/components/Button'
import { formatRu } from '@/app/components/Date'
import { getGetCityName } from '@/app/customer/cities/helpers'
import { struct } from '@/app/api/customers/struct'

import Autocomplete from '@/app/_objects/Autocomplete'
import { toastError, toastSuccess } from '@/app/components/toast'
import type {
  CustomerFormProps,
  SerializedCustomerObject,
} from '@/interfaces/customers'
import { useRouter } from 'next/navigation'

function FormComp({
  mutateArgs,
  initialValues: {
    createdAt,
    ...initialValues
  },
  save,
  notFound,
  errorMessages,
  labels: {
    nick,
    name,
    city: {
      city,
      pindex,
    },
    address,
    ...labels
  },
  handleSubmit,
}: CustomerFormProps) {
  const [isPending, startTransition] = useTransition()
  const {
    control,
    register,
    setValue,
    formState: {
      errors: {
        nick: nickError,
        root,
        ...errors
      },
      isSubmitting,
      isDirty,
      isValid,
    }
  } = useForm<SerializedCustomerObject>({
    defaultValues: initialValues,
    resolver: superstructResolver(struct)
  })
  console.log('root errors ', root, errors)
  const { refresh, push } = useRouter()
  const onSuccess = useCallback(({ response: { ok, status, statusText } }:
    { response: Response }) => {
    // console.log('res ', response)
    if (ok) {
      toastSuccess(mutateArgs.message)
      startTransition(() => {
        refresh()
        push(`/${mutateArgs.lng}/${mutateArgs.table}`)
      })
    } else {
      toastError(`${status}: ${statusText}`)
    }
  }, [mutateArgs.lng, mutateArgs.message, mutateArgs.table, push, refresh])
  // async function handleSubmit(data) {
  //   'use server'
 
  //   // const cartId = cookies().get('cartId')?.value
  //   // await saveToDb({ cartId, data })
  //   console.log('data ', data)
  // }
  // const handleSubmit = getHandleSubmit({ id: mutateArgs.id })
  // string | (formData: FormData) => void
  const { pending } = useFormStatus()
  const busy = pending
  // const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  //   messages,
  //   (state, newMessage) => [...state, { message: newMessage, sending: true }]
  // )
  return <form action={handleSubmit}
  // control={control}
  // action={`/api/${mutateArgs.table}${mutateArgs.id ? `/${mutateArgs.id}` : ''}`}
  // method={mutateArgs.id ? 'put' : 'post'}
  // headers={{ 'Content-Type': 'application/json' }}
  // onSuccess={onSuccess}
  >
    <div
      className={`grid grid-cols-3 gap-4 p-2${busy ? ' opacity-70' : ''}`}>
      {busy && <div>busy</div>}
      {/*{root?.server && <p>Form submit failed.</p>}*/}
{/*      <input
        type='number'
        hidden
        {...register('id')}
        defaultValue={mutateArgs.id}
      />*/}
      <TextField {...register('nick')}
        label={`${nick} *`}
        size="small"
        disabled={busy}
        error={!!nickError}
        helperText={errorText(errorMessages, nickError)}
        aria-invalid={nickError ? "true" : "false"}
      />
      <TextField {...register('name')}
        label={name}
        size="small"
        disabled={busy}
      />
      <Autocomplete {...{
        name: 'city',
        control,
        searchPath: '/cities',
        label: `${city} *`,
        init: initialValues.city,
        getOptionLabel: getGetCityName(pindex),
        busy,
        errorMessages,
        notFound,
        register,
        setValue,
      }} />
      <TextField {...register('address')}
        label={address}
        size="small"
        disabled={busy}
      />
      {createdAt && <TextField
        label={labels.createdAt}
        size="small"
        disabled
        defaultValue={formatRu(createdAt)}
      />}
      <Button
        type='submit'
        aria-label={save}
        disabled={busy || !isDirty}
      >
        {save}
      </Button>
    </div>
    <DevTool control={control} />
  </form>
}

export default FormComp
