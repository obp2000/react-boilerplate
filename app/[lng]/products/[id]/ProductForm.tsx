'use client'

import { useTranslation } from '@/app/i18n/client'
import Button from '@/client/Button'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import SwitchFormGroup from '@/formInput/SwitchFormGroup'
import { mutateObject } from '@/objectForm/client'
import { MainContext } from '@/options/context'
import SelectFloatingFormGroup from '@/selectField/SelectFloatingFormGroup'
import { useDisabled } from '@/submitButton/hooks'
import { validate } from '@/validators/validators'
import { ProductType } from '@prisma/client'
import type { Decorator } from 'final-form'
import createDecorator from 'final-form-calculate'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Field, Form, FormProps } from 'react-final-form'
import { calculations, Values } from './calculator'
import options from './options.json'
import validatedFields from './validatedFields.json'

type Props = Partial<FormProps> &
{
  id: string
  productTypes: Pick<ProductType, 'id' | 'name'>[]
  options?: typeof options
  lng: string
  save: string
}

export default function FormComp({
  id,
  initialValues,
  productTypes,
  lng,
  save,
}: Props) {
  const { t } = useTranslation(lng)
  options.product_type_id.choices = productTypes
  const { refresh, push } = useRouter()
  const onSubmit = (values: Values) => mutateObject({
    modValues: values,
    indexUrl: 'products',
    refresh,
    push,
    t,
    id,
    contentType: 'multipart/form-data',
  })
  return <Form {...{
    name: 'objectForm',
    initialValues,
    validate: validate(validatedFields),
    onSubmit,
    decorators: [createDecorator(...calculations) as Decorator<Values>],
  }} >
    {(props) => <MainContext.Provider value={{ options }}>
      <div className="bg-white shadow-md rounded p-2 text-sm">
        <form onSubmit={props.handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-3 pt-4">
            <Image
              // src={`${image}` || '/blank.png'}
              src={`https://res.cloudinary.com/du9yvygkg/image/upload/v${props.initialValues?.image}`}
              alt={options.image.label || 'Blank'}
              width={500}
              height={props.initialValues?.image ? 500 : 300}
              priority={true}
              className='max-w-xs h-auto rounded-lg shadow-xl dark:shadow-gray-800'
            />
            <div className='col-span-2'>
              <div className='grid gap-6 mb-6 md:grid-cols-4 pt-4 col-span-2'>
                <SelectFloatingFormGroup
                  name='product_type_id' dataKey='id' textField='name' />
                <SelectFloatingFormGroup
                  name='threads' dataKey='value' textField='display_name' />
                <SelectFloatingFormGroup
                  name='contents' dataKey='value' textField='display_name' />
                <Field
                  name="fleece" type="checkbox" component={SwitchFormGroup} />
              </div>
              <Field name="name" component={FloatingFormGroup} />
              <div className="columns-5 my-6">
                <Field name="dollar_price" step='0.1'
                  component={FloatingFormGroup} />
                <Field name="dollar_rate" component={FloatingFormGroup} />
                <Field name="width" component={FloatingFormGroup} />
                <Field name="density" component={FloatingFormGroup} />
                <Field name="price" component={FloatingFormGroup} />
              </div>
              <Field name="prices" disabled component={FloatingFormGroup} />
            </div>
          </div>
          <div className='grid gap-3 mb-3 md:grid-cols-2 pt-4'>
            <Field name="image" component={FloatingFormGroup} />
          </div>
          <div className="grid gap-3 mb-3 md:grid-cols-8 pt-4">
            <Field name="weight_for_count" component={FloatingFormGroup} />
            <Field
              name="length_for_count" step="0.1"
              component={FloatingFormGroup} />
            <Field
              name="density_for_count" disabled
              component={FloatingFormGroup} />
            <Field name='weight' step='0.1' component={FloatingFormGroup} />
            <Field name="meters_in_roll" disabled
              component={FloatingFormGroup} />
            <Field name="price_pre" component={FloatingFormGroup} />
            <Field name="width_shop" component={FloatingFormGroup} />
            <Field name="density_shop" component={FloatingFormGroup} />
          </div>
          <Button
            type='submit'
            size='sm'
            aria-labelledby={save}
            disabled={useDisabled(props)} >
            {save}
          </Button>
        </form>
      </div>
    </MainContext.Provider>}
  </Form >
}


// export function FormComp1({
//   id,
//   initialValues,
//   lng,
//   save,
//   notFound,
// }: Props) {
//   const { t } = useTranslation(lng)
//   const { refresh, push } = useRouter()
//   const onSubmit = (values: Values) => mutateObject({
//     // modValues: modFormValues(values as CustomerSelect),
//     modValues: values,
//     indexUrl: 'customers',
//     refresh,
//     push,
//     t,
//     id,
//   })
//   return <Form {...{
//     name: 'objectForm',
//     initialValues,
//     validate: validate(validatedFields),
//     onSubmit,
//   }} >
//     {(props) => <MainContext.Provider value={{ options }}>
//       <Layout {...props} {...{ save }}>
//         <div className="grid gap-6 mb-6 md:grid-cols-4 pt-4">
//           <Field name="nick" component={FloatingFormGroup} />
//           <Field name="name" component={FloatingFormGroup} />
//           <Localization messages={{ emptyList: notFound, emptyFilter: notFound }} >
//             <Field name="city" component={DropdownListFormGroup}
//               {...useCityDropdownAttrs()} lng={lng}
//             />
//           </Localization>
//           <Field name="address" component={FloatingFormGroup} />
//         </div>
//       </Layout>
//     </MainContext.Provider>}
//   </Form>
// }


          // <div className="grid gap-1 mb-6 md:grid-cols-5 pt-4">

          // <ProductImage {...props} />