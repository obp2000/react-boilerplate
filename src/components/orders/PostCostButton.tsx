import React from 'react'
import { Button } from 'reactstrap'
import type { FormRenderProps } from 'react-final-form'
import { CommonConstsType } from '../../../interfaces'

const PostCostButton = ({
  form,
  values,
  commonConsts
}: FormRenderProps & CommonConstsType): JSX.Element => <Button
  name='post_cost_button'
  color='primary'
  outline
  size='sm'
  onClick={() => form?.mutators.postCostCount()}
  disabled={!values?.customer?.city?.pindex || !values?.total_weight}
>
    {commonConsts?.count}
  </Button>

export default PostCostButton
