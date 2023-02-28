'use client'

import { Translation } from '@/app/i18n/dictionaries'
import Button from '@/app/client/Button'
// import FloatingFormGroup from '@/formInput/FloatingFormGroup'
// import SwitchFormGroup from '@/formInput/SwitchFormGroup'
import { mutateObject } from '@/app/[lng]/[table]/[id]/client'
// import SelectFloatingFormGroup from '@/selectField/SelectFloatingFormGroup'
import { isDisabled } from '@/submitButton/hooks'
// import { required, requiredNumber } from '@/validators/validators'
import type { ProductType } from '@prisma/client'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { ParsedUrlQuery } from 'querystring'
import { useState, useTransition } from 'react'
import type { Values } from './calculator'
// import blank from '/public/blank.png'
// import FileFloatingFormGroup from '@/formInput/FileFloatingFormGroup'
import clsx from 'clsx'
import {
  useForm,
  FormProvider,
  Controller,
  type UseFormRegister,
  type SubmitHandler,
} from "react-hook-form"
import { superstructResolver } from '@hookform/resolvers/superstruct'
import { Product } from './product'
// import ToggleSwitch from '@/app/client/ToggleSwitch'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { getSwitchHandler, filesHandler } from '@/formInput/hooks'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { prices } from './calculator'
// import NumericInput from 'material-ui-numeric-input'

export type ProductFormProps = {
  lng: string
  isNewObject: boolean
  params: ParsedUrlQuery
  initialValues: Values
  productTypes: Pick<ProductType, 'id' | 'name'>[]
  save: string
  message: string
  errorMessages: Translation['errorMessages']
  units: Translation['units']
  labels: Translation['product']
}

function densityForCount({ weightForCount, lengthForCount, width }) {
  return (weightForCount && lengthForCount && width
            ? weightForCount / lengthForCount / width * 100
            : 0).toFixed(0)
}

function metersInRoll({ weight, density, width }) {
  return (weight && density && width
            ? weight * 100000 / density / width
            : 0).toFixed(2)
}

const integerOrDec = '^\d*(\.\d+)?$'

