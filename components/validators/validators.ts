import { RegisterFormValues } from '../../interfaces/auth'
// import { City } from '../../interfaces/cities'
import type { ValidatedFields } from '../../interfaces'
import type { ErrorMessages } from '../../interfaces/commonConsts'
import { Errors } from '../../interfaces/errors'
import type { AnyFormValues } from '../../interfaces/objectForm'
import { Product } from '../../interfaces/products'

const emptyString = ''

export function notBlank(
  values: AnyFormValues,
  fields: string[],
  errorText = emptyString
): Errors {
  return fields.reduce((errors, field) => {
    if (!values[field as keyof AnyFormValues]) {
      errors[field] = errorText
    }
    return errors
  }, {} as Errors)
}

export function validEmail(
  values: RegisterFormValues,
  field: string,
  errorText: string | undefined
): Errors
export function validEmail(
  values: any,
  field: string,
  errorText = emptyString
): Errors {
  const error: Errors = {}
  if (values[field] &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[field])) {
    error[field] = errorText
  }
  return error
}

export function passwordLength(
  values: RegisterFormValues,
  field: string,
  errorText: string | undefined
): Errors
export function passwordLength(
  values: any,
  field: string,
  errorText = emptyString,
): Errors {
  const error: Errors = {}
  if (values[field] && (values[field].length < 8)) {
    error[field] = errorText
  }
  return error
}

export function validPasswordConfirmation(
  values: RegisterFormValues,
  passwordField: string,
  passwordConfirmationField: string,
  errorText: string | undefined
): Errors
export function validPasswordConfirmation(
  values: any,
  passwordField: string,
  passwordConfirmationField: string,
  errorText = emptyString,
): Errors {
  const error: Errors = {}
  if (values[passwordField] !== values[passwordConfirmationField]) {
    error[passwordConfirmationField] = errorText
  }
  return error
}

export function isInteger(
  values: Product,
  fields: string[],
  errorText: string | undefined
): Errors
export function isInteger(
  values: any,
  fields: string[],
  errorText = emptyString
): Errors {
  return fields.reduce((errors, field) => {
    if (values[field] && !Number.isInteger(Number(values[field]))) {
      errors[field] = errorText
    }
    return errors
  }, {} as Errors)
}

export type Validate = {
  errorMessages?: ErrorMessages
  validatedFields: ValidatedFields
}

export const validate = ({ errorMessages, validatedFields }: Validate) =>
  (values: AnyFormValues) => {
    let result = {}
    if (validatedFields.notBlank) {
      result = {
        ...result,
        ...notBlank(values, validatedFields.notBlank, errorMessages?.blank)
      }
    }
    if (validatedFields.validEmail) {
      result = {
        ...result,
        ...validEmail(values as RegisterFormValues,
          validatedFields.validEmail, errorMessages?.invalid_email)
      }
    }
    if (validatedFields.passwordLength) {
      result = {
        ...result,
        ...passwordLength(values as RegisterFormValues,
          validatedFields.passwordLength, errorMessages?.short_password)
      }
    }
    if (validatedFields.validPasswordConfirmation) {
      result = {
        ...result,
        ...validPasswordConfirmation(
          values as RegisterFormValues,
          validatedFields.validPasswordConfirmation[0],
          validatedFields.validPasswordConfirmation[1],
          errorMessages?.password_mismatch)
      }
    }
    return result
  }
