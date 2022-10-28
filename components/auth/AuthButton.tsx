import { FC } from 'react'
import { Button } from 'reactstrap'
// import Loader from 'react-loader'
import { useAuthButton } from './hooks'

const AuthButton: FC = () => {
  const { loaded, ...buttonAttrs } = useAuthButton()
  // if (!loaded) {return <Loader loaded={false}/>}
  return <Button
    color='primary'
    className='btn-outline-light'
    aria-label='auth'
    {...buttonAttrs}
  />
}

export default AuthButton
