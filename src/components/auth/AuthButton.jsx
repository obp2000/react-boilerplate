import PropTypes from 'prop-types'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'reactstrap'
import {selectAuth} from './selectors'
import {toggleModal} from './modalSlice'

const authButtonLabel = (isAuthenticated, {
    username = ''
} = {}, {
    auth_menu_item: {
        label = ''
    } = {}
} = {}) => {
    let authButtonLabelArray = [label]
    if (isAuthenticated && username) {
        authButtonLabelArray.push(`(${username})`)
    }
    return authButtonLabelArray.join(' ')
}

const AuthButton = ({signOutAction, commonConsts, user}) => {
  const {isAuthenticated} = useSelector(selectAuth)
  // let user = {}
  // let userStatus = {}
  // if (isAuthenticated) {
  //   ;({data: user, ...userStatus} = useGetUserQuery())
  // }
  const dispatch = useDispatch()
  const onClickAuthButton = isAuthenticated ?
    () => signOutAction() :
    () => dispatch(toggleModal())
  return <Button color='primary'
            className='btn-outline-light'
            onClick={onClickAuthButton}
            aria-label='auth' >
            {authButtonLabel(isAuthenticated, user, commonConsts)}
        </Button>
}

export default AuthButton
