import type { ErrorMessages } from '../../../interfaces/commonConsts'
import type { Product } from '../../../interfaces/products'
import { notBlank } from '../validators/validators'
import { objectFormConfig } from './config'

export const validate = (errorMessages: ErrorMessages | undefined) =>
  (values: Partial<Product>) => notBlank(values,
    objectFormConfig.validatedFields.notBlank,
    errorMessages?.blank
  )


// export const validate = ({
//   blank,
//   not_integer,
// } = {}) => (values) => ({
//   ...notBlank(values, ['price', 'name'], blank),
//   ...isInteger(values, ['price', 'price_pre', 'width', 'density',
//               'width_shop', 'density_shop',
//               'weight_for_count'], not_integer),
// })
