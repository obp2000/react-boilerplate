'use client'

import { DevTool } from '@hookform/devtools'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { useCallback, useTransition } from 'react'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'

import { errorText } from '@/app/_objects/formHelpers'
import Button from '@/app/components/Button'
import { formatRu } from '@/app/components/Date'
import { getGetCityName } from '@/app/[lng]/customers/_components/cities/helpers'
import { struct } from './struct'
import Autocomplete from '@/app/_objects/Autocomplete'
import { toastSuccess } from '@/app/components/toast'
import { mutate } from './actions'

import type {
  CustomerFormProps,
  SerializedCustomerObject,
} from '@/interfaces/customers'

function FormComp({
  mutateArgs: {
    lng,
    table,
    id,
  },
  initialValues: {
    createdAt,
    ...initialValues
  },
  labels: {
    save,
    errorMessages,
    notFound,
    labels,
  },
}: CustomerFormProps) {
  const [isPending, startTransition] = useTransition()
  const {
    control,
    register,
    setValue,
    formState,
  } = useForm<SerializedCustomerObject>({
    defaultValues: initialValues,
    resolver: superstructResolver(struct)
  })
  console.log('errors ', formState.errors, formState.isValid)
  const { push } = useRouter()
  const busy = isPending || formState.isLoading
  const action = useCallback((formData: FormData) => {
    startTransition(async () => {
      formData.delete('city')
      const res = await mutate({ formData, lng, table, id })
      if (res.success) {
        toastSuccess(String(res.message))
        push(`/${lng}/${table}`)
      }
    })
  }, [id, lng, push, table])
  return <form action={action}>
    <div
      className={`grid grid-cols-3 gap-4 p-2${busy ? ' opacity-70' : ''}`}>
      <TextField {...register('nick')}
        label={`${labels.nick} *`}
        size="small"
        disabled={busy}
        error={!!formState.errors.nick}
        helperText={errorText(errorMessages, formState.errors.nick)}
        aria-invalid={formState.errors.nick ? "true" : "false"}
      />
      <TextField {...register('name')}
        label={labels.name}
        size="small"
        disabled={busy}
      />
      <Autocomplete {...{
        name: 'city',
        control,
        table: 'cities',
        label: `${labels.city.city} *`,
        getOptionLabel: getGetCityName(labels.city.pindex),
        busy,
        errorMessages,
        notFound,
        register,
        setValue,
      }} />
      <TextField {...register('address')}
        label={labels.address}
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
        disabled={busy || !formState.isDirty}
      >
        {save}
      </Button>
    </div>
    <DevTool control={control} />
  </form>
}

export default FormComp
