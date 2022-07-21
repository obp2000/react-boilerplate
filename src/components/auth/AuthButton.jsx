import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
// import Loader from 'react-loader'
import {useAuthButton} from './hooks'

const AuthButton = ({label}) => {
    const buttonAttrs = useAuthButton(label)
    return <Button
                color='primary'
                className='btn-outline-light'
                aria-label='auth'
                {...buttonAttrs}
            />
}

AuthButton.propTypes = {
  label: PropTypes.string,
}

export default AuthButton
