import { FC, useContext } from 'react'
import { useFieldArray } from 'react-final-form-arrays'
import { Button } from 'reactstrap'
import { MainContext } from '@/services/context'
import { initOrderItem } from './config'

const AddOrderItemButton: FC = () => {
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

export default AddOrderItemButton
