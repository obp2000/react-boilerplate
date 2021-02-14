import {
	connect
} from 'react-redux'
import Profile from '../Profile'

const mapStateToProps = ({
	auth
}) => auth

export default connect(mapStateToProps)(Profile)