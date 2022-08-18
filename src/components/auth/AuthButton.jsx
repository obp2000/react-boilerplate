import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'reactstrap'
import {useAuthButton} from './hooks'

const AuthButton = (props) => {
  const {loaded, ...buttonAttrs} = useAuthButton(props)
  return <Button
    color='primary'
    className='btn-outline-light'
    aria-label='auth'
    {...buttonAttrs}
  />
}

AuthButton.propTypes = {
  props: PropTypes.string,
}

export default AuthButton
