import type { FormRenderProps } from 'react-final-form'
import { Button } from 'reactstrap'
import { disabled } from './hooks'
import { CommonConsts } from '../../../interfaces'

type Props = FormRenderProps & {
  commonConsts?: CommonConsts
  isLoadingOptions?: boolean
  isFetchingOptions?: boolean
  text?: string
  className?: string
  calculatedFields?: string[]
}

const SubmitButton = ({ commonConsts, text, className, ...rest }: Props) => {
  const label = text || commonConsts?.save
  return <Button
    type='submit'
    color='primary'
    outline
    size='sm'
    className={className}
    aria-labelledby={label}
    disabled={disabled(rest)}
  >
    {label}
  </Button>
}

export default SubmitButton
