import { notBlank } from '../Shared/Validators'

export const validate = ({
    blank
} = {}) => values => notBlank(values, ['customer'], blank)
