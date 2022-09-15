import { notBlank } from '../Shared/validators'
import { ProductFormValues, ErrorMessages } from '../../../interfaces'

export const validate = (errorMessages: ErrorMessages) =>
  (values: ProductFormValues) =>
    notBlank(values, ['name', 'price'], errorMessages?.blank)


// export const validate = ({
//   blank,
//   not_integer,
// } = {}) => (values) => ({
//   ...notBlank(values, ['price', 'name'], blank),
//   ...isInteger(values, ['price', 'price_pre', 'width', 'density',
//               'width_shop', 'density_shop',
//               'weight_for_count'], not_integer),
// })
