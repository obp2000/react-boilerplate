import type { DropdownListAttrs } from '@/interfaces/dropdownList'
import type { FieldAttrs } from '@/interfaces/input'
import type { LabelSizes } from '@/interfaces/inputLabel'
import type { SelectFieldAttrs } from '@/interfaces/selectField'
import { Label } from 'reactstrap'
import { useFieldProps } from './hooks'

export default function LabelComp(props: { name: string }): JSX.Element
export default function LabelComp(props: FieldAttrs & LabelSizes): JSX.Element
export default function LabelComp(props: SelectFieldAttrs & LabelSizes):
  JSX.Element
export default function LabelComp(props: DropdownListAttrs & LabelSizes):
  JSX.Element
export default function LabelComp(props: any): JSX.Element {
  const { label, required, ...rest } = useFieldProps(props)
  return <Label {...rest}>
    {label}{required && <strong>*</strong>}
  </Label>
}
