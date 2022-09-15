import { notBlank } from '../Shared/validators'
import { OrderFormValues, ErrorMessages } from '../../../interfaces'

export const validate = (errorMessages: ErrorMessages) =>
  (values: OrderFormValues) =>
    notBlank(values, ['customer'], errorMessages?.blank)
