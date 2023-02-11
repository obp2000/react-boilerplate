'use client'

import { Translation } from '@/app/i18n/dictionaries'
import Button from '@/client/Button'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import SwitchFormGroup from '@/formInput/SwitchFormGroup'
import { mutateObject } from '@/app/[lng]/[table]/[id]/client'
import SelectFloatingFormGroup from '@/selectField/SelectFloatingFormGroup'
import { isDisabled } from '@/submitButton/hooks'
import { required, requiredNumber } from '@/validators/validators'
import { ProductType } from '@prisma/client'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring'
import { useState, useTransition } from 'react'
import { Field, Form, FormProps } from 'react-final-form'
import { decorators, type Values } from './calculator'
// import blank from '/public/blank.png'
import FileFloatingFormGroup from '@/formInput/FileFloatingFormGroup'
import clsx from 'clsx'

export type ProductFormProps = FormProps['initialValues'] &
{
  lng: string
  isNewObject: boolean
  params: ParsedUrlQuery
  productTypes: Pick<ProductType, 'id' | 'name'>[]
  save: string
  message: string
  errorMessages: Translation['errorMessages']
  labels: Translation['product']
}

export default function FormComp({
  lng,
  isNewObject,
  params,
  initialValues,
  productTypes,
  save,
  message,
  errorMessages,
  labels,
}: ProductFormProps) {
  const { refresh, push } = useRouter()
  const [isPending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const onSubmit = (values: Values) => mutateObject({
    isNewObject,
    lng,
    modValues: values,
    indexUrl: '/products/',
    refresh,
    push,
    id: params.id,
    contentType: 'multipart/form-data',
    message,
    startTransition,
  })
  return <Form {...{
    name: 'objectForm',
    initialValues,
    onSubmit,
    decorators,
  }} >
    {({ handleSubmit, submitting, initialValues, ...props }) => {
      const busy = submitting || isPending
      return <div className={clsx('bg-white shadow-md rounded p-2 text-sm',
        { 'opacity-70': busy })}>
        <form onSubmit={handleSubmit}>
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
              <Field name="image"
                label={labels.image}
                component={FileFloatingFormGroup}
                setPreviewUrl={setPreviewUrl}
                disabled={busy}
              />
            </div>
            <div className='col-span-2'>
              <div className='grid gap-6 mb-6 md:grid-cols-4 pt-4 col-span-2'>
                <SelectFloatingFormGroup name='product_type_id'
                  label={labels.product_type_id}
                  dataKey='id'
                  textField='name'
                  choices={productTypes}
                  disabled={busy}
                />
                <SelectFloatingFormGroup name='threads'
                  label={labels.threads}
                  dataKey='value'
                  textField='display_name'
                  choices={labels.threadsChoices}
                  disabled={busy}
                />
                <SelectFloatingFormGroup name='contents'
                  label={labels.contents}
                  dataKey='value'
                  textField='display_name'
                  choices={labels.contentsChoices}
                  disabled={busy}
                />
                <Field name="fleece"
                  label={labels.fleece}
                  type="checkbox"
                  component={SwitchFormGroup}
                  disabled={busy}
                />
              </div>
              <Field name="name"
                label={labels.name}
                component={FloatingFormGroup}
                validate={required(errorMessages)}
                required
                disabled={busy}
              />
              <div className="columns-5 my-6">
                <Field name="dollar_price"
                  label={labels.dollar_price}
                  type="number"
                  step='0.1'
                  component={FloatingFormGroup}
                  disabled={busy}
                />
                <Field name="dollar_rate"
                  label={labels.dollar_rate}
                  type="number"
                  component={FloatingFormGroup}
                  disabled={busy}
                />
                <Field name="width"
                  label={labels.width}
                  type="number"
                  component={FloatingFormGroup}
                  disabled={busy}
                />
                <Field name="density"
                  label={labels.density}
                  type="number"
                  component={FloatingFormGroup}
                  disabled={busy}
                />
                <Field name="price"
                  label={labels.price}
                  type="number"
                  component={FloatingFormGroup}
                  validate={requiredNumber(errorMessages)}
                  required
                  disabled={busy}
                />
              </div>
              <Field name="prices"
                label={labels.prices}
                disabled
                component={FloatingFormGroup}
              />
            </div>
          </div>
          <div className="grid gap-3 mb-3 md:grid-cols-7 pt-4">
            <Field name="weight_for_count"
              label={labels.weight_for_count}
              type="number"
              component={FloatingFormGroup}
              disabled={busy}
            />
            <Field name="length_for_count"
              label={labels.length_for_count}
              type="number"
              step="0.1"
              component={FloatingFormGroup}
              disabled={busy}
            />
            <Field name="density_for_count"
              label={labels.density_for_count}
              type="number"
              disabled
              component={FloatingFormGroup}
            />
            <Field name='weight'
              label={labels.weight}
              type="number"
              step='0.1'
              component={FloatingFormGroup}
              disabled={busy}
            />
            <Field name="meters_in_roll"
              label={labels.meters_in_roll}
              type="number"
              disabled
              component={FloatingFormGroup}
            />
          </div>
          <div className="grid gap-3 mb-3 md:grid-cols-8 pt-4">
            <Field name="price_pre"
              label={labels.price_pre}
              type="number"
              component={FloatingFormGroup}
              disabled={busy}
            />
            <Field name="width_shop"
              label={labels.width_shop}
              type="number"
              component={FloatingFormGroup}
              disabled={busy}
            />
            <Field name="density_shop"
              label={labels.density_shop}
              type="number"
              component={FloatingFormGroup}
              disabled={busy}
            />
          </div>
          <Button
            type='submit'
            size='sm'
            aria-labelledby={save}
            disabled={isDisabled(props) || busy} >
            {save}
          </Button>
        </form>
      </div>
    }}
  </Form >
}


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