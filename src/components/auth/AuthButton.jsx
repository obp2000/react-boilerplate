import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'reactstrap'
import { signOut, toggleModal, getOptions } from '../redux/auth'

const AuthButton = ({ label }) => {
    const auth = useSelector(({
        auth: {
            isAuthenticated,
            accessToken,
            object: {
                username = ''
            } = {}
        },
        common_consts: {
            successfully = '',
        }
    }) => ({
        isAuthenticated,
        accessToken,
        username,
        successfully
    }))
    const dispatch = useDispatch()
    const username_label = auth.isAuthenticated ? ` (${auth.username || ''})` : ''
    return  <Button
                    color='primary'
                    className='btn-outline-light'
                    onClick={auth.isAuthenticated ?
                            signOut(dispatch, auth.accessToken, auth.successfully) :
                            () => dispatch(toggleModal())} >
                {`${label}${username_label}`}
            </Button>
}

export default AuthButton