import { connect } from 'react-redux'
import Template from '../AuthModal'
import { toggleModal, toggleLogin } from '../../redux/auth'

const mapStateToProps = ({
    auth: {
        // isAuthenticated,
        modal,
        login
    }
}) => ({
    // isAuthenticated,
    login,
    modal
})

export default connect(mapStateToProps, {
    toggleModal,
    toggleLogin,
    // signOut
})(Template)