import {notBlank} from '../Shared/Validators'

export const validate = (errorMessages) => (values) =>
  notBlank(values, ['nick'], errorMessages?.blank)
