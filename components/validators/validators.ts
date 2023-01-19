import type { Values as CustomerValues } from '@/app/[lng]/customers/[id]/calculator'
import customerValidatedFields from '@/app/[lng]/customers/[id]/validatedFields.json'
import type { Values as OrderValues } from '@/app/[lng]/orders/[id]/calculator'
import orderValidatedFields from '@/app/[lng]/orders/[id]/validatedFields.json'
import type { Values as ProductValues } from '@/app/[lng]/products/[id]/calculator'
import productValidatedFields from '@/app/[lng]/products/[id]/validatedFields.json'
import type { Values as UserValues } from '@/auth/AuthButtonAndModal'
import loginFormConfig from '@/auth/loginFormConfig.json'
import registerFormConfig from '@/auth/registerFormConfig.json'
import { ValidationErrors } from "final-form"
import { validate as validateEmail } from 'isemail'
import {
    integer,
    is, min, nonempty,
    number,
    refine,
    size,
    string
} from 'superstruct'

export type AnyFormValues =
CustomerValues | ProductValues | OrderValues | UserValues

const emptyString = ''

export function notBlank(
  values: AnyFormValues = {},
  fields: string[],
  errorText = emptyString
): ValidationErrors {
  return fields.reduce((errors, field) => {
    if (!is(values[field as keyof AnyFormValues], nonempty(string()))) {
      if (errors) {
        errors[field] = errorText
      }
    }
    return errors
  }, {} as ValidationErrors)
}

export function minNumber(
  values: AnyFormValues = {},
  fields: string[],
  errorText = emptyString
): ValidationErrors {
  return fields.reduce((errors, field) => {
    if (!is(Number(values[field as keyof AnyFormValues]),
      min(number(), 0.01))) {
      if (errors) {
        errors[field] = errorText
      }
    }
    return errors
  }, {} as ValidationErrors)
}

export function validEmail(
  values: AnyFormValues = {},
  field: string,
  errorText = emptyString
): ValidationErrors {
  const error: ValidationErrors = {}
  // if (values[field] &&
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[field])) {
  if (!is(values[field as keyof AnyFormValues], refine(string(), 'email',
    (value) => validateEmail(value)))) {
    error[field] = errorText
  }
  return error
}

export function passwordLength(
  values: AnyFormValues = {},
  field: string,
  errorText = emptyString,
): ValidationErrors {
  const error: ValidationErrors = {}
  // if (values[field] && (values[field].length < 8)) {
  if (!is(values[field as keyof AnyFormValues], size(string(), 8, 255))) {
    error[field] = errorText
  }
  return error
}

export function validPasswordConfirmation(
  values: AnyFormValues = {},
  passwordField: string,
  passwordConfirmationField: string,
  errorText = emptyString,
): ValidationErrors {
  const error: ValidationErrors = {}
  if (values[passwordField as keyof AnyFormValues] !==
      values[passwordConfirmationField as keyof AnyFormValues]) {
    error[passwordConfirmationField] = errorText
  }
  return error
}

export function isInteger(
  values: AnyFormValues = {},
  fields: string[],
  errorText = emptyString
): ValidationErrors {
  return fields.reduce((errors, field) => {
    // if (values[field] && !Number.isInteger(Number(values[field]))) {
    if (!is(values[field as keyof AnyFormValues], integer())) {
      if (errors) {
        errors[field] = errorText
      }
    }
    return errors
  }, {} as ValidationErrors)
}

export function validate(props: typeof customerValidatedFields): (values: AnyFormValues) => {}
export function validate(props: typeof productValidatedFields): (values: AnyFormValues) => {}
export function validate(props: typeof orderValidatedFields): (values: AnyFormValues) => {}
export function validate(props: typeof loginFormConfig['validatedFields']): (values: AnyFormValues) => {}
export function validate(props: typeof registerFormConfig['validatedFields']): (values: AnyFormValues) => {}
export function validate({
  notBlank: notBlankFields,
  minNumber: minNumberFields,
  validEmail: validEmailField,
  passwordLength: passwordLengthField,
  validPasswordConfirmation: validPasswordConfirmationFields,
}: any): (values: AnyFormValues) => {} {
  return (values: AnyFormValues) => {
    let result = {}
    if (notBlankFields) {
      result = {
        ...result,
        ...notBlank(values, notBlankFields, 'blank')
      }
    }
    if (minNumberFields) {
      result = {
        ...result,
        ...minNumber(values, minNumberFields, 'blank')
      }
    }
    if (validEmailField) {
      result = {
        ...result,
        ...validEmail(values, validEmailField, 'invalid_email')
      }
    }
    if (passwordLengthField) {
      result = {
        ...result,
        ...passwordLength(values, passwordLengthField, 'short_password')
      }
    }
    if (validPasswordConfirmationFields) {
      result = {
        ...result,
        ...validPasswordConfirmation(values,
          validPasswordConfirmationFields[0],
          validPasswordConfirmationFields[1],
          'password_mismatch')
      }
    }
    return result
  }
}