export default function FormComp({
  lng,
  isNewObject,
  params,
  initialValues,
  productTypes,
  save,
  message,
  errorMessages,
  units,
  labels,
}: ProductFormProps) {
  const { refresh, push } = useRouter()
  const [isPending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  // const onSubmit = (values: Values) => mutateObject({
  //   isNewObject,
  //   lng,
  //   values,
  //   indexUrl: '/products/',
  //   refresh,
  //   push,
  //   id: params.id,
  //   contentType: 'multipart/form-data',
  //   message,
  //   startTransition,
  // })
  const onSubmit: SubmitHandler<Values> = data => console.log(data)
  const methods = useForm<Values>({
    defaultValues: initialValues,
    resolver: superstructResolver(Product)
  })
  const { control, register, watch, handleSubmit, formState } = methods
  const { errors, isLoading, isValidating, isSubmitting, isDirty, isValid, dirtyFields, touchedFields } = formState || {}
  const busy = isSubmitting || isPending
  const [weightForCount, lengthForCount, width, weight, density, dollarPrice, dollarRate] =
    watch(['weight_for_count', 'length_for_count', 'width', 'weight', 'density', 'dollar_price', 'dollar_rate'])
  // console.log('watchFields ', watchFields)
  console.log('errors ', errors)
  // const [fleeceChecked, setFleeceChecked] = useState(initialValues.fleece)
  return <div className={clsx('bg-white shadow-md rounded p-2 text-sm', { 'opacity-70': busy })}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 md:grid-cols-3 pt-4">
        <div>
          <img
            src={previewUrl
              ? previewUrl
              : initialValues.image
                ? `https://res.cloudinary.com/du9yvygkg/image/upload/v${initialValues.image}`
                : '/public/blank.png'}
            alt={previewUrl ? 'File uploader preview' : labels.image}
            width={300}
            height={300}
            // fill={true}
            // priority={true}
            className='max-w-xs mb-1 h-auto rounded-lg shadow-xl dark:shadow-gray-800'
          />
          <input {...register('image')}
            id='image'
            placeholder={labels.image}
            type='file'
            accept='.jpg, .png, .jpeg'
            onChange={filesHandler({ setPreviewUrl })}
            disabled={busy}
          />
          {/*              <Controller name="image"
                control={control}
                render={({ field }) => <TextField {...field}
                  id="image"
                  type='file'
                  accept='.jpg, .png, .jpeg'
                  label={labels.image}
                  onChange={filesHandler({ setPreviewUrl })}
                  // variant="outlined"
                  size="small"
                  disabled={busy}
                />}
              />*/}
        </div>
        <div className='col-span-2'>
          <div className='grid gap-6 mb-6 md:grid-cols-4 pt-4 col-span-2'>
            <Controller name="product_type_id"
              control={control}
              render={({ field }) => <FormControl size='small' fullWidth>
                <InputLabel id="product_type_id-label">{labels.product_type_id}</InputLabel>
                <Select
                  {...field}
                  labelId="product_type_id-label"
                  id="product_type_id"
                  label={labels.product_type_id}
                  disabled={busy}
                >
                  <MenuItem value=""><em>------</em></MenuItem>
                  {productTypes?.map(({ id, name }, key) => <MenuItem key={key} value={id}>
                    {name}
                  </MenuItem>)}
                </Select>
              </FormControl>}
            />
            <Controller name="threads"
              control={control}
              render={({ field }) => <FormControl size='small' fullWidth>
                <InputLabel id="threads-label">{labels.threads}</InputLabel>
                <Select
                  {...field}
                  labelId="threads-label"
                  id="threads"
                  label={labels.threads}
                  disabled={busy}
                >
                  <MenuItem value=""><em>------</em></MenuItem>
                  {labels.threadsChoices.map(({ value, display_name }, key) => <MenuItem key={key} value={value}>
                    {display_name}
                  </MenuItem>)}
                </Select>
              </FormControl>}
            />
            <Controller name="contents"
              control={control}
              render={({ field }) => <FormControl size='small' fullWidth>
                <InputLabel id="contents-label">{labels.contents}</InputLabel>
                <Select
                  {...field}
                  labelId="contents-label"
                  id="contents"
                  label={labels.contents}
                  // displayEmpty
                  disabled={busy}
                >
                  <MenuItem value=""><em>------</em></MenuItem>
                  {labels.contentsChoices.map(({ value, display_name }, key) => <MenuItem key={key} value={value}>
                    {display_name}
                  </MenuItem>)}
                </Select>
              </FormControl>}
            />
            <Controller name="fleece"
              control={control}
              render={({ field }) => <FormControlLabel
                label={labels.fleece}
                control={<Switch id='fleece'
                  {...field}
                  defaultChecked={initialValues.fleece || false}
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
              label={`${labels.name} *`}
              variant="outlined"
              size="small"
              disabled={busy}
              error={errors?.name ? true : undefined}
              helperText={errors?.name ? errorMessages[errors.name.message] : undefined}
            />}
          />
          <div className="grid gap-6 mb-6 md:grid-cols-5 pt-4 col-span-2">
            <Controller name="dollar_price"
              control={control}
              render={({ field }) => <TextField {...field}
                type='number'
                id="dollar_price"
                label={labels.dollar_price}
                step='0.1'
                variant="outlined"
                size="small"
                disabled={busy}
                InputProps={{
                  endAdornment: <InputAdornment position="end">$/{units.kilogram_short}</InputAdornment>,
                  inputMode: 'numeric', pattern: integerOrDec,
                }}
              />}
            />
            <Controller name="dollar_rate"
              control={control}
              render={({ field }) => <TextField {...field}
                type='number'
                id="dollar_rate"
                label={labels.dollar_rate}
                variant="outlined"
                size="small"
                disabled={busy}
                InputProps={{
                  endAdornment: <InputAdornment position="end">₽/$</InputAdornment>,
                  inputMode: 'numeric', pattern: integerOrDec,
                }}
              />}
            />
            <Controller name="width"
              control={control}
              render={({ field }) => <TextField {...field}
                type='number'
                id="width"
                label={labels.width}
                variant="outlined"
                size="small"
                disabled={busy}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{units.centimeter_short}</InputAdornment>,
                  inputMode: 'numeric', pattern: '[0-9]*',
                }}
              />}
            />
            <Controller name="density"
              control={control}
              render={({ field }) => <TextField {...field}
                type='number'
                id="density"
                label={labels.density}
                variant="outlined"
                size="small"
                disabled={busy}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{units.gram_short}./{units.meter_short}2</InputAdornment>,
                  inputMode: 'numeric', pattern: '[0-9]*',
                }}
              />}
            />
            <Controller name="price"
              control={control}
              render={({ field }) => <TextField {...field}
                type='number'
                id="price"
                label={`${labels.price} *`}
                variant="outlined"
                size="small"
                disabled={busy}
                InputProps={{
                  endAdornment: <InputAdornment position="end">₽/{units.meter_short}</InputAdornment>,
                  inputMode: 'numeric', pattern: '[0-9]*',
                }}
                error={errors?.price ? true : undefined}
                helperText={errors?.price ? errorMessages[errors.price.message] : undefined}
              />}
            />
          </div>
          <TextField
            id="prices"
            label={labels.prices}
            fullWidth
            variant="outlined"
            size="small"
            disabled
            value={prices({ density, width, dollarPrice, dollarRate })}
          />
        </div>
      </div>
      <div className="grid gap-3 mb-3 md:grid-cols-7 pt-4">
        <Controller name="weight_for_count"
          control={control}
          render={({ field }) => <TextField {...field}
            id="weight_for_count"
            label={labels.weight_for_count}
            type="number"
            variant="outlined"
            size="small"
            disabled={busy}
            InputProps={{
              endAdornment: <InputAdornment position="end">{units.gram_short}</InputAdornment>,
            }}
          />}
        />
        <Controller name="length_for_count"
          control={control}
          render={({ field }) => <TextField {...field}
            id="length_for_count"
            label={labels.length_for_count}
            type="number"
            step="0.1"
            variant="outlined"
            size="small"
            disabled={busy}
            InputProps={{
              endAdornment: <InputAdornment position="end">{units.meter_short}</InputAdornment>,
            }}
          />}
        />
        <TextField
          id="density_for_count"
          label={labels.density_for_count}
          type="number"
          variant="outlined"
          size="small"
          disabled
          value={densityForCount({ weightForCount, lengthForCount, width })}
          InputProps={{
            endAdornment: <InputAdornment position="end">{units.gram_short}./{units.meter_short}2</InputAdornment>,
          }}
        />
        <Controller name="weight"
          control={control}
          render={({ field }) => <TextField {...field}
            id="weight"
            label={labels.weight}
            type="number"
            step="0.1"
            variant="outlined"
            size="small"
            disabled={busy}
            InputProps={{
              endAdornment: <InputAdornment position="end">{units.kilogram_short}</InputAdornment>,
            }}
          />}
        />
        <TextField
          id="meters_in_roll"
          label={labels.meters_in_roll}
          type="number"
          variant="outlined"
          size="small"
          disabled
          value={metersInRoll({ weight, density, width })}
          InputProps={{
            endAdornment: <InputAdornment position="end">{units.meter_short}</InputAdornment>,
          }}
        />
      </div>
      <div className="grid gap-3 mb-3 md:grid-cols-8 pt-4">
        <Controller name="price_pre"
          control={control}
          render={({ field }) => <TextField {...field}
            id="price_pre"
            label={labels.price_pre}
            type="number"
            variant="outlined"
            size="small"
            disabled={busy}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: <InputAdornment position="end">₽/{units.meter_short}</InputAdornment>,
            }}
          />}
        />
        <Controller name="width_shop"
          control={control}
          render={({ field }) => <TextField {...field}
            id="width_shop"
            label={labels.width_shop}
            type="number"
            variant="outlined"
            size="small"
            disabled={busy}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: <InputAdornment position="end">{units.centimeter_short}</InputAdornment>,
            }}
          />}
        />
        <Controller name="density_shop"
          control={control}
          render={({ field }) => <TextField {...field}
            id="density_shop"
            label={labels.density_shop}
            type="number"
            variant="outlined"
            size="small"
            disabled={busy}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: <InputAdornment position="end">{units.gram_short}./{units.meter_short}2</InputAdornment>,
            }}
          />}
        />
      </div>
      <Button
        type='submit'
        size='sm'
        aria-labelledby={save}
        disabled={busy}
      >
        {save}
      </Button>
    </form>
  </div>
}


          // {/*              <Field name="image"
          //       label={labels.image}
          //       component={FileFloatingFormGroup}
          //       setPreviewUrl={setPreviewUrl}
          //       disabled={busy}
          //     />*/}
          // {/*              <FileFloatingFormGroup name="image"
          //       label={labels.image}
          //       setPreviewUrl={setPreviewUrl}
          //       disabled={busy}
          //     />*/}

        // {/*            <FloatingFormGroup name="density_for_count"
        //       label={labels.density_for_count}
        //       type="number"
        //       disabled
        //     />*/}
        // {/*          <FormControl size='small' fullWidth>
        //     <InputLabel shrink>{labels.density_for_count}</InputLabel>
        //     <Chip label={densityForCount({ weightForCount, lengthForCount, width })}
        //     endAdornment={<InputAdornment position="end">{units.gram_short}./{units.meter_short}2</InputAdornment>}
        //       variant="outlined" className='mt-2' />
        //   </FormControl>*/}

        // {/*            <Field name="meters_in_roll"
        //       label={labels.meters_in_roll}
        //       type="number"
        //       disabled
        //       component={FloatingFormGroup}
        //     />*/}

          // {/*              <Field name="prices"
          //       label={labels.prices}
          //       disabled
          //       component={FloatingFormGroup}
          //     />*/}

// {/*              <SelectFloatingFormGroup name='product_type_id'
//                 label={labels.product_type_id}
//                 dataKey='id'
//                 textField='name'
//                 choices={productTypes}
//                 disabled={busy}
//               />*/}
// {/*              <SelectFloatingFormGroup name='threads'
//                 label={labels.threads}
//                 dataKey='value'
//                 textField='display_name'
//                 choices={labels.threadsChoices}
//                 disabled={busy}
//               />*/}

                // src={previewUrl
                //   ? previewUrl
                //   : props.initialValues.image
                //     ? `https://res.cloudinary.com/du9yvygkg/image/upload/v${props.initialValues.image}`
                //     : blank}

              // <Image
              //   src={previewUrl
              //     ? previewUrl
              //     : props.initialValues.image
              //       ? `https://res.cloudinary.com/du9yvygkg/image/upload/v${props.initialValues.image}`
              //       : blank}
              //   alt={previewUrl ? 'File uploader preview' : labels.image}
              //   width={300}
              //   height={300}
              //   // fill={true}
              //   priority={true}
              //   className='max-w-xs mb-1 h-auto rounded-lg shadow-xl dark:shadow-gray-800'
              // />