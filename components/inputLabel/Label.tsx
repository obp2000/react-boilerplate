import Label from '@/client/Label'
import { DropdownFieldValue } from '@/interfaces/dropdownList'
import { InputFieldRenderProps } from '@/interfaces/formInput'
import { SelectFieldRenderProps } from '@/interfaces/selectField'
import { FieldRenderProps } from 'react-final-form'

export type AnyFieldRenderProps = Partial<InputFieldRenderProps |
  SelectFieldRenderProps | FieldRenderProps<DropdownFieldValue>>

export default function LabelComp({
  input,
  name,
  htmlFor = name || input?.name,
  label,
  required,
  color,
  // value = input?.value,
  disabled,
  className,
}: AnyFieldRenderProps) {
  return <Label {...{ htmlFor, color, disabled, className }} >
    {label}{required && <strong>*</strong>}
  </Label>
}
