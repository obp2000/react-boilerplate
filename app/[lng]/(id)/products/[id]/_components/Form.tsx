'use client'

import { DevTool } from '@hookform/devtools'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { useCallback, useTransition } from 'react'
import { useForm, Form } from "react-hook-form"
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
import contentsChoices from '@/app/product/contents.json'
import { struct } from '@/app/api/products/struct'
import threadsChoices from '@/app/product/threads.json'
import DensityForCount from './DensityForCount'
import ImageUpload from './ImageUpload'
import MetersInRoll from './MetersInRoll'
import Prices from './Prices'
import { toastError, toastSuccess } from '@/app/components/toast'

import type { ProductFormProps } from '@/interfaces/products'

export default function FormComp({
  mutateArgs,
  initialValues,
  productTypes,
  save,
  errorMessages,
  units: {
    kilogram_short: kilogramShort,
    centimeter_short: centimeterShort,
    ...units
  },
  labels: {
    productTypeId,
    threads,
    threadsLabels,
    contents,
    contentsLabels,
    fleece,
    name,
    price,
    dollarPrice,
    dollarRate,
    width,
    density,
    prices,
    weightForCount,
    lengthForCount,
    densityForCount,
    weight,
    metersInRoll,
    pricePre,
    widthShop,
    densityShop,
    image,
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
    formState: {
      errors: {
        name: nameError,
        price: priceError,
      },
      isDirty,
      isValid,
      isSubmitting,
    } } = useForm({
      defaultValues: initialValues,
      resolver: superstructResolver(struct)
    })
  const busy = isPending || isSubmitting
  const densityUnits = `${units.gram_short}./${units.meter_short}2`
  const priceUnits = `₽/${units.meter_short}`
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
  return <Form
    control={control}
    action={`/api/${mutateArgs.table}${mutateArgs.id ? `/${mutateArgs.id}` : ''}`}
    method={mutateArgs.id ? 'put' : 'post'}
    headers={{ 'Content-Type': 'application/json' }}
    onSuccess={onSuccess}
    onError={({ response, error }) => {
      console.log('res ', response)
    }} 
  >
    <div className={`grid grid-cols-5 gap-2 p-2 ${busy ? 'opacity-70' : ''}`}>
      <div className='relative' >
        <ImageUpload {...{ watch, label: image, setValue }} />
      </div>
      <div className='col-span-4 grid grid-cols-4 gap-2'>
        <Select
          {...{
            name: 'productTypeId',
            register,
            label: productTypeId,
            choices: productTypes,
            disabled: busy,
            defaultValue: initialValues.productTypeId,
          }} />
        <Select
          {...{
            name: 'threads',
            register,
            label: threads,
            choices: threadsChoices,
            disabled: busy,
            choiceLabels: threadsLabels,
            defaultValue: initialValues.threads,
          }} />
        <Select
          {...{
            name: 'contents',
            register,
            label: contents,
            choices: contentsChoices,
            disabled: busy,
            choiceLabels: contentsLabels,
            defaultValue: initialValues.contents,
          }} />
        <div className='pl-2'>
          <Switch
            {...{
              name: 'fleece',
              control,
              label: fleece,
              busy
            }} />
        </div>
        <TextField {...register('name')}
          className='col-span-3'
          label={`${name} *`}
          size="small"
          disabled={busy}
          error={!!nameError}
          helperText={errorText(errorMessages, nameError)}
          aria-invalid={nameError ? "true" : "false"}
        />
        <TextField {...register('price', { valueAsNumber: true })}
          type='number'
          label={`${price} *`}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(priceUnits)}
          inputProps={inputNumeric}
          error={!!priceError}
          helperText={errorText(errorMessages, priceError)}
          aria-invalid={priceError ? "true" : "false"}
        />
        <TextField
          {...register('dollarPrice', { setValueAs: floatValue })}
          type='number'
          label={dollarPrice}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(`$/${kilogramShort}`)}
          inputProps={inputDecimal}
        />
        <TextField
          {...register('dollarRate', { setValueAs: floatValue })}
          type='number'
          label={dollarRate}
          size="small"
          disabled={busy}
          InputProps={unitsLabel('₽/$')}
          inputProps={inputDecimal}
        />
        <TextField {...register('width', { setValueAs: integerValue })}
          type='number'
          label={width}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(centimeterShort)}
          inputProps={inputNumeric}
        />
        <TextField {...register('density', { setValueAs: integerValue })}
          type='number'
          label={density}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(densityUnits)}
          inputProps={inputNumeric}
        />
        <Prices {...{ watch, label: prices }} />
      </div>
    </div>
    <div className='grid grid-cols-6 gap-2'>
      <TextField {...register('weightForCount', { setValueAs: integerValue })}
        label={weightForCount}
        type="number"
        size="small"
        disabled={busy}
        InputProps={unitsLabel(units.gram_short)}
        inputProps={inputNumeric}
      />
      <TextField
        {...register('lengthForCount', { setValueAs: floatValue })}
        label={lengthForCount}
        type="number"
        size="small"
        disabled={busy}
        InputProps={unitsLabel(units.meter_short)}
        inputProps={inputDecimal}
      />
      <DensityForCount {...{ watch, label: densityForCount, units }} />
      <TextField {...register('weight', { setValueAs: floatValue })}
        label={weight}
        type="number"
        size="small"
        disabled={busy}
        InputProps={unitsLabel(kilogramShort)}
        inputProps={inputDecimal}
      />
      <MetersInRoll {...{ watch, label: metersInRoll, units }} />
    </div>
    <div className='grid grid-cols-6 gap-2 mt-6'>
      <TextField
        {...register('pricePre', { setValueAs: integerValue })}
        label={pricePre}
        type="number"
        size="small"
        disabled={busy}
        InputLabelProps={{ shrink: true }}
        InputProps={unitsLabel(priceUnits)}
        inputProps={inputNumeric}
      />
      <TextField
        {...register('widthShop', { setValueAs: integerValue })}
        label={widthShop}
        type="number"
        size="small"
        disabled={busy}
        InputLabelProps={{ shrink: true }}
        InputProps={unitsLabel(centimeterShort)}
        inputProps={inputNumeric}
      />
      <TextField
        {...register('densityShop', { setValueAs: integerValue })}
        label={densityShop}
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
        disabled={busy || !isDirty || !isValid}
      >
        {save}
      </Button>
    </div>
    <DevTool control={control} />
  </Form>
}
