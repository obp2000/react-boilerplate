import type { FieldMetaState } from 'react-final-form'
import Form from '@/client/FormBootstrap'

export default function WidgetErrors({ touched, error }: FieldMetaState<any>) {
  if (touched && !!error) {
    return <Form.Control.Feedback type='invalid'>
      {error}
    </Form.Control.Feedback>
  } else {
    return null
  }
}
