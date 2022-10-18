import type { ErrorMessages } from '../../../interfaces/commonConsts'
import type { Order } from '../../../interfaces/orders'
import { notBlank } from '../validators/validators'
import { objectFormConfig } from './config'

export const validate = (errorMessages: ErrorMessages | undefined) =>
  (values: Partial<Order>) => notBlank(values,
    objectFormConfig.validatedFields.notBlank,
    errorMessages?.blank
  )
