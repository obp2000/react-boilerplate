import {
    reduxForm
} from 'redux-form'
import {
    onSubmitLogin as onSubmit,
    onSubmitSuccessLogin as onSubmitSuccess,
    onSubmitFailLogin as onSubmitFail
} from '../../redux/auth'
import LoginForm from '../LoginForm'
import {
    validateLogin as validate
} from '../Validators'

export default reduxForm({
    form: 'Login',
    validate,
    onSubmit,
    onSubmitSuccess,
    onSubmitFail
})(LoginForm)