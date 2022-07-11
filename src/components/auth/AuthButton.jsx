import PropTypes from 'prop-types'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'reactstrap'
import Loader from 'react-loader'
import {selectAuth} from './selectors'
import {toggleModal} from './modalSlice'
import UserLabel from './UserLabel'
import {useSignOutMutation} from '../auth/authApi'

const emptyObject = {}

const AuthButton = ({
    commonConsts: {
        auth_menu_item: {
            label
        } = emptyObject
    } = emptyObject
}) => {
    const {isAuthenticated} = useSelector(selectAuth)
    const dispatch = useDispatch()
    const [signOutAction, signOutStatus] = useSignOutMutation()
    const onClickAuthButton = isAuthenticated ?
        () => signOutAction() :
        () => dispatch(toggleModal())
    return <Loader loaded={!signOutStatus.isLoading} >
            <Button color='primary'
                className='btn-outline-light'
                onClick={onClickAuthButton}
                aria-label='auth' >
                {isAuthenticated ?
                    <UserLabel {...{label}} /> : label}
            </Button>
        </Loader>
}

AuthButton.propTypes = {
  label: PropTypes.string,
}

export default AuthButton
