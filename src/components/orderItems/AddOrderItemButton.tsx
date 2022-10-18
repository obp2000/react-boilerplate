import { useContext } from 'react'
import { useFieldArray } from 'react-final-form-arrays'
import { Button } from 'reactstrap'
import { OptionsContext } from '../layout/Layout'
import { initOrderItem } from './config'

const AddOrderItemButton = () => {
  const { commonConsts } = useContext(OptionsContext)
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
