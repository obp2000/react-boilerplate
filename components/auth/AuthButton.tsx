import { FC } from 'react'
import { Button } from 'reactstrap'
// import Loader from 'react-loader'
import { useAuthButton } from './hooks'

const AuthButton: FC = () => <Button
  color='primary'
  className='btn-outline-light'
  aria-label='auth'
  {...useAuthButton()}
/>

export default AuthButton
