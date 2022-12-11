import type { SelectFieldAttrs } from '@/interfaces/selectField'
import SelectField from './SelectField'
import FloatingLabel from '@/client/FloatingLabel'
import { useFieldProps } from './hooks'

export default function SelectFloatingFormGroup(props: SelectFieldAttrs) {
  const { placeholder, required, id } = useFieldProps(props)
  return <FloatingLabel
    controlId={id}
    label={`${placeholder}${required ? '*' : ''}`}
    className="mb-3"
  >
    <SelectField {...props} />
  </FloatingLabel>
}
