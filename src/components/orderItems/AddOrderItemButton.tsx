import React from 'react'
import { Button } from 'reactstrap'
import { initOrderItem } from './hooks'
import type { OrderItemFormRender } from '../../../interfaces'

const AddOrderItemButton = ({
  // form,
  fields,
  commonConsts
}: OrderItemFormRender): JSX.Element => <Button
  size='sm'
  outline
  onClick={() => fields.push(initOrderItem)}
>
    {commonConsts?.add}
  </Button>

export default AddOrderItemButton
