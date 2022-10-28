import { Label } from 'reactstrap'
import type { DropdownListAttrs } from '../../interfaces/dropdownList'
import type { FieldAttrs } from '../../interfaces/input'
import type { LabelSizes, AnyFieldAttrs } from '../../interfaces/inputLabel'
import type { SelectFieldAttrs } from '../../interfaces/selectField'
import { useFieldProps } from './hooks'

function LabelComp(props: { name: string }): JSX.Element
function LabelComp(props: FieldAttrs & LabelSizes): JSX.Element
function LabelComp(props: SelectFieldAttrs & LabelSizes): JSX.Element
function LabelComp(props: DropdownListAttrs & LabelSizes): JSX.Element
function LabelComp(props: any): JSX.Element {
  const { label, required, ...rest } = useFieldProps(props)
  return <Label {...rest}>
    {label}{required && <strong>*</strong>}
  </Label>
}

export default LabelComp
