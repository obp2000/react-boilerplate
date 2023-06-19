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
import { TextField } from '@mui/material'
import { useCallback, useTransition } from 'react'
import {
  Controller,
  useForm,
  type SubmitHandler
} from "react-hook-form"
import ImageUpload from './ImageUpload'
import { struct } from '@/app/product/struct'
import Button from '@/app/components/Button'
import ProductTypeId from './ProductTypeId'
import Threads from './Threads'
import Contents from './Contents'
import Fleece from './Fleece'
import Name from './Name'
import Price from './Price'
import DollarPrice from './DollarPrice'
import DollarRate from './DollarRate'
import Width from './Width'
import Density from './Density'
import Prices from './Prices'
import WeightForCount from './WeightForCount'
import LengthForCount from './LengthForCount'
import DensityForCount from './DensityForCount'
import Weight from './Weight'
import MetersInRoll from './MetersInRoll'
import PricePre from './PricePre'
import WidthShop from './WidthShop'
import DensityShop from './DensityShop'

export default function FormComp({
  mutateArgs,
  initialValues,
  productTypes,
  save,
  errorMessages,
  units,
  labels,
}: ProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const onSubmit: SubmitHandler<Values> = useMutate(mutateArgs)
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
        <ImageUpload {...{ watch, labels, setValue }}
        // onChange={(value) => setValue('image', value, { shouldDirty: true })}
        />
      </div>
      <div className='col-span-4 grid grid-cols-4 gap-2'>
        <ProductTypeId {...{ control, labels, busy, productTypes }} />
        <Threads {...{ control, labels, busy }} />
        <Contents {...{ control, labels, busy }} />
        <div className='pl-2'>
          <Fleece {...{ control, labels, busy, initialValues }} />
        </div>
        <Name {...{ control, labels, busy, errorMessages, errors }} />
        <Price {...{ control, labels, busy, errorMessages, errors, units }} />
        <DollarPrice {...{ control, labels, busy, units }} />
        <DollarRate {...{ control, labels, busy }} />
        <Width {...{ control, labels, busy, units }} />
        <Density {...{ control, labels, busy, units }} />
        <Prices {...{ watch, labels }} />
      </div>
    </div>
    <div className='grid grid-cols-6 gap-2'>
      <WeightForCount {...{ control, labels, busy, units }} />
      <LengthForCount {...{ control, labels, busy, units }} />
      <DensityForCount {...{ watch, labels, units }} />
      <Weight {...{ control, labels, busy, units }} />
      <MetersInRoll {...{ watch, labels, units }} />
    </div>
    <div className='grid grid-cols-6 gap-2 mt-6'>
      <PricePre {...{ control, labels, busy, units }} />
      <WidthShop {...{ control, labels, busy, units }} />
      <DensityShop {...{ control, labels, busy, units }} />
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
