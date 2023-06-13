'use client'

// import Image from 'next/image'
import { unitsLabel } from '@/app/_objects/formHelpers'
import { useMutate } from '@/app/_objects/hooks'
import type {
  ProductFormProps,
  SerializedProductObject,
  Values
} from '@/interfaces/products'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import {
  FormControl, 
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material'
import { useCallback, useTransition } from 'react'
import {
  Controller,
  useForm,
  type SubmitHandler
} from "react-hook-form"
import ImageUpload from './ImageUpload'
import priceCoeffs from './priceCoeffs.json'
import { struct } from './struct'
import Button from '@/app/components/Button'
import { errorText } from '@/app/_objects/formHelpers'

function densityForCount({
  weightForCount,
  lengthForCount,
  width
}: Pick<SerializedProductObject, 'weightForCount' | 'lengthForCount' | 'width'>) {
  return weightForCount && lengthForCount && width
    ? Number(weightForCount) / Number(lengthForCount) / Number(width) * 100
    : 0
}

function metersInRoll({
  weight,
  density,
  width
}: Pick<SerializedProductObject, 'weight' | 'density' | 'width'>) {
  return weight && density && width
    ? Number(weight) * 100000 / Number(density) / Number(width)
    : 0
}

export function prices({
  density,
  width,
  dollarPrice,
  dollarRate
}: Pick<SerializedProductObject, 'density' | 'width' | 'dollarPrice' | 'dollarRate'>) {
  return dollarPrice && dollarRate && density && width
    ? priceCoeffs.reduce((
      result: string[],
      coeff: number): string[] => {
      result.push(`${coeff}: ${(Number(dollarPrice) * Number(dollarRate) *
        Number(density) * Number(width) / 100000 * coeff).toFixed(0)}`)
      return result
    }, []).join(' / ')
    : ''
}

export default function FormComp({
  tablePath,
  id,
  initialValues,
  productTypes,
  save,
  errorMessages,
  units,
  labels,
}: ProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useMutate({ tablePath, id })
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  // console.log('initialValues ', initialValues)
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: {
      errors: {
        name: nameError,
        price: priceError
      },
      isSubmitting,
      isDirty,
    } } = useForm({
      defaultValues: initialValues,
      resolver: superstructResolver(struct)
    })
  const [
    weightForCount,
    lengthForCount,
    width,
    weight,
    density,
    dollarPrice,
    dollarRate,
    image,
  ] = watch([
    'weightForCount',
    'lengthForCount',
    'width',
    'weight',
    'density',
    'dollarPrice',
    'dollarRate',
    'image',
  ])
  // console.log('errors ', errors)
  const toValues = useCallback(
    ({ createdAt, ...values }: SerializedProductObject) => onSubmit(values)
    , [onSubmit])
  const onSubmitButtonClick = useCallback(() => {
    handleSubmit(toValues)()
  }, [handleSubmit, toValues])
  const busy = isSubmitting || isPending
  return <>
    <div className={`grid grid-cols-5 gap-2 p-2 ${busy ? 'opacity-70' : ''}`}>
      <div>
        <ImageUpload
          onChange={(value) => setValue('image', value, { shouldDirty: true })}
          value={image}
          label={labels.image}
        />
      </div>
      <div className='col-span-4 grid grid-cols-4 gap-2'>
        <Controller name="productTypeId"
          control={control}
          render={({ field: { value, ...field } }) => <FormControl size='small' fullWidth>
            <InputLabel id="productTypeId-label">
              {labels.productTypeId}
            </InputLabel>
            <Select
              {...field}
              value={value ?? ''}
              labelId="product_type_id-label"
              id="product_type_id"
              label={labels.productTypeId}
              disabled={busy}
            >
              <MenuItem value=""><em>------</em></MenuItem>
              {productTypes?.map(
                ({ id, name }) => <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>)}
            </Select>
          </FormControl>}
        />
        <Controller name="threads"
          control={control}
          render={({ field: { value, ...field } }) => <FormControl size='small' fullWidth>
            <InputLabel id="threads-label">
              {labels.threads}
            </InputLabel>
            <Select
              {...field}
              value={value ?? ''}
              labelId="threads-label"
              id="threads"
              label={labels.threads}
              disabled={busy}
            >
              <MenuItem value=''><em>------</em></MenuItem>
              {labels.threadsChoices.map(
                ({ value, display_name }) => <MenuItem key={value} value={value}>
                  {display_name}
                </MenuItem>)}
            </Select>
          </FormControl>}
        />
        <Controller name="contents"
          control={control}
          render={({ field: { value, ...field } }) => <FormControl size='small' fullWidth>
            <InputLabel id="contents-label">
              {labels.contents}
            </InputLabel>
            <Select
              {...field}
              value={value ?? ''}
              labelId="contents-label"
              id="contents"
              label={labels.contents}
              // displayEmpty
              disabled={busy}
            >
              <MenuItem value=""><em>------</em></MenuItem>
              {labels.contentsChoices.map(
                ({ value, display_name }) => <MenuItem key={value} value={value}>
                  {display_name}
                </MenuItem>)}
            </Select>
          </FormControl>}
        />
        <div>
          <Controller name="fleece"
            control={control}
            render={({ field: { value, ...field } }) => <FormControlLabel
              label={labels.fleece}
              control={<Switch id='fleece'
                {...field}
                value={!!value}
                defaultChecked={!!initialValues.fleece}
                size='small'
                disabled={busy}
              />}
            />}
          />
        </div>
        <Controller name="name"
          control={control}
          render={({ field }) => <TextField {...field}
            fullWidth
            id="name"
            className='col-span-3'
            label={`${labels.name} *`}
            size="small"
            disabled={busy}
            error={!!nameError}
            helperText={errorText(errorMessages, nameError)}
          />}
        />
        <Controller name="price"
          control={control}
          render={({ field }) => <TextField {...field}
            type='number'
            id="price"
            label={`${labels.price} *`}
            size="small"
            disabled={busy}
            InputProps={unitsLabel(`₽/${units.meter_short}`)}
            inputProps={{
              inputMode: 'numeric',
            }}
            error={!!priceError}
            helperText={errorText(errorMessages, priceError)}
          />}
        />
        <Controller name="dollarPrice"
          control={control}
          render={({ field: { value, ...field } }) => <TextField {...field}
            type='number'
            id="dollar_price"
            value={value || ''}
            label={labels.dollarPrice}
            size="small"
            disabled={busy}
            InputProps={unitsLabel(`$/${units.kilogram_short}`)}
            inputProps={{
              inputMode: 'decimal',
              step: '0.1',
            }}
          />}
        />
        <Controller name="dollarRate"
          control={control}
          render={({ field: { value, ...field } }) => <TextField {...field}
            type='number'
            id="dollar_rate"
            value={value || ''}
            label={labels.dollarRate}
            size="small"
            disabled={busy}
            InputProps={unitsLabel('₽/$')}
            inputProps={{
              inputMode: 'decimal',
              step: '0.1',
            }}
          />}
        />
        <Controller name="width"
          control={control}
          render={({ field: { value, ...field } }) => <TextField {...field}
            type='number'
            id="width"
            value={value || ''}
            label={labels.width}
            size="small"
            disabled={busy}
            InputProps={unitsLabel(units.centimeter_short)}
            inputProps={{
              inputMode: 'numeric',
            }}
          />}
        />
        <Controller name="density"
          control={control}
          render={({ field: { value, ...field } }) => <TextField {...field}
            type='number'
            id="density"
            value={value || ''}
            label={labels.density}
            size="small"
            disabled={busy}
            InputProps={unitsLabel(`${units.gram_short}./${units.meter_short}2`)}
            inputProps={{
              inputMode: 'numeric',
            }}
          />}
        />
        <TextField
          id="prices"
          className='col-span-4'
          label={labels.prices}
          fullWidth
          size="small"
          disabled
          value={prices({ density, width, dollarPrice, dollarRate })}
        />
      </div>
    </div>
    <div className='grid grid-cols-6 gap-2'>
      <Controller name="weightForCount"
        control={control}
        render={({ field: { value, ...field } }) => <TextField {...field}
          id="weight_for_count"
          value={value || ''}
          label={labels.weightForCount}
          type="number"
          size="small"
          disabled={busy}
          InputProps={unitsLabel(units.gram_short)}
          inputProps={{
            inputMode: 'numeric',
          }}
        />}
      />
      <Controller name="lengthForCount"
        control={control}
        render={({ field: { value, ...field } }) => <TextField {...field}
          id="length_for_count"
          value={value || ''}
          label={labels.lengthForCount}
          type="number"
          size="small"
          disabled={busy}
          InputProps={unitsLabel(units.meter_short)}
          inputProps={{
            inputMode: 'decimal',
            step: '0.1'
          }}
        />}
      />
      <TextField
        id="densityForCount"
        label={labels.densityForCount}
        type="number"
        size="small"
        disabled
        value={densityForCount({ weightForCount, lengthForCount, width }).toFixed(0)}
        InputProps={unitsLabel(`${units.gram_short}./${units.meter_short}2`)}
      />
      <Controller name="weight"
        control={control}
        render={({ field: { value, ...field } }) => <TextField {...field}
          id="weight"
          value={value || ''}
          label={labels.weight}
          type="number"
          size="small"
          disabled={busy}
          InputProps={unitsLabel(units.kilogram_short)}
          inputProps={{
            inputMode: 'decimal',
            step: '0.1',
          }}
        />}
      />
      <TextField
        id="metersInRoll"
        label={labels.metersInRoll}
        type="number"
        size="small"
        disabled
        value={metersInRoll({ weight, density, width }).toFixed(2)}
        InputProps={unitsLabel(units.meter_short)}
      />
    </div>
    <div className='grid grid-cols-6 gap-2 mt-6'>
      <Controller name="pricePre"
        control={control}
        render={({ field: { value, ...field } }) => <TextField {...field}
          id="price_pre"
          value={value || ''}
          label={labels.pricePre}
          type="number"
          size="small"
          disabled={busy}
          InputLabelProps={{ shrink: true }}
          InputProps={unitsLabel(`₽/${units.meter_short}`)}
          inputProps={{
            inputMode: 'numeric',
          }}
        />}
      />
      <Controller name="widthShop"
        control={control}
        render={({ field: { value, ...field } }) => <TextField {...field}
          id="width_shop"
          value={value || ''}
          label={labels.widthShop}
          type="number"
          size="small"
          disabled={busy}
          InputLabelProps={{ shrink: true }}
          InputProps={unitsLabel(units.centimeter_short)}
          inputProps={{
            inputMode: 'numeric',
          }}
        />}
      />
      <Controller name="densityShop"
        control={control}
        render={({ field: { value, ...field } }) => <TextField {...field}
          id="density_shop"
          value={value || ''}
          label={labels.densityShop}
          type="number"
          size="small"
          disabled={busy}
          InputLabelProps={{ shrink: true }}
          InputProps={unitsLabel(`${units.gram_short}./${units.meter_short}2`)}
          inputProps={{
            inputMode: 'numeric',
          }}
        />}
      />
      <Button
        aria-label={save}
        disabled={busy || !isDirty}
        onClick={() => startTransition(onSubmitButtonClick)}
      >
        {save}
      </Button>
    </div>
  </>
}
