import React, { useContext } from 'react'
import { Button } from 'reactstrap'
import { useDisabled } from './hooks'
import { OptionsContext } from '../layout/Layout'
import type { SubmitButtonProps } from '../../../interfaces/objectForm'

const SubmitButton = ({
  text,
  className,
  ...rest
}: SubmitButtonProps) => {
  const { commonConsts } = useContext(OptionsContext)
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
