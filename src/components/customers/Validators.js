import { notBlank } from '../Shared/Validators'

export const validate = (values) => {
	// console.log('values: ', values)
	return notBlank(values, ['nick', 'name', 'city'])
}