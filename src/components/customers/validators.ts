import { notBlank } from '../Shared/validators'
import type { CustomerFormValues, ErrorMessages } from '../../../interfaces'

export const validate = (errorMessages: ErrorMessages | undefined) =>
  (values: CustomerFormValues) =>
    notBlank(values, ['nick'], errorMessages?.blank)
