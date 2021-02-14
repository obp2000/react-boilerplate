import {
	createAction,
	createReducer
} from 'redux-act'

export const toggleLogin = createAction()

const initialState = {
	login: true
}

const reduceToggleLogin = (state) => ({
	...state,
	login: !state.login
})

const authDialog = createReducer({
		[toggleLogin]: reduceToggleLogin,
	},
	initialState
)

export default authDialog