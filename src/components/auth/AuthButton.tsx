import {Button} from 'reactstrap'
import Loader from 'react-loader'
import {useAuthButton} from './hooks'
import {CommonConsts} from '../../../interfaces'

type Props = {
  commonConsts: CommonConsts
}

export default (props: Props): JSX.Element => {
  const {loaded, ...buttonAttrs} = useAuthButton(props)
  // if (!loaded) {return <Loader loaded={false}/>}
  return <Button
      color='primary'
      className='btn-outline-light'
      aria-label='auth'
      {...buttonAttrs}
    />
}
