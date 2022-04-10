import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'reactstrap'
import { selectOnClickAuthButton, selectAuthButtonLabel } from '../redux/auth'

const AuthButton = () => {
    // const dispatch = useDispatch()
    // const loaded = useSelector(({
    //     auth: {
    //         isAuthenticated,
    //         accessToken,
    //     } = {},
    // }) => ({
    //     accessToken,
    //     // username_label: isAuthenticated ? `${label} (${username || ''})` : label,
    //     onClick: isAuthenticated ?
    //                         signOut(dispatch, accessToken) :
    //                         () => dispatch(toggleModal())
    // }))
    return  <Button color='primary'
                    className='btn-outline-light'
                    onClick={useSelector(selectOnClickAuthButton(useDispatch()))}
                    aria-label='auth' >
                {useSelector(selectAuthButtonLabel)}
            </Button>
}

export default AuthButton
