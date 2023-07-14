'use client'

import { DevTool } from '@hookform/devtools'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { useCallback, useTransition } from 'react'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'

import Select from '@/app/_objects/Select'
import Switch from '@/app/_objects/Switch'
import {
  errorText,
  inputDecimal,
  inputNumeric,
  unitsLabel,
  integerValue,
  floatValue 
} from '@/app/_objects/formHelpers'
import Button from '@/app/components/Button'
import contentsChoices from '@/app/[lng]/products/_components/contents.json'
import { struct } from './struct'
import threadsChoices from '@/app/[lng]/products/_components/threads.json'
import DensityForCount from './DensityForCount'
import ImageUpload from './ImageUpload'
import MetersInRoll from './MetersInRoll'
import Prices from './Prices'
import { toastSuccess } from '@/app/components/toast'
import { mutate } from './actions'

import type { ProductFormProps } from '@/interfaces/products'

export default function FormComp({
  mutateArgs: {
    lng,
    table,
    id,
  },
  initialValues,
  productTypes,
  labels: {
    save,
    errorMessages,
    units,
    labels,
  },
}: ProductFormProps) {
  const [isPending, startTransition] = useTransition()
  // const onSubmit: SubmitHandler<Values> = useMutate(mutateArgs)
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  // console.log('initialValues ', initialValues)
  const {
    control,
    register,
    watch,
    setValue,
    formState,
  } = useForm({
    defaultValues: initialValues,
    resolver: superstructResolver(struct)
  })
  const busy = isPending
  const densityUnits = `${units.gram_short}./${units.meter_short}2`
  const priceUnits = `₽/${units.meter_short}`
  const { push } = useRouter()
  const action = useCallback((formData: FormData) => {
    startTransition(async () => {
      const res = await mutate({ formData, lng, table, id })
      if (res.success) {
        toastSuccess(String(res.message))
        push(`/${lng}/${table}`)
      }
    })
  }, [id, lng, push, table])
  console.log('errors ', formState.errors, formState.isValid)
  return <form action={action}>
    <div className={`grid grid-cols-5 gap-2 p-2 ${busy ? 'opacity-70' : ''}`}>
      <div className='relative' >
        <ImageUpload {...{
          watch,
          label: labels.image,
          setValue,
          register,
          init: initialValues.image,
        }} />
      </div>
      <div className='col-span-4 grid grid-cols-4 gap-2'>
        <Select
          {...{
            name: 'productTypeId',
            register,
            label: labels.productTypeId,
            choices: productTypes,
            disabled: busy,
            defaultValue: initialValues.productTypeId,
          }} />
        <Select
          {...{
            name: 'threads',
            register,
            label: labels.threads,
            choices: threadsChoices,
            disabled: busy,
            choiceLabels: labels.threadsLabels,
            defaultValue: initialValues.threads,
          }} />
        <Select
          {...{
            name: 'contents',
            register,
            label: labels.contents,
            choices: contentsChoices,
            disabled: busy,
            choiceLabels: labels.contentsLabels,
            defaultValue: initialValues.contents,
          }} />
        <div className='pl-2'>
          <Switch
            {...{
              name: 'fleece',
              control,
              label: labels.fleece,
              busy
            }} />
        </div>
        <TextField {...register('name')}
          className='col-span-3'
          label={`${labels.name} *`}
          size="small"
          disabled={busy}
          error={!!formState.errors.name}
          helperText={errorText(errorMessages, formState.errors.name)}
          aria-invalid={formState.errors.name ? "true" : "false"}
        />
        <TextField {...register('price', { valueAsNumber: true })}
          type='number'
          label={`${labels.price} *`}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(priceUnits)}
          inputProps={inputNumeric}
          error={!!formState.errors.price}
          helperText={errorText(errorMessages, formState.errors.price)}
          aria-invalid={formState.errors.price ? "true" : "false"}
        />
        <TextField
          {...register('dollarPrice', { setValueAs: floatValue })}
          type='number'
          label={labels.dollarPrice}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(`$/${units.kilogram_short}`)}
          inputProps={inputDecimal}
        />
        <TextField
          {...register('dollarRate', { setValueAs: floatValue })}
          type='number'
          label={labels.dollarRate}
          size="small"
          disabled={busy}
          InputProps={unitsLabel('₽/$')}
          inputProps={inputDecimal}
        />
        <TextField {...register('width', { setValueAs: integerValue })}
          type='number'
          label={labels.width}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(units.centimeter_short)}
          inputProps={inputNumeric}
        />
        <TextField {...register('density', { setValueAs: integerValue })}
          type='number'
          label={labels.density}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(densityUnits)}
          inputProps={inputNumeric}
        />
        <Prices {...{ watch, label: labels.prices }} />
      </div>
    </div>
    <div className='grid grid-cols-6 gap-2'>
      <TextField {...register('weightForCount',
        { setValueAs: integerValue })}
        label={labels.weightForCount}
        type="number"
        size="small"
        disabled={busy}
        InputProps={unitsLabel(units.gram_short)}
        inputProps={inputNumeric}
      />
      <TextField
        {...register('lengthForCount', { setValueAs: floatValue })}
        label={labels.lengthForCount}
        type="number"
        size="small"
        disabled={busy}
        InputProps={unitsLabel(units.meter_short)}
        inputProps={inputDecimal}
      />
      <DensityForCount {...{ watch, label: labels.densityForCount, units }} />
      <TextField {...register('weight', { setValueAs: floatValue })}
        label={labels.weight}
        type="number"
        size="small"
        disabled={busy}
        InputProps={unitsLabel(units.kilogram_short)}
        inputProps={inputDecimal}
      />
      <MetersInRoll {...{ watch, label: labels.metersInRoll, units }} />
    </div>
    <div className='grid grid-cols-6 gap-2 mt-6'>
      <TextField
        {...register('pricePre', { setValueAs: integerValue })}
        label={labels.pricePre}
        type="number"
        size="small"
        disabled={busy}
        InputLabelProps={{ shrink: true }}
        InputProps={unitsLabel(priceUnits)}
        inputProps={inputNumeric}
      />
      <TextField
        {...register('widthShop', { setValueAs: integerValue })}
        label={labels.widthShop}
        type="number"
        size="small"
        disabled={busy}
        InputLabelProps={{ shrink: true }}
        InputProps={unitsLabel(units.centimeter_short)}
        inputProps={inputNumeric}
      />
      <TextField
        {...register('densityShop', { setValueAs: integerValue })}
        label={labels.densityShop}
        type="number"
        size="small"
        disabled={busy}
        InputLabelProps={{ shrink: true }}
        InputProps={unitsLabel(densityUnits)}
        inputProps={inputNumeric}
      />
      <Button
        type='submit'
        aria-label={save}
        disabled={busy || !formState.isDirty}
      >
        {save}
      </Button>
    </div>
    {/*<DevTool control={control} />*/}
  </form>
}
