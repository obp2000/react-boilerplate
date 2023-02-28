// import { InputFieldRenderProps } from '@/interfaces/formInput'
import { useFieldProps } from './hooks'
import WidgetErrors from './WidgetErrors'
import type { Values as CustomerValues } from '@/app/customers/calculator'
import type { Values as OrderValues } from '@/app/orders/calculator'
import type { Values as ProductValues } from '@/app/products/calculator'
import type { FieldError, FieldErrors, Path, UseFormRegister } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import type { Translation } from '@/app/i18n/dictionaries'
import { useFormContext } from "react-hook-form"

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: Path<CustomerValues | OrderValues | ProductValues>
  register: UseFormRegister<CustomerValues | OrderValues | ProductValues>
  errors?: FieldErrors<any>
  errorMessages?: Translation['errorMessages']
  helpText?: string
}

export default function InputComp({ name, label, ...props }: InputProps) {
  // const { color, isInvalid, isValid, ...rest } = useFieldProps(props)
  const { register, errorMessages } = useFormContext()
  // console.log('errorMessages ', errorMessages)
  // console.log('errors ', errors)
  // if (errors[String(name)]) {
  //   props.className = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
  // }
  return <>
    <input id={name} placeholder={label} {...register(String(name))} {...props} />
    <ErrorMessage name={String(name)}
      render={({ message }) => <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {errorMessages[message as keyof typeof errorMessages]}
      </p>} />
    {/*{isInvalid && <WidgetErrors {...props.meta} />}*/}
  </>
}
