import React from 'react'
import { Button } from 'reactstrap'
// import Loader from 'react-loader'
import { useAuthButton } from './hooks'
import type { CommonConstsType } from '../../../interfaces'

const AuthButton = (props: CommonConstsType): JSX.Element => {
  const { loaded, ...buttonAttrs } = useAuthButton(props)
  // if (!loaded) {return <Loader loaded={false}/>}
  return <Button
    color='primary'
    className='btn-outline-light'
    aria-label='auth'
    {...buttonAttrs}
  />
}

export default AuthButton
