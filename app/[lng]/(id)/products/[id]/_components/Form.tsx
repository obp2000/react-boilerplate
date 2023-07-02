'use client'

import {
  errorText,
  inputDecimal,
  inputNumeric,
  unitsLabel
} from '@/app/_objects/formHelpers'
import { useMutate } from '@/app/_objects/hooks'
import Button from '@/app/components/Button'
import { struct } from '@/app/product/struct'
import type {
  ProductFormProps,
  SerializedProductObject,
  Values
} from '@/interfaces/products'
import { DevTool } from '@hookform/devtools'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { TextField } from '@mui/material'
import { useCallback, useTransition } from 'react'
import { useForm, type SubmitHandler } from "react-hook-form"
import DensityForCount from './DensityForCount'
import ImageUpload from './ImageUpload'
import MetersInRoll from './MetersInRoll'
import Prices from './Prices'
import threadsChoices from '@/app/product/threads.json'
import contentsChoices from '@/app/product/contents.json'
import Select from '@/app/_objects/Select'
import Switch from '@/app/_objects/Switch'

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
  const onSubmit: SubmitHandler<Values> = useMutate(mutateArgs)
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  // console.log('initialValues ', initialValues)
  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    formState: {
      errors: {
        name: nameError,
        price: priceError,
      },
      isDirty,
      isValid
    } } = useForm({
      defaultValues: initialValues,
      resolver: superstructResolver(struct)
    })
  // console.log('errors ', errors)
  const toValues = useCallback(
    ({ createdAt, ...values }: SerializedProductObject) => onSubmit(values)
    , [onSubmit])
  const onSubmitButtonClick = useCallback(() => {
    handleSubmit(toValues)()
  }, [handleSubmit, toValues])
  const busy = isPending
  const densityUnits = `${units.gram_short}./${units.meter_short}2`
  const priceUnits = `₽/${units.meter_short}`
  return <>
    <div className={`grid grid-cols-5 gap-2 p-2 ${busy ? 'opacity-70' : ''}`}>
      <div className='relative' >
        <ImageUpload {...{ watch, label: image, setValue }} />
      </div>
      <div className='col-span-4 grid grid-cols-4 gap-2'>
        <Select
          {...{
            name: 'productTypeId',
            control,
            label: productTypeId,
            choices: productTypes,
            busy
          }} />
        <Select
          {...{
            name: 'threads',
            control,
            label: threads,
            choices: threadsChoices,
            busy,
            choiceLabels: threadsLabels,
          }} />
        <Select
          {...{
            name: 'contents',
            control,
            label: contents,
            choices: contentsChoices,
            busy,
            choiceLabels: contentsLabels,
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
        />
        <TextField {...register('price')}
          type='number'
          label={`${price} *`}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(priceUnits)}
          inputProps={inputNumeric}
          error={!!priceError}
          helperText={errorText(errorMessages, priceError)}
        />
        <TextField
          {...register('dollarPrice')}
          type='number'
          label={dollarPrice}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(`$/${kilogramShort}`)}
          inputProps={inputDecimal}
        />
        <TextField
          {...register('dollarRate')}
          type='number'
          label={dollarRate}
          size="small"
          disabled={busy}
          InputProps={unitsLabel('₽/$')}
          inputProps={inputDecimal}
        />
        <TextField {...register('width')}
          type='number'
          label={width}
          size="small"
          disabled={busy}
          InputProps={unitsLabel(centimeterShort)}
          inputProps={inputNumeric}
        />
        <TextField {...register('density')}
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
      <TextField {...register('weightForCount')}
        label={weightForCount}
        type="number"
        size="small"
        disabled={busy}
        InputProps={unitsLabel(units.gram_short)}
        inputProps={inputNumeric}
      />
      <TextField
        {...register('lengthForCount')}
        label={lengthForCount}
        type="number"
        size="small"
        disabled={busy}
        InputProps={unitsLabel(units.meter_short)}
        inputProps={inputDecimal}
      />
      <DensityForCount {...{ watch, label: densityForCount, units }} />
      <TextField {...register('weight')}
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
        {...register('pricePre')}
        label={pricePre}
        type="number"
        size="small"
        disabled={busy}
        InputLabelProps={{ shrink: true }}
        InputProps={unitsLabel(priceUnits)}
        inputProps={inputNumeric}
      />
      <TextField
        {...register('widthShop')}
        label={widthShop}
        type="number"
        size="small"
        disabled={busy}
        InputLabelProps={{ shrink: true }}
        InputProps={unitsLabel(centimeterShort)}
        inputProps={inputNumeric}
      />
      <TextField
        {...register('densityShop')}
        label={densityShop}
        type="number"
        size="small"
        disabled={busy}
        InputLabelProps={{ shrink: true }}
        InputProps={unitsLabel(densityUnits)}
        inputProps={inputNumeric}
      />
      <Button
        aria-label={save}
        disabled={busy || !isDirty || !isValid}
        onClick={() => startTransition(onSubmitButtonClick)}
      >
        {save}
      </Button>
    </div>
    <DevTool control={control} />
  </>
}
