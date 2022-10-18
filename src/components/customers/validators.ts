import { objectFormConfig } from './config'
import { notBlank } from '../validators/validators'
import type { ErrorMessages } from '../../../interfaces/commonConsts'
import type { Customer } from '../../../interfaces/customers'

export const validate = (errorMessages: ErrorMessages | undefined) =>
  (values: Partial<Customer>) => notBlank(values,
    objectFormConfig.validatedFields.notBlank,
    errorMessages?.blank
  )
