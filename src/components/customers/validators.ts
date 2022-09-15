import { notBlank } from '../Shared/validators'
import { CustomerFormValues, ErrorMessages } from '../../../interfaces'

export const validate = (errorMessages: ErrorMessages | undefined) =>
  (values: CustomerFormValues) =>
    notBlank(values, ['nick'], errorMessages?.blank)
