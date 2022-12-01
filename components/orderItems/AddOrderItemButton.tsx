import { MainContext } from '@/services/context'
import { useContext } from 'react'
import { useFieldArray } from 'react-final-form-arrays'
import { Button } from 'reactstrap'
import { initOrderItem } from './config'

export default function AddOrderItemButton() {
  const { commonConsts } = useContext(MainContext)
  const { fields } = useFieldArray('order_items')
  return <Button
    size='sm'
    outline
    onClick={() => fields.push(initOrderItem)}
  >
    {commonConsts?.add}
  </Button>
}
