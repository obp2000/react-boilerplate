import { FC, useContext } from 'react'
import type { FormRenderProps } from 'react-final-form'
import { Button } from 'reactstrap'
import type { SubmitButtonProps } from '@/interfaces/objectForm'
import { MainContext } from '@/services/context'
import { useDisabled } from './hooks'

const SubmitButton: FC<FormRenderProps & SubmitButtonProps> = ({
  text,
  className,
  ...rest
}) => {
  const { commonConsts } = useContext(MainContext)
  const label = text || commonConsts?.save
  return <Button
    type='submit'
    color='primary'
    outline
    size='sm'
    className={className}
    aria-labelledby={label}
    disabled={useDisabled(rest)}
  >
    {label}
  </Button>
}

export default SubmitButton
