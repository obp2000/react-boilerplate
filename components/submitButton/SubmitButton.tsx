import type { SubmitButtonProps } from '@/interfaces/objectForm'
import { MainContext } from '@/services/context'
import { useContext } from 'react'
import type { FormRenderProps } from 'react-final-form'
import { Button } from 'reactstrap'
import { useDisabled } from './hooks'

export default function SubmitButton({
  className,
  children,
  ...rest
}: FormRenderProps & SubmitButtonProps) {
  const { commonConsts } = useContext(MainContext)
  const label = children ? String(children) : commonConsts?.save
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
