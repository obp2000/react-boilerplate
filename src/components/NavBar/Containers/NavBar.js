import { connect } from 'react-redux'
import { toggleModal, toggleLogin } from '../../redux/NavBar'
import NavBar from '../NavBar'
import { signOut } from '../../redux/auth'

const mapStateToProps = ({
    auth: {
        isAuthenticated,
        errors
    },
    navBar: {
        modal,
        login
    }
}) => ({
    isAuthenticated,
    login,
    modal,
    errors
})

export default connect(mapStateToProps, {
    toggleModal,
    toggleLogin,
    signOut
})(NavBar)