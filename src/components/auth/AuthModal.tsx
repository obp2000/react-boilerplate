import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap'
import AuthForm from './AuthForm'
import { useAuthModal } from './hooks'
import { CommonConsts } from '../../../interfaces'

type Props = {
  commonConsts: CommonConsts
}

export default (props: Props): JSX.Element => {
  const formAttrs = useAuthModal(props)
  return <Modal isOpen={formAttrs.isOpen} >
    <ModalHeader {...formAttrs.headerAttrs} />
    <ModalBody>
      <AuthForm {...formAttrs} />
      <Button size='sm' outline {...formAttrs.toggleLoginButtonAttrs} />
    </ModalBody>
  </Modal>
}
