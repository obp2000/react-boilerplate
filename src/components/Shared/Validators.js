export const notBlank = (values, fields, errorText = '') =>
  fields.reduce((errors, field) => {
    if (!values[field] || (field == 'city' && !values[field].pindex)) {
      errors[field] = errorText
    }
    return errors
  }, {})

export const validEmail = (values, field, errorText = '') => {
  const error = {}
  if (values[field] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      .test(values[field])) {
    error[field] = errorText
  }
  return error
}

export const passwordLength = (values, field, errorText = '') => {
  const error = {}
  if (values[field] && (values[field].length < 8)) {
    error[field] = errorText
  }
  return error
}

export const validPasswordConfirmation = (
    values,
    passwordField,
    passwordConfirmationField,
    errorText = '',
) => {
  const error = {}
  if (values[passwordField] != values[passwordConfirmationField]) {
    error[passwordConfirmationField] = errorText
  }
  return error
}

export const isInteger = (values, fields, errorText = '') =>
  fields.reduce((errors, field) => {
    if (values[field] && !Number.isInteger(Number(values[field]))) {
      errors[field] = errorText
    }
    return errors
  }, {})
