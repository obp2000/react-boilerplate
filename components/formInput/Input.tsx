import type { FieldRenderProps } from 'react-final-form'
import { Input } from 'reactstrap'
import FormTextList from './FormTextList'
import { useFieldProps } from './hooks'
import WidgetErrors from './WidgetErrors'

export default function InputComp(props: FieldRenderProps<any>) {
  return <>
    <Input {...useFieldProps(props)} />
    <WidgetErrors {...props.meta} />
    <FormTextList {...props} />
  </>
}
