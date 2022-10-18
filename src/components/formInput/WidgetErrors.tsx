import type { FieldMetaState } from 'react-final-form'
import { FormFeedback } from 'reactstrap'

const WidgetErrors = ({ touched, error, }: FieldMetaState<any>) => {
  if (touched && !!error) {
    return <FormFeedback>
      {error}
    </FormFeedback>
  } else {
    return null
  }
}

export default WidgetErrors
