import { notBlank } from '../Shared/Validators'

export const validate = error_messages => values =>
    notBlank(values, ['nick'], error_messages?.blank)
