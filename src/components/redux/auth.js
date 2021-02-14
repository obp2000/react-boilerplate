import {
	createAction,
	createReducer
} from 'redux-act'
import axios from 'axios'
import {
	SubmissionError
} from 'redux-form'
import {
    push
} from 'connected-react-router'
import config from '../Config'
import {
    closeModal
} from './NavBar'

const startAuthentication = createAction()
const successAuthentication = createAction()
const failAuthentication = createAction()
const doSignout = createAction()
const startRegister = createAction()
const successRegister = createAction()
const failRegister = createAction()

export const tokenHeaders = (accessToken) => {
	return {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${accessToken}`
		}
	}
}

const initialState = {
	loading: false,
	isAuthenticated: false,
	// client: null,
	accessToken: null,
	// uid: null,
	// expiry: null,
	email: '',
	// name: action.name,
	username: '',
	errors: null
}

const reduceStartAuthentication = (state) => ({
	...state,
	loading: true
})

const reduceSuccessAuthentication = (state, login_info) => ({
	...state,
	loading: false,
	isAuthenticated: true,
	errors: null,
	...login_info
	// uid: action.uid,
	// client: action.client,
	// accessToken,
	// expiry: action.expiry,
	// email,
	// name: action.name,
	// username,
	// nickname: action.nickname,
})

const reduceFailAuthentication = (state, errors) => ({
	...state,
	loading: false,
	errors: errors
})

const reduceDoSignout = (state) => ({
	...state,
	...initialState
})

const reduceStartRegister = (state) => ({
	...state,
	loading: true
})

const reduceSuccessRegister = (state) => ({
	...state,
	loading: false,
	errors: null
})

const reduceFailRegister = (state, errors) => ({
	...state,
	loading: false,
	errors
})

const auth = createReducer({
		[startAuthentication]: reduceStartAuthentication,
		[successAuthentication]: reduceSuccessAuthentication,
		[failAuthentication]: reduceFailAuthentication,
		[doSignout]: reduceDoSignout,
		[startRegister]: reduceStartRegister,
		[successRegister]: reduceSuccessRegister,
		[failRegister]: reduceFailRegister
	},
	initialState
)

export default auth

// Server requests:

const base_url = `${config.BACKEND}/auth`

const error_handler = e => console.log(`Error: ${e}`)

const extract_data = ({
	data
}) => data

const failedLogin = ({
	response: {
		data: {
			non_field_errors
		}
	}
}) => {
	throw new SubmissionError({
		_error: non_field_errors
	})
}

const failedRegister = ({
	response: {
		data: {
			email,
			username
		}
	}
}) => {
	throw new SubmissionError({
		email,
		username
	})
}

const login = (values) => axios.post(`${base_url}/login`, values)
	.catch(failedLogin)
	.then(extract_data)

const register = (values) => axios.post(`${base_url}/register`, values)
	.catch(failedRegister)

const logout = (accessToken) => axios.post(`${base_url}/logout`, null,
		tokenHeaders(accessToken))
	.catch(error_handler)

// Async actions:

export const onSubmitLogin = (values, dispatch, props) => {
	dispatch(startAuthentication())
	return login(values)
}

export const onSubmitSuccessLogin = ({
	token: accessToken,
	user: {
		email,
		username
	} = {}
}, dispatch, props) => {
	dispatch(successAuthentication({
		accessToken,
		email,
		username
	}))
	dispatch(closeModal())
	dispatch(push('/profile'))
}

export const onSubmitFailLogin = (errors, dispatch, submitError, props) => {
	dispatch(failAuthentication(errors))
}

export const onSubmitRegister = (values, dispatch, props) => {
	// return dispatch(register(values))
	dispatch(startRegister())
	return register(values)
}

export const onSubmitSuccessRegister = (result, dispatch, props) => {
	dispatch(successRegister())
	dispatch(closeModal())
	alert('Успешно зарегистрировались!')
	// dispatch(push('/profile'))
}

export const onSubmitFailRegister = (errors, dispatch, submitError, props) => {
	dispatch(failRegister(errors))
}

export const signOut = accessToken => dispatch =>
	logout(accessToken).then(() => dispatch(doSignout()))