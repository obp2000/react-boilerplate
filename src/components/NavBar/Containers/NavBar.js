import { connect } from 'react-redux'
import NavBar from '../NavBar'
import { signOut, toggleModal, toggleLogin } from '../../redux/auth'

const mapStateToProps = ({
    auth: {
        isAuthenticated,
    }
}) => ({
    isAuthenticated,
})

export default connect(mapStateToProps, {
    signOut,
    toggleModal,
})(NavBar)