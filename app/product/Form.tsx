'use client'

import type { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/useClient/Button'
// import Image from 'next/image'
import { unitsLabel } from '@/app/_objects/formHelpers'
import { useMutate } from '@/app/_objects/hooks'
import type { ProductFormProps, SerializedProductObject, Values } from '@/interfaces/products'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import { useCallback, useTransition } from 'react'
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import ImageUpload from './ImageUpload'
import priceCoeffs from './priceCoeffs.json'
import { struct } from './struct'

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
}: Pick<SerializedProductObject, 'weight' | 'density' | 'width' >) {
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
  id,
  initialValues,
  productTypes,
  save,
  errorMessages,
  units,
  labels,
}: ProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useMutate({ id })
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  // console.log('initialValues ', initialValues)
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    } } = useForm({
      defaultValues: initialValues,
      resolver: superstructResolver(struct)
    })
  const busy = isSubmitting || isPending
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
  function toValues({ createdAt, ...values }: SerializedProductObject) {
    return onSubmit(values)
  }
  const submitHandler = handleSubmit(toValues)
  const onSubmitButtonClick = useCallback(() => {
    if (busy) {
      return
    }
    submitHandler()
  }, [submitHandler, busy])
  return <Grid container spacing={2} sx={{ p: 2, opacity: busy ? 0.7 : 'inherit' }}>
      <Grid xs={4}>
        <ImageUpload
          onChange={(value) => setValue('image', value, { shouldDirty: true })}
          value={image}
          label={labels.image}
        />
      </Grid>
      <Grid container xs={8}>
        <Grid xs={3}>
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
                  ({ id, name }, key) => <MenuItem key={key} value={id}>
                    {name}
                  </MenuItem>)}
              </Select>
            </FormControl>}
          />
        </Grid>
        <Grid xs={3}>
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
                  ({ value, display_name }, key) => <MenuItem key={key} value={value}>
                    {display_name}
                  </MenuItem>)}
              </Select>
            </FormControl>}
          />
        </Grid>
        <Grid xs={3}>
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
                  ({ value, display_name }, key) => <MenuItem key={key} value={value}>
                    {display_name}
                  </MenuItem>)}
              </Select>
            </FormControl>}
          />
        </Grid>
        <Grid xs={3}>
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
        </Grid>
        <Grid xs={9}>
          <Controller name="name"
            control={control}
            render={({ field }) => <TextField {...field}
              fullWidth
              id="name"
              label={`${labels.name} *`}
              size="small"
              disabled={busy}
              error={errors?.name ? true : undefined}
              helperText={errors?.name
                ? errorMessages[errors.name.message as keyof Translation['errorMessages']]
                : undefined}
            />}
          />
        </Grid>
        <Grid xs={3}>
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
              error={errors?.price ? true : undefined}
              helperText={errors?.price
                ? errorMessages[errors.price.message as keyof Translation['errorMessages']]
                : undefined}
            />}
          />
        </Grid>
        <Grid xs={3}>
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
        </Grid>
        <Grid xs={3}>
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
        </Grid>
        <Grid xs={3}>
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
        </Grid>
        <Grid xs={3}>
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
        </Grid>
        <Grid xs={12}>
          <TextField
            id="prices"
            label={labels.prices}
            fullWidth
            size="small"
            disabled
            value={prices({ density, width, dollarPrice, dollarRate })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={2}>
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
        </Grid>
        <Grid xs={2}>
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
        </Grid>
        <Grid xs={2}>
          <TextField
            id="densityForCount"
            label={labels.densityForCount}
            type="number"
            size="small"
            disabled
            value={densityForCount({ weightForCount, lengthForCount, width }).toFixed(0)}
            InputProps={unitsLabel(`${units.gram_short}./${units.meter_short}2`)}
          />
        </Grid>
        <Grid xs={2}>
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
        </Grid>
        <Grid xs={2}>
          <TextField
            id="metersInRoll"
            label={labels.metersInRoll}
            type="number"
            size="small"
            disabled
            value={metersInRoll({ weight, density, width }).toFixed(2)}
            InputProps={unitsLabel(units.meter_short)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={3}>
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
        </Grid>
        <Grid xs={3}>
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
        </Grid>
        <Grid xs={3}>
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
        </Grid>
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


        // {/*        <CardMedia
        //   component="img"
        //   height="200"
        //   image={previewUrl
        //     ? previewUrl
        //     : initialValues.image
        //       ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${initialValues.image}`
        //       : '/blank.png'}
        //   alt={previewUrl ? 'File uploader preview' : labels.image}
        // />*/}
        // {/*        <CldImage
        //   height="200"
        //   width="200"
        //   src="rdbbw0woemaaqs3hu8oo"
        //   alt={labels.image}
        // />*/}
        // {/*        <IconButton color="primary" aria-label={labels.image} component="label">
        //   <Controller name="image"
        //     control={control}
        //     render={({ field: { onChange, value, ...field } }) => <TextField {...field}
        //       id="image"
        //       type='file'
        //       // accept='image/*'
        //       onChange={filesHandler({ setPreviewUrl, onChange })}
        //       size="small"
        //       disabled={busy}
        //       hidden
        //       inputProps={{
        //         accept: 'image/*',
        //       }}
        //     />}
        //   />
        //   <PhotoCamera />
        // </IconButton>*/}

        // {/*        <img
        //   src={previewUrl
        //     ? previewUrl
        //     : initialValues.image
        //       ? `https://res.cloudinary.com/du9yvygkg/image/upload/v${initialValues.image}`
        //       : '/blank.png'}
        //   alt={previewUrl ? 'File uploader preview' : labels.image}
        //   width={300}
        //   height={300}
        //   // fill={true}
        //   // priority={true}
        //   // className='max-w-xs mb-1 h-auto rounded-lg shadow-xl dark:shadow-gray-800'
        // />*/}
