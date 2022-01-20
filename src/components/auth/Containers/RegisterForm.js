import { connect } from 'react-redux'
import { onSubmitRegister as onSubmit} from '../../redux/auth'
import RegisterForm from '../RegisterForm'

export default connect(null, { onSubmit })(RegisterForm)
