import { notBlank, isInteger } from '../Shared/Validators'

// export const validate = values => notInteger(values, ['price', 'price_pre'])

export const validate = values =>
	({
	   ...notBlank(values, ['price', 'name']),
	   ...isInteger(values, ['price', 'price_pre', 'width', 'density',
	   						 'width_shop', 'density_shop',
	   						 'weight_for_count']),
	})

