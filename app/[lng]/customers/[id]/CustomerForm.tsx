'use client'

import { useTranslation } from '@/app/i18n/client'
import {
  useDropdown as useCityDropdownAttrs
} from '@/app/[lng]/customers/cities/hooks'
import Button from '@/client/Button'
import Form from '@/client/Form'
import DropdownListFormGroup from '@/dropdownList/DropdownListFormGroup'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import { mutateObject } from '@/objectForm/client'
import { MainContext } from '@/options/context'
import { useDisabled } from '@/submitButton/hooks'
import { validate } from '@/validators/validators'
import { useRouter } from 'next/navigation'
import { Field, type FormProps } from 'react-final-form'
import { Localization } from 'react-widgets'
import { Values } from './calculator'
import options from './options.json'
import validatedFields from './validatedFields.json'

type Props = Partial<FormProps> & {
  id: string
  lng: string
  save: string
  notFound: string
}

export default function FormComp({
  id,
  initialValues,
  lng,
  save,
  notFound,
}: Props) {
  const { t } = useTranslation(lng)
  const { refresh, push } = useRouter()
  const onSubmit = (values: Values) => mutateObject({
    // modValues: modFormValues(values as CustomerSelect),
    modValues: values,
    indexUrl: 'customers',
    refresh,
    push,
    t,
    id,
  })
  return <Form {...{
    name: 'objectForm',
    initialValues,
    validate: validate(validatedFields),
    onSubmit,
  }} >
    {(props) => <MainContext.Provider value={{ options }}>
      <div className="bg-white shadow-md rounded p-2 text-sm">
        <form onSubmit={props.handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-4 pt-4">
            <Field name="nick" component={FloatingFormGroup} />
            <Field name="name" component={FloatingFormGroup} />
            <Localization messages={{ emptyList: notFound, emptyFilter: notFound }} >
              <Field name="city" component={DropdownListFormGroup}
                {...useCityDropdownAttrs()} lng={lng} />
            </Localization>
            <Field name="address" component={FloatingFormGroup} />
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


            // <Field
            //   name="city"
            //   component={DropdownListFormGroup}
            //   {...useCityDropdownAttrs()}
            // />

// .text-sm {
//     font-size: 0.875rem;
//     line-height: 1.25rem;
// }