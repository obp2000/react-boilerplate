import Label from '@/client/Label'
import { FieldRenderProps } from 'react-final-form'
import { DropdownProps } from 'react-widgets/cjs/DropdownList'
import { useFieldProps } from './hooks'

export default function LabelComp(props: { name: string }): JSX.Element
// export default function LabelComp(props: FieldRenderProps<any>): JSX.Element
export default function LabelComp(props: FieldRenderProps<any> & DropdownProps<any>): JSX.Element
export default function LabelComp(props: any): JSX.Element {
  const { label, required, ...rest } = useFieldProps(props)
  return <Label {...rest}>
    {label}{required && <strong>*</strong>}s
  </Label>
}
