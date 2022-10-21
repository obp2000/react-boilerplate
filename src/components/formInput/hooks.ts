import type { FormEventHandler } from 'react'
import type {
  FieldInputProps, FieldMetaState, FieldRenderProps
} from 'react-final-form'
import type {
  FieldAttrs,
  FilesHandlerEvent
} from '../../../interfaces/input'
import { useMapFieldProps } from '../options/hooks'

const invalid = ({ touched, error }: FieldMetaState<any>): boolean =>
  Boolean(touched && !!error)

const valid = ({
  dirty,
  active,
  touched,
  error,
}: FieldMetaState<any>): boolean =>
  Boolean(touched && !active && dirty && !error)

const isValidatedField = (type: string | undefined): boolean =>
  [undefined, 'text', 'number', 'password', 'email',].includes(type)

const validationProps = (meta: FieldMetaState<any>) => ({
  invalid: invalid(meta),
  valid: valid(meta),
})

const filesHandler = (input: FieldInputProps<any>) =>
  ({ target }: FilesHandlerEvent) => {
    if (target?.files) {
      return input?.onChange(target.files[0])
    }
  }

const fileTypeProps = (input: FieldInputProps<any>) => ({
  value: undefined,
  onChange: filesHandler(input) as FormEventHandler,
  accept: '.jpg, .png, .jpeg',
})

export const useFieldProps = ({
  input,
  meta,
  ...props
}: FieldAttrs): Partial<FieldRenderProps<any>> => {
  let {
    type: typeFromFieldProps,
    helpText,
    ...result
  } = useMapFieldProps({ input, ...props })
  const type = input?.type ?? typeFromFieldProps
  result = { type: typeFromFieldProps, ...result, ...input }
  if (type === 'file') {
    result = { ...result, ...fileTypeProps(input) }
  }
  if (meta && isValidatedField(type)) {
    result = { ...result, ...validationProps(meta) }
  }
  return {
    ...result,
    ...props,
  }
}
