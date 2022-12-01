import confirmAction from '@/confirmation/confirmAction'
import { MainContext } from '@/services/context'
import { useContext } from 'react'
import { useFieldArray } from 'react-final-form-arrays'
import { Button } from 'reactstrap'
import { initOrderItem } from './config'

export default function DeleteOrderItemButton({ index }: { index: number }) {
  const { commonConsts } = useContext(MainContext)
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
