import type { FormProps } from 'react-final-form'
import { Button } from 'reactstrap'
import {initOrderItem} from './hooks'
import confirmAction from '../confirmation/ConfirmAction'
import { CommonConsts } from '../../../interfaces'

type Props = FormProps & {
  commonConsts: CommonConsts
  index: number
}

const DeleteOrderItemButton = ({
  commonConsts,
  index,
  fields
}: Props): JSX.Element => {
  const onConfirm = (): void => {
      fields.update(index, initOrderItem)
      fields.remove(index)
  }
  return <Button
    size='sm'
    outline
    onClick={confirmAction(
        onConfirm, commonConsts?.delete, commonConsts?.yes, commonConsts?.no)}
  >
    {commonConsts?.delete}
  </Button>
}

export default DeleteOrderItemButton
