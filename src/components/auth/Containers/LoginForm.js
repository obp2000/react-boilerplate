import { connect } from 'react-redux'
import { onSubmitLogin as onSubmit } from '../../redux/auth'
import LoginForm from '../LoginForm'

export default connect(null, { onSubmit })(LoginForm)
