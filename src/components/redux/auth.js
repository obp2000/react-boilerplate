import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
// import { SubmissionError } from 'redux-form'
import { FORM_ERROR } from 'final-form'
import { push } from 'connected-react-router'
import config from '../Config'
import { closeModal } from './NavBar'

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
    isFetching: false,
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
    isFetching: true
})

const reduceSuccessAuthentication = (state, accessToken) => ({
    ...state,
    isFetching: false,
    isAuthenticated: true,
    errors: null,
    accessToken,
    // ...login_info
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
    isFetching: false,
    errors: errors
})

const reduceDoSignout = (state) => ({
    ...state,
    ...initialState
})

const reduceStartRegister = (state) => ({
    ...state,
    isFetching: true
})

const reduceSuccessRegister = (state) => ({
    ...state,
    isFetching: false,
    errors: null
})

const reduceFailRegister = (state, errors) => ({
    ...state,
    isFetching: false,
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

const base_url = `${config.BACKEND}/api`

const error_handler = e => console.log(`Error: ${e}`)

// const extract_data = ({ data }) => data

export const onSuccessLogin = dispatch => ({
    data: {
        key
    }
}) => {
    dispatch(successAuthentication(key))
    dispatch(closeModal())
    return dispatch(push('/user/'))
}

export const onFailedLogin = dispatch => ({
    response: {
        data: {
            non_field_errors
        }
    }
}) => {
    dispatch(failAuthentication(non_field_errors))
    return {
        [FORM_ERROR]: non_field_errors
    }
}

export const onSubmitLogin = values => dispatch => {
    dispatch(startAuthentication())
    return axios.post(`${base_url}/login/`, values)
        .then(onSuccessLogin(dispatch))
        .catch(onFailedLogin(dispatch))
}

export const onSuccessRegister = dispatch => () => {
    dispatch(successRegister())
    dispatch(closeModal())
    alert('Успешно зарегистрировались!')
}

export const onFailedRegister = dispatch => ({
    response: {
        data
    }
}) => {
    dispatch(failRegister(data))
    const reg_errors = Object.values(data).map(
        field_errors => field_errors.join(' '))
    return {
        [FORM_ERROR]: reg_errors
    }
}

export const onSubmitRegister = values => dispatch => {
    dispatch(startRegister())
    return axios.post(`${base_url}/register/`, values)
        .then(onSuccessRegister(dispatch))
        .catch(onFailedRegister(dispatch))
}

export const signOut = accessToken => dispatch =>
    axios.post(`${base_url}/logout/`, null)
    .then(() => dispatch(doSignout()))
    .catch(error_handler)

// const logout = (accessToken) => axios.post(`${base_url}/logout/`, null,
//         tokenHeaders(accessToken))
//     .catch(error_handler)

// const login = (values) => axios.post(`${base_url}/login/`, values)
//     .catch(failedLogin)
// // .then(extract_data)

// const register = (values) => axios.post(`${base_url}/register/`, values)
//     .catch(failedRegister)

// Async actions:

// export const onSubmitLogin11 = (values, dispatch, props) => {
//     dispatch(startAuthentication())
//     return login(values)
// }

// export const onSubmitSuccessLogin = ({ key }, dispatch, props) => {
//     dispatch(successAuthentication(key))
//     dispatch(closeModal())
//     dispatch(push('/user/'))
// }

// const successLogin = ({
//     data: {
//         key
//     }
// }) => {
//     dispatch(successAuthentication(key))
//     dispatch(closeModal())
//     return dispatch(push('/user/'))
// }





// export const onSubmitFailLogin = (errors, dispatch, submitError, props) => {
//     dispatch(failAuthentication(errors))
// }

// export const onSubmitRegister1 = (values, dispatch, props) => {
//     // return dispatch(register(values))
//     dispatch(startRegister())
//     return register(values)
// }



//     dispatch(failRegister(data))
//     const reg_errors = Object.values(data).map(
//         field_errors => field_errors.map(
//             field_error => field_error.join(' ')))
//     return {
//         [FORM_ERROR]: reg_errors]
// }



// export const onSubmitSuccessRegister = (result, dispatch, props) => {
//     dispatch(successRegister())
//     dispatch(closeModal())
//     alert('Успешно зарегистрировались!')
//     // dispatch(push('/profile'))
// }

// export const onSubmitFailRegister = (errors, dispatch, submitError, props) => {
//     dispatch(failRegister(errors))
// }