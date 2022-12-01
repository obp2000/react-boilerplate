import type { FieldMetaState } from 'react-final-form'
import { FormFeedback } from 'reactstrap'

export default function WidgetErrors({ touched, error }: FieldMetaState<any>) {
  if (touched && !!error) {
    return <FormFeedback>
      {error}
    </FormFeedback>
  } else {
    return null
  }
}
