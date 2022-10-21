import { FC, useContext } from 'react'
import { useForm, useFormState } from 'react-final-form'
import { Button } from 'reactstrap'
import { OptionsContext } from '../layout/Layout'

const PostCostButton: FC = () => {
  const { commonConsts } = useContext(OptionsContext)
  const { mutators } = useForm()
  const { values } = useFormState()
  return <Button
    name='post_cost_button'
    color='primary'
    outline
    size='sm'
    onClick={() => mutators.postCostCount()}
    disabled={!values?.customer?.city?.pindex || !values?.total_weight}
  >
    {commonConsts?.count}
  </Button>
}

export default PostCostButton
