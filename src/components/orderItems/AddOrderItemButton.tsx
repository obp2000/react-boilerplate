import type { FormRenderProps } from 'react-final-form'
import { Button } from 'reactstrap'
import { initOrderItem } from './hooks'
import { CommonConsts } from '../../../interfaces'

type Props = FormRenderProps & {
  commonConsts: CommonConsts
}

const AddOrderItemButton = ({
  form,
  commonConsts
}: Props): JSX.Element => <Button
  size='sm'
  outline
  onClick={() => form?.mutators.push('order_items', initOrderItem)}
>
    {commonConsts?.add}
  </Button>

export default AddOrderItemButton
