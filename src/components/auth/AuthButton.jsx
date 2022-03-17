import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'reactstrap'
import { signOut, toggleModal, getOptions } from '../redux/auth'

const AuthButton = ({ label }) => {
    const auth = useSelector(({
        auth: {
            isAuthenticated,
            accessToken
        }
    }) => ({
        isAuthenticated,
        accessToken
    }))
    const dispatch = useDispatch()
    return  <Button size='sm'
                    outline
                    onClick={auth.isAuthenticated ?
                            signOut(dispatch, auth.accessToken) :
                            () => dispatch(toggleModal())} >
                {label}
            </Button>
}

export default AuthButton