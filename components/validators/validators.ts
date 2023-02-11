import { Translation } from '@/app/i18n/dictionaries'
import type { Values as CustomerValues } from '@/app/[lng]/customers/[id]/calculator'
import type { Values as OrderValues } from '@/app/[lng]/orders/[id]/calculator'
import type { Values as ProductValues } from '@/app/[lng]/products/[id]/calculator'
import { LoginValues } from '@/auth/LoginForm'
import { RegisterValues } from '@/auth/RegisterForm'
import type { DropdownFieldValue } from '@/interfaces/dropdownList'
import { City } from '@/pages/api/cities/validators'
import { Customer } from '@/pages/api/customers/validators'
import { validate as validateEmail } from 'isemail'
import {
  is, min, nonempty,
  number,
  refine,
  size,
  string
} from 'superstruct'

export type AnyFormValues =
  CustomerValues | ProductValues | OrderValues | RegisterValues | LoginValues

// const emptyString = ''

export function required({ blank }: Translation['errorMessages']) {
  return (value: AnyFormValues) =>
    is(value, nonempty(string())) ? undefined : blank
}

export function requiredObject(
  object: typeof City,
  { blank }: Translation['errorMessages']
): (value: DropdownFieldValue) => string | undefined
export function requiredObject(
  object: typeof Customer,
  { blank }: Translation['errorMessages']
): (value: DropdownFieldValue) => string | undefined
export function requiredObject(
  object: any,
  { blank }: Translation['errorMessages']
): (value: DropdownFieldValue) => string | undefined {
  return (value: DropdownFieldValue) => is(value, object) ? undefined : blank
}

export function requiredNumber({ blank }: Translation['errorMessages']) {
  return (value: AnyFormValues) =>
    is(value, min(number(), 0.01)) ? undefined : blank
}

export function isEmail({ invalid_email }: Translation['errorMessages']) {
  return (value: AnyFormValues) => is(value, refine(string(), 'email',
    (value) => validateEmail(value))) ? undefined : invalid_email
}

export function shortPassword({ short_password }: Translation['errorMessages']) {
  return (value: AnyFormValues) =>
    is(value, size(string(), 8, 255)) ? undefined : short_password
}

export function validatePasswordConfirmation({
  password_mismatch
}: Translation['errorMessages']) {
  return ({ password1, password2 }: RegisterValues) =>
    password1 === password2 ? {} : { password2: password_mismatch }
}

export function composeValidators(
  ...validators: ((value: AnyFormValues) => string | undefined)[]
) {
  return (value: AnyFormValues) =>
    validators.reduce((result: string | undefined, validator) => {
      let error = validator(value)
      if (error) {
        result = (result ? result + ' ' : '') + error
      }
      return result
    }, undefined)
}




// export function notBlank(
//   values: AnyFormValues = {},
//   fields: string[],
//   errorText = emptyString
// ): ValidationErrors {
//   return fields.reduce((errors, field) => {
//     if (!is(values[field as keyof AnyFormValues], nonempty(string()))) {
//       if (errors) {
//         errors[field] = errorText
//       }
//     }
//     return errors
//   }, {} as ValidationErrors)
// }

// export function notBlankCustomer(
//   values: AnyFormValues = {},
//   field: string,
//   errorText = emptyString
// ): ValidationErrors {
//   const error: ValidationErrors = {}
//   if (!is(values[field as keyof AnyFormValues], Customer)) {
//     error[field] = errorText
//   }
//   return error
// }

// export function minNumber(
//   values: AnyFormValues = {},
//   fields: string[],
//   errorText = emptyString
// ): ValidationErrors {
//   return fields.reduce((errors, field) => {
//     if (!is(Number(values[field as keyof AnyFormValues]),
//       min(number(), 0.01))) {
//       if (errors) {
//         errors[field] = errorText
//       }
//     }
//     return errors
//   }, {} as ValidationErrors)
// }

