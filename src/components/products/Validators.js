import {
	notBlank
} from '../Shared/Validators'

export const validate = (values) => notBlank(values, ['name', 'price'])