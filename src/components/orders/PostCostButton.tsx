import React from 'react'
import { Button } from 'reactstrap'
import type { FormRenderProps } from 'react-final-form'
import { CommonConsts } from '../../../interfaces'

type Props = FormRenderProps & {
  commonConsts: CommonConsts
}

const PostCostButton = ({
  form,
  values,
  commonConsts
}: Props): JSX.Element => <Button
  name='post_cost_button'
  color='primary'
  outline
  size='sm'
  onClick={() => form?.mutators.postCostCount()}
  disabled={!values?.customer?.city?.pindex || !values?.totalWeight}
>
    {commonConsts?.count}
  </Button>

export default PostCostButton
