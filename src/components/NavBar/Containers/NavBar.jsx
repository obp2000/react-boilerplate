import {
	connect
} from 'react-redux'
import {
	toggleModal,
	toggleLogin
} from '../../redux/NavBar'
import NavBar from '../NavBar'
import {
	signOut
} from '../../redux/auth'

const mapStateToProps = ({
	auth: {
		isAuthenticated,
		accessToken
	},
	navBar: {
		modal,
		login
	}
}) => ({
	isAuthenticated,
	accessToken,
	login,
	modal
})

export default connect(mapStateToProps, {
	toggleModal,
	toggleLogin,
	signOut
})(NavBar)