// export function validEmail(
//   values: AnyFormValues = {},
//   field: string,
//   errorText = emptyString
// ): ValidationErrors {
//   const error: ValidationErrors = {}
//   // if (values[field] &&
//   //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[field])) {
//   if (!is(values[field as keyof AnyFormValues], refine(string(), 'email',
//     (value) => validateEmail(value)))) {
//     error[field] = errorText
//   }
//   return error
// }

// export function passwordLength(
//   values: AnyFormValues = {},
//   field: string,
//   errorText = emptyString,
// ): ValidationErrors {
//   const error: ValidationErrors = {}
//   // if (values[field] && (values[field].length < 8)) {
//   if (!is(values[field as keyof AnyFormValues], size(string(), 8, 255))) {
//     error[field] = errorText
//   }
//   return error
// }

// export function validPasswordConfirmation(
//   values: AnyFormValues = {},
//   passwordField: string,
//   passwordConfirmationField: string,
//   errorText = emptyString,
// ): ValidationErrors {
//   const error: ValidationErrors = {}
//   if (values[passwordField as keyof AnyFormValues] !==
//     values[passwordConfirmationField as keyof AnyFormValues]) {
//     error[passwordConfirmationField] = errorText
//   }
//   return error
// }

// export function isInteger(
//   values: AnyFormValues = {},
//   fields: string[],
//   errorText = emptyString
// ): ValidationErrors {
//   return fields.reduce((errors, field) => {
//     // if (values[field] && !Number.isInteger(Number(values[field]))) {
//     if (!is(values[field as keyof AnyFormValues], integer())) {
//       if (errors) {
//         errors[field] = errorText
//       }
//     }
//     return errors
//   }, {} as ValidationErrors)
// }

// export function validate(props: typeof customerValidatedFields,
//   errorMessages: Translation['errorMessages']): (values: AnyFormValues) => {}
// export function validate(props: typeof productValidatedFields,
//   errorMessages: Translation['errorMessages']): (values: AnyFormValues) => {}
// export function validate(props: typeof orderValidatedFields,
//   errorMessages: Translation['errorMessages']): (values: AnyFormValues) => {}
// export function validate(props: typeof loginFormConfig['validatedFields'],
//   errorMessages: Translation['errorMessages']): (values: AnyFormValues) => {}
// export function validate(props: typeof registerFormConfig['validatedFields'],
//   errorMessages: Translation['errorMessages']): (values: AnyFormValues) => {}
// export function validate({
//   notBlank: notBlankFields,
//   notBlankCustomer: notBlankCustomerField,
//   minNumber: minNumberFields,
//   validEmail: validEmailField,
//   passwordLength: passwordLengthField,
//   validPasswordConfirmation: validPasswordConfirmationFields,
// }: any, errorMessages: Translation['errorMessages']): (values: AnyFormValues) => {} {
//   return (values: AnyFormValues) => {
//     let result = {}
//     if (notBlankFields) {
//       result = {
//         ...result,
//         ...notBlank(values, notBlankFields, errorMessages?.blank)
//       }
//     }
//     if (notBlankCustomerField) {
//       result = {
//         ...result,
//         ...notBlankCustomer(values, notBlankCustomerField, errorMessages?.blank)
//       }
//     }
//     if (minNumberFields) {
//       result = {
//         ...result,
//         ...minNumber(values, minNumberFields, errorMessages?.blank)
//       }
//     }
//     if (validEmailField) {
//       result = {
//         ...result,
//         ...validEmail(values, validEmailField, errorMessages?.invalid_email)
//       }
//     }
//     if (passwordLengthField) {
//       result = {
//         ...result,
//         ...passwordLength(values, passwordLengthField, errorMessages?.short_password)
//       }
//     }
//     if (validPasswordConfirmationFields) {
//       result = {
//         ...result,
//         ...validPasswordConfirmation(values,
//           validPasswordConfirmationFields[0],
//           validPasswordConfirmationFields[1],
//           'password_mismatch')
//       }
//     }
//     return result
//   }
// }
