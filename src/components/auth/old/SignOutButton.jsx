import PropTypes from 'prop-types'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'reactstrap'
import {Navigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {selectAuth, reset} from '../redux/auth'
import {
  useSignOutMutation,
} from '../../services/apiSlice'


const SignOutButton = ({auth_menu_item, isOptionsFetching}) => {
  const {user} = useSelector(selectAuth)
  const authButtonLabel = `${auth_menu_item?.label} (${user?.username || ''})`
  const [
    signOutAction,
    {
      isLoading: isLoadingSignOut,
      isFetching: isFetchingSignOut,
      data: {
        detail: successSignOutMessage,
      } = {},
      isSuccess: isSuccessSignOut,
      isError: isErrorSignOut,
      error: signOutError,
    },
  ] = useSignOutMutation()
  if (isSuccessSignOut) {
    toast.success(successSignOutMessage)
    console.log('toast signOut')
    // isSuccessSignOut = null
    // push('/')
  }
  return <>
    {/* {isSuccessSignOut && <Navigate to='/' />}*/}
    <Button color='primary'
      className='btn-outline-light'
      onClick={() => signOutAction()}
      aria-label='auth' >
      {authButtonLabel}
    </Button>
  </>
}

export default SignOutButton
