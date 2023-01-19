import { Field, FieldRenderProps } from 'react-final-form'
import { useFieldProps } from './hooks'
import SelectOptions from './SelectOptions'

export default function SelectField(
  props: Omit<FieldRenderProps<any>, 'input' | 'meta'> & { className: string }) {
  return <Field
      {...useFieldProps(props)}
      component='select'>
      <SelectOptions {...props} />
    </Field>
}
