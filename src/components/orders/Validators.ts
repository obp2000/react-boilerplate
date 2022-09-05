import {notBlank} from '../Shared/Validators'
import {OrderFormValues, ErrorMessages} from '../../../interfaces'

export const validate = (errorMessages: ErrorMessages) =>
  (values: OrderFormValues) =>
    notBlank(values, ['customer'], errorMessages?.blank)
