import {notBlank} from '../Shared/Validators'

const emptyObject = {}

export const validate = ({
  blank,
} = emptyObject) => (values) => notBlank(values, ['name', 'price'], blank)


// export const validate = ({
//   blank,
//   not_integer,
// } = {}) => (values) => ({
//   ...notBlank(values, ['price', 'name'], blank),
//   ...isInteger(values, ['price', 'price_pre', 'width', 'density',
//               'width_shop', 'density_shop',
//               'weight_for_count'], not_integer),
// })
