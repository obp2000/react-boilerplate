import type { SubmitButtonProps } from '@/interfaces/objectForm'
import { MainContext } from '@/options/context'
import { useContext } from 'react'
import type { FormRenderProps } from 'react-final-form'
import Button from '@/client/Button'
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
    variant='outline-primary'
    size='sm'
    className={className}
    aria-labelledby={label}
    disabled={useDisabled(rest)}
  >
    {label}
  </Button>
}
