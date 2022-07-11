import {notBlank} from '../Shared/Validators'

const emptyObject = {}

export const validate = ({
  blank,
} = emptyObject) => (values) => notBlank(values, ['customer'], blank)
