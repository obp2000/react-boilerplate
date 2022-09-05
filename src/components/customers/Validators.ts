import {notBlank} from '../Shared/Validators'
import {CustomerFormValues, ErrorMessages} from '../../../interfaces'

export const validate = (errorMessages: ErrorMessages) =>
  (values: CustomerFormValues) => notBlank(values, ['nick'], errorMessages?.blank)


// export const validate = (
//   { values }: { values: SearchFormValues }
// ) => notBlank(values, ['term'])
