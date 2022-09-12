import type { FieldRenderProps, FieldMetaState } from 'react-final-form'
import type { InputType } from 'reactstrap/types/lib/Input'
import {
  FieldProps,
  CustomerOptions,
  ProductOptions,
  OrderOptions,
  ProductTypeChoice,
  ThreadsChoice,
  ContentsChoice,
  PacketChoice,
  DeliveryTypeChoice,
} from '../../../interfaces'
import {
  LoginOptions,
  RegisterOptions,
} from '../../../interfaces/auth'
import type {SelectFieldAttrs} from '../selectField/hooks'

export type AllOptions = CustomerOptions | ProductOptions | OrderOptions |
  LoginOptions | RegisterOptions

export type FieldAttrs = FieldRenderProps<string | number | undefined> & {
  options: AllOptions
  searchPath?: string
}

export type AnyFieldAttrs = FieldAttrs & SelectFieldAttrs

export type AllChoices = ProductTypeChoice & ThreadsChoice & ContentsChoice &
  PacketChoice & DeliveryTypeChoice

type FieldPropsWithChoices = FieldProps & {
  choices: AllChoices[]
}

export type HtmlAttrs = {
  name: string
  id?: string
  type?: InputType
  label?: string
  placeholder?: string
  required?: boolean
  readOnly?: boolean
  'aria-label'?: string
  min?: number
  max?: number
  accept?: string
  onChange?: ({target: {files}}: {target: {files?: any[]}}) => void
  // onChange?: ChangeEventHandler
  choices?: AllChoices[]
  helpText?: string
  invalid?: boolean
  valid?: boolean
}

const invalid = ({ visited, error }: FieldMetaState<string | number | undefined>) =>
  (visited && !!error ? true : false)

const valid = ({ visited, error }: FieldMetaState<string | number | undefined>) =>
  (visited && !error ? true : false)

export const getName = (props: FieldAttrs) => props.name ?? props.input?.name

export const getFieldOptions = (options: AllOptions | undefined, name: string) => {
  if (options && name) {
    const nameMod = name.split('.').pop() as keyof AllOptions
    return options[nameMod] as FieldPropsWithChoices
  }
}

export const useFieldProps = (fieldAttrs: FieldAttrs) => {
  const name = getName(fieldAttrs)
  return getFieldOptions(fieldAttrs.options, name)
}

export const useFieldAttrs = (fieldAttrs: FieldAttrs) => {
  const props = useFieldProps(fieldAttrs)
  const name = getName(fieldAttrs)
  const type: InputType = fieldAttrs.input?.type as InputType
  const label = fieldAttrs.label ?? props?.label
  const helpText = fieldAttrs.helpText ?? props?.help_text
  let attrs: HtmlAttrs = {
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
  // if (props?.choices) {
  //   attrs.choices = props.choices
  // }
  if (helpText) {
    attrs.helpText = helpText
  }
  if ([undefined, 'text', 'number', 'password', 'email',].includes(type) &&
      fieldAttrs.meta) {
    attrs.invalid = invalid(fieldAttrs.meta)
    attrs.valid = valid(fieldAttrs.meta)
  }
  if (type === 'file') {
    const onChange = ({
      target: {
        files = [],
      },
    }: {target: {files?: any[]}}) => fieldAttrs.input.onChange(files[0])
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


