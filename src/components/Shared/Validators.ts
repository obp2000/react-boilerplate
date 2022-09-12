import {
  CustomerFormValues,
  ProductFormValues,
  OrderFormValues,
} from '../../../interfaces'
import {
  LoginFormValues,
  RegisterFormValues
} from '../../../interfaces/auth'

type Errors = {
  [index: string]: string
}

const emptyString = ''

export function notBlank(
  values: CustomerFormValues,
  fields: string[],
  errorText: string | undefined
): Errors
export function notBlank(
  values: ProductFormValues,
  fields: string[],
  errorText: string | undefined
): Errors
export function notBlank(
  values: OrderFormValues,
  fields: string[],
  errorText: string | undefined
): Errors
export function notBlank(
  values: LoginFormValues,
  fields: string[],
  errorText: string | undefined
): Errors
export function notBlank(
  values: RegisterFormValues,
  fields: string[],
  errorText: string | undefined
): Errors
export function notBlank(
  values: any,
  fields: string[],
  errorText = emptyString
): Errors {
  return fields.reduce((errors, field) => {
    if (!values[field] || (field === 'city' && !values[field].pindex)) {
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
  values: ProductFormValues,
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
