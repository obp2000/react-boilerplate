import { useContext } from 'react'
import { useForm, useFormState } from 'react-final-form'
import Button from '@/client/Button'
import { MainContext } from '@/options/context'

export default function PostCostButton() {
  const { commonConsts } = useContext(MainContext)
  const { mutators } = useForm()
  const { values } = useFormState()
  return <Button
    name='post_cost_button'
    variant='outline-primary'
    size='sm'
    onClick={() => mutators.postCostCount()}
    disabled={!values?.customer?.city?.pindex || !values?.total_weight}
  >
    {commonConsts?.count}
  </Button>
}
