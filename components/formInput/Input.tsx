import type { FieldRenderProps } from 'react-final-form'
import Form from '@/client/FormBootstrap'
import FormTextList from './FormTextList'
import { useFieldProps } from './hooks'
import WidgetErrors from './WidgetErrors'

export default function InputComp(props: FieldRenderProps<any>) {
  return <>
    <Form.Control {...useFieldProps(props)} />
    <WidgetErrors {...props.meta} />
    <FormTextList {...props} />
  </>
}
