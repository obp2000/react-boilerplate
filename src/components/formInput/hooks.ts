import type { InputType } from 'reactstrap/types/lib/Input'
import type { FieldMetaState } from 'react-final-form'
import { useFieldProps, getName } from '../Shared/fieldProps'
import type { FieldAttrs, HtmlAttrs } from '../Shared/fieldProps'

export const invalid =
  ({ error }: FieldMetaState<string | number | undefined>) =>
    (!!error ? true : false)

export const valid =
  ({ dirty, active, error }: FieldMetaState<string | number | undefined>) =>
    (dirty && !active && !error ? true : false)

export type FilesHandler =
  ({ target: { files } }: { target: { files: FileList | null } }) => void

type InputHtmlAttrs = HtmlAttrs & {
  onChange?: FilesHandler
}

export const useFieldAttrs = (fieldAttrs: FieldAttrs) => {
  const props = useFieldProps(fieldAttrs)
  const name = getName(fieldAttrs)
  const type: InputType = fieldAttrs.input?.type as InputType
  const label = fieldAttrs.label ?? props?.label
  const helpText = fieldAttrs.helpText ?? props?.help_text
  let attrs: InputHtmlAttrs = {
    name,
    id: name,
    type,
    required: fieldAttrs.required ?? props?.required,
    readOnly: fieldAttrs.readOnly ?? props?.read_only,
    label,
    placeholder: label,
    'aria-label': label,
  }
  if (type === 'number') {
    attrs.min = fieldAttrs.min ?? props?.min_value
    attrs.max = fieldAttrs.max ?? props?.max_value
  }
  if (helpText) {
    attrs.helpText = helpText
  }
  if ([undefined, 'text', 'number', 'password', 'email',].includes(type) &&
    fieldAttrs.meta) {
    attrs.invalid = invalid(fieldAttrs.meta)
    attrs.valid = valid(fieldAttrs.meta)
  }
  if (type === 'file') {
    const onChange: FilesHandler = ({ target }) => {
      if (target.files) {
        return fieldAttrs.input.onChange(target.files[0])
      }
    }
    attrs.accept = '.jpg, .png, .jpeg'
    attrs.onChange = onChange
  }
  return attrs
}


export const useInput = (props: FieldAttrs) => {
  const { input, meta, options, searchPath, ...rest } = props
  if (input.type === 'file') {
    delete input.value
  }
  return {
    ...input,
    ...useFieldAttrs(props),
    ...rest,
  }
}
