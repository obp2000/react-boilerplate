import { FC, useContext } from 'react'
import { useFieldArray } from 'react-final-form-arrays'
import { Button } from 'reactstrap'
import confirmAction from '../confirmation/confirmAction'
import { OptionsContext } from '../layout/Layout'
import { initOrderItem } from './config'

const DeleteOrderItemButton: FC<{ index: number }> = ({ index }) => {
  const { commonConsts } = useContext(OptionsContext)
  const { fields } = useFieldArray('order_items')
  const onConfirm = (): void => {
    fields.update(index, initOrderItem)
    fields.remove(index)
  }
  return <Button
    size='sm'
    outline
    onClick={confirmAction(
      onConfirm,
      commonConsts?.delete,
      commonConsts?.yes,
      commonConsts?.no)}
  >
    {commonConsts?.delete}
  </Button>
}

export default DeleteOrderItemButton
