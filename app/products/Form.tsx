'use client'

import Button from '@/app/useClient/Button'
import type { Translation } from '@/app/i18n/dictionaries'
import type { ProductTypeType } from '@/interfaces/productTypes'
// import Image from 'next/image'
import type { ParsedUrlQuery } from 'querystring'
import { useState, useTransition } from 'react'
import type { Values } from '@/interfaces/products'
import { filesHandler } from '@/app/form/helpers'
import { useOnSubmit } from '@/app/form/hooks'
import { superstructResolver } from '@hookform/resolvers/superstruct'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import clsx from 'clsx'
import {
  Controller, useForm, type SubmitHandler
} from "react-hook-form"
import { densityForCount, metersInRoll, prices } from './calculator'
import { Product } from './product'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Unstable_Grid2'
import CardMedia from '@mui/material/CardMedia'

export type ProductFormProps = {
  params: ParsedUrlQuery
  initialValues: Values
  accessToken: string
  productTypes: ProductTypeType[]
  save: string
  message: string
  errorMessages: Translation['errorMessages']
  units: Translation['units']
  labels: Translation['product']
}

export default function FormComp({
  params,
  initialValues,
  accessToken,
  productTypes,
  save,
  message,
  errorMessages,
  units,
  labels,
}: ProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const onSubmit: SubmitHandler<Values> = useOnSubmit({
    params,
    table: 'products',
    accessToken,
    contentType: 'multipart/form-data',
    startTransition,
    setSuccess,
    setErrorMessage,
  })
  // const onSubmit: SubmitHandler<Values> = data => console.log(data)
  console.log('initialValues ', initialValues)
  const {
    control,
    watch,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    } } = useForm<Values>({
      defaultValues: initialValues,
      resolver: superstructResolver(Product)
    })
  const busy = isSubmitting || isPending
  const [
    weightForCount,
    lengthForCount,
    width,
    weight,
    density,
    dollarPrice,
    dollarRate
  ] = watch([
    'weightForCount',
    'lengthForCount',
    'width',
    'weight',
    'density',
    'dollarPrice',
    'dollarRate'
  ])
  console.log('errors ', errors)
  return <form onSubmit={handleSubmit(onSubmit)}
    className={clsx('p-2', { 'opacity-70': busy })}>
    <Grid container spacing={2}>
      <Grid xs={4}>
        {/*        <img
          src={previewUrl
            ? previewUrl
            : initialValues.image
              ? `https://res.cloudinary.com/du9yvygkg/image/upload/v${initialValues.image}`
              : '/blank.png'}
          alt={previewUrl ? 'File uploader preview' : labels.image}
          width={300}
          height={300}
          // fill={true}
          // priority={true}
          // className='max-w-xs mb-1 h-auto rounded-lg shadow-xl dark:shadow-gray-800'
        />*/}
        <CardMedia
          component="img"
          height="200"
          image={previewUrl
            ? previewUrl
            : initialValues.image
              ? `https://res.cloudinary.com/du9yvygkg/image/upload/v${initialValues.image}`
              : '/blank.png'}
          alt={previewUrl ? 'File uploader preview' : labels.image}
        />
        <IconButton color="primary" aria-label={labels.image} component="label">
          <Controller name="image"
            control={control}
            render={({ field: { onChange, value, ...field } }) => <TextField {...field}
              id="image"
              type='file'
              // accept='image/*'
              onChange={filesHandler({ setPreviewUrl, onChange })}
              size="small"
              disabled={busy}
              hidden
              inputProps={{
                accept: 'image/*',
              }}
            />}
          />
          <PhotoCamera />
        </IconButton>
      </Grid>
      <Grid container xs={8}>
        <Grid xs={3}>
          <Controller name="productTypeId"
            control={control}
            render={({ field }) => <FormControl size='small' fullWidth>
              <InputLabel id="productTypeId-label">
                {labels.productTypeId}
              </InputLabel>
              <Select
                {...field}
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
            render={({ field }) => <FormControl size='small' fullWidth>
              <InputLabel id="threads-label">
                {labels.threads}
              </InputLabel>
              <Select
                {...field}
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
            render={({ field }) => <FormControl size='small' fullWidth>
              <InputLabel id="contents-label">
                {labels.contents}
              </InputLabel>
              <Select
                {...field}
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
            render={({ field }) => <FormControlLabel
              label={labels.fleece}
              control={<Switch id='fleece'
                {...field}
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
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  ₽/{units.meter_short}
                </InputAdornment>,
              }}
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
            render={({ field }) => <TextField {...field}
              type='number'
              id="dollar_price"
              label={labels.dollarPrice}
              size="small"
              disabled={busy}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  $/{units.kilogram_short}
                </InputAdornment>,
              }}
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
            render={({ field }) => <TextField {...field}
              type='number'
              id="dollar_rate"
              label={labels.dollarRate}
              size="small"
              disabled={busy}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  ₽/$
                </InputAdornment>,
              }}
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
            render={({ field }) => <TextField {...field}
              type='number'
              id="width"
              label={labels.width}
              size="small"
              disabled={busy}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  {units.centimeter_short}
                </InputAdornment>,
              }}
              inputProps={{
                inputMode: 'numeric',
              }}
            />}
          />
        </Grid>
        <Grid xs={3}>
          <Controller name="density"
            control={control}
            render={({ field }) => <TextField {...field}
              type='number'
              id="density"
              label={labels.density}
              size="small"
              disabled={busy}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  {units.gram_short}./{units.meter_short}2
                </InputAdornment>,
              }}
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
            render={({ field }) => <TextField {...field}
              id="weight_for_count"
              label={labels.weightForCount}
              type="number"
              size="small"
              disabled={busy}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  {units.gram_short}
                </InputAdornment>,
              }}
              inputProps={{
                inputMode: 'numeric',
              }}
            />}
          />
        </Grid>
        <Grid xs={2}>
          <Controller name="lengthForCount"
            control={control}
            render={({ field }) => <TextField {...field}
              id="length_for_count"
              label={labels.lengthForCount}
              type="number"
              size="small"
              disabled={busy}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  {units.meter_short}
                </InputAdornment>,
              }}
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
            InputProps={{
              endAdornment: <InputAdornment position="end">
                {units.gram_short}./{units.meter_short}2
              </InputAdornment>,
            }}
          />
        </Grid>
        <Grid xs={2}>
          <Controller name="weight"
            control={control}
            render={({ field }) => <TextField {...field}
              id="weight"
              label={labels.weight}
              type="number"
              size="small"
              disabled={busy}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  {units.kilogram_short}
                </InputAdornment>,
              }}
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
            InputProps={{
              endAdornment: <InputAdornment position="end">
                {units.meter_short}
              </InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={3}>
          <Controller name="pricePre"
            control={control}
            render={({ field }) => <TextField {...field}
              id="price_pre"
              label={labels.pricePre}
              type="number"
              size="small"
              disabled={busy}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  ₽/{units.meter_short}
                </InputAdornment>,
              }}
              inputProps={{
                inputMode: 'numeric',
              }}
            />}
          />
        </Grid>
        <Grid xs={3}>
          <Controller name="widthShop"
            control={control}
            render={({ field }) => <TextField {...field}
              id="width_shop"
              label={labels.widthShop}
              type="number"
              size="small"
              disabled={busy}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  {units.centimeter_short}
                </InputAdornment>,
              }}
              inputProps={{
                inputMode: 'numeric',
              }}
            />}
          />
        </Grid>
        <Grid xs={3}>
          <Controller name="densityShop"
            control={control}
            render={({ field }) => <TextField {...field}
              id="density_shop"
              label={labels.densityShop}
              type="number"
              size="small"
              disabled={busy}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  {units.gram_short}./{units.meter_short}2
                </InputAdornment>,
              }}
              inputProps={{
                inputMode: 'numeric',
              }}
            />}
          />
        </Grid>
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
  </form >
}
