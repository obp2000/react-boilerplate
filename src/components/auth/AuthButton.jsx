import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'reactstrap'
import { signOut, toggleModal } from '../redux/auth'

const AuthButton = () => {
    const loaded = useSelector(({
        auth: {
            isAuthenticated
        }
    }) => ({
        isAuthenticated,
    }))
    const dispatch = useDispatch()
    return  <Button size='sm' outline
                onClick={loaded.isAuthenticated ?
                	signOut(dispatch) :
                    () => dispatch(toggleModal())}>
                    {loaded.isAuthenticated ? 'Выйти' : 'Вход/Регистрация'}
            </Button>
}

export default AuthButton