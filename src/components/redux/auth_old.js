import axios from 'axios'
import {
  SubmissionError
} from 'redux-form'
import config from '../Config'
const BACKEND = config.BACKEND

// Actions
const REQUEST = 'react-devise/auth/REQUEST'
const RECEIVED = 'react-devise/auth/RECEIVED'
const FAILED = 'react-devise/auth/FAILED'
const SIGNOUT = 'react-devise/auth/SIGNOUT'

const REQUEST_REGISTER = 'REQUEST_REGISTER'
const RECEIVED_REGISTER = 'RECEIVED_REGISTER'
const FAILED_REGISTER = 'FAILED_REGISTER'

export const tokenHeaders = (accessToken) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${accessToken}`
    }
  }
}

// helper function
export const tokenConfig = getState => {
  const {
    auth: {
      accessToken
    }
  } = getState()
  return accessToken ? tokenHeaders(accessToken) : null
}

export function authenticate1(values) {
  return (dispatch, getState) => {
    dispatch(startAuthentication())
    return axios.post(`${BACKEND}/api/auth/login`, values)
      .then(({
        data: {
          user: {
            email,
            username,
            name
          },
          token: accessToken
        },
        headers: {
          uid,
          client,
          expiry
        }
      }) => {
        // console.log('data: ', data) 
        // const uid = response.headers['uid']
        // const client = response.headers['client']
        // const accessToken = response.headers['access-token']
        // const expiry = response.headers['expiry']
        // const email = response.data.data['email']
        // const username = response.data.data['username']
        // const nickname = response.data.data['nickname']
        dispatch(successAuthentication(uid, client, accessToken, expiry, email, name, username))
      }).catch(({
        response: {
          data: {
            non_field_errors: errors
          }
        }
      }) => {
        // const {
        //   response: {
        //     data: {
        //       errors
        //     }
        //   }
        // } = error
        // console.log('error: ', error)
        dispatch(failAuthentication(errors))
        throw new SubmissionError({
          _error: errors
        })
      })
  }
}

export function register1({
  name,
  // nickname,
  username,
  email,
  password,
  passwordConfirmation
}) {
  return (dispatch, getState) => {
    dispatch(startRegister())
    const fb = new FormData()
    fb.append('name', name)
    fb.append('email', email)
    fb.append('username', username)
    // fb.append('nickname', nickname)
    fb.append('password', password)
    fb.append('password_confirmation', passwordConfirmation)
    return fetch(`${BACKEND}/api/auth/register`, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: fb
      })
      .then(res => res.json())
      .then(json => {
        if (json.status == 'error') {
          const {
            errors: {
              full_messages
            }
          } = json
          dispatch(failRegister(full_messages))
          throw new SubmissionError({
            _error: full_messages
          })
        } else {
          dispatch(successRegister())
        }
      })
    // .catch(error => {
    //   console.log('register error: ', error)
    //   // alert('ddddddddd')
    //   // const {response: {data: {errors}}} = error
    //   dispatch(failRegister(error))
    //   throw new SubmissionError({_error: error})
    // })
  }
}

export function signout1() {
  return (dispatch, getState) => {
    const {
      auth: {
        accessToken
        // client,
        // uid
      }
    } = getState()
    return axios.post(
      `${BACKEND}/api/auth/logout`,
      // method: 'DELETE',
      // method: 'POST',
      null, {
        headers: {
          // 'access-token': accessToken,
          'Authorization': `Token ${accessToken}`,
          // 'client': client,
          // 'uid': uid
        }
      }
    ).then(response => {
      dispatch(doSignout())
    }).catch(error => {
      console.log(error)
    })
  }
}

export function expireAuthentication() {
  return doSignout()
}

export function startAuthentication() {
  return {
    type: REQUEST
  }
}

// function successAuthentication(uid, client, accessToken, expiry, email, name, username) {
export function successAuthentication(accessToken, email, username) {
  return {
    type: RECEIVED,
    // uid,
    // client,
    accessToken,
    // expiry,
    email,
    // name,
    // nickname
    username
  }
}

export function failAuthentication(errors) {
  return {
    type: FAILED,
    errors
  }
}

export function doSignout() {
  return {
    type: SIGNOUT
  }
}

export function startRegister() {
  return {
    type: REQUEST_REGISTER
  }
}

export function successRegister() {
  return {
    type: RECEIVED_REGISTER
  }
}

export function failRegister(errors) {
  return {
    type: FAILED_REGISTER,
    errors
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST:
      return Object.assign({},
        state, {
          loading: true
        }
      )
    case RECEIVED:
      return Object.assign({},
        state, {
          loading: false,
          isAuthenticated: true,
          uid: action.uid,
          client: action.client,
          accessToken: action.accessToken,
          expiry: action.expiry,
          email: action.email,
          name: action.name,
          username: action.username,
          // nickname: action.nickname,
          errors: null
        }
      )
    case FAILED:
      // localStorage.removeItem('AUTH')
      return Object.assign({},
        state, {
          loading: false,
          errors: action.errors
        }
      )
    case SIGNOUT:
      localStorage.removeItem('AUTH')
      return Object.assign({},
        initialState
      )
    case REQUEST_REGISTER:
      return Object.assign({},
        state, {
          loading: true
        }
      )
    case RECEIVED_REGISTER:
      return Object.assign({},
        state, {
          loading: false,
          errors: null
          // isAuthenticated: true,
          // uid: action.uid,
          // client: action.client,
          // accessToken: action.accessToken,
          // expiry: action.expiry,
          // email: action.email, 
          // name: action.name,
          // nickname: action.nickname
        }
      )
    case FAILED_REGISTER:
      return Object.assign({},
        state, {
          loading: false,
          errors: action.errors
        }
      )
    default:
      return state
  }
}

const initialState = {
  loading: false,
  isAuthenticated: false,
  client: null,
  accessToken: null,
  uid: null,
  expiry: null,
  errors: null
}