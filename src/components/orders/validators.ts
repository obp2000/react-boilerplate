import { notBlank } from '../Shared/validators'
import { OrderFormValues, ErrorMessages } from '../../../interfaces'

export const validate = (errorMessages: ErrorMessages | undefined) =>
  (values: OrderFormValues) =>
    notBlank(values, ['customer'], errorMessages?.blank)
