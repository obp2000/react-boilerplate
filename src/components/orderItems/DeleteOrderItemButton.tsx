import React from 'react'
import { Button } from 'reactstrap'
import { initOrderItem } from './hooks'
import confirmAction from '../confirmation/confirmAction'
import { OrderItemFormRender } from '../../../interfaces'

type Props = OrderItemFormRender & {
  index: number
}

const DeleteOrderItemButton = ({
  commonConsts,
  index,
  fields,
}: Props): JSX.Element => {
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
