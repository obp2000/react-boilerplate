import {
    reduxForm
} from 'redux-form'
import {
    onSubmitRegister as onSubmit,
    onSubmitSuccessRegister as onSubmitSuccess,
    onSubmitFailRegister as onSubmitFail
} from '../../redux/auth'
import RegisterForm from '../RegisterForm'
import {
    validateRegister as validate
} from '../Validators'

export default reduxForm({
    form: 'Register',
    validate,
    onSubmit,
    onSubmitSuccess,
    onSubmitFail
})(RegisterForm)