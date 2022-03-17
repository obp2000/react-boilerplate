export const notBlank = (values, fields, error_text = '') =>
    fields.reduce((errors, field) => {
        if (!values[field] || (field == 'city' && !values[field].pindex)) {
            errors[field] = error_text
        }
        return errors
    }, {})

export const validEmail = (values, field, error_text = '') => {
    const error = {}
    if (values[field] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[field])) {
        error[field] = error_text
    }
    return error
}

export const passwordLength = (values, field, error_text = '') => {
    const error = {}
    if (values[field] && (values[field].length < 8)) {
        error[field] = error_text
    }
    return error
}

export const validPasswordConfirmation = (values,
    password_field,
    password_confirmation_field,
    error_text = '') => {
    const error = {}
    if (values[password_field] != values[password_confirmation_field]) {
        error[password_confirmation_field] = error_text
    }
    return error
}

export const isInteger = (values, fields, error_text = '') =>
    fields.reduce((errors, field) => {
        if (values[field] && !Number.isInteger(Number(values[field]))) {
            errors[field] = error_text
        }
        return errors
    }, {})