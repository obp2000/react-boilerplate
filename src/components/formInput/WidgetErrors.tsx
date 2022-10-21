import { FC } from 'react'
import type { FieldMetaState } from 'react-final-form'
import { FormFeedback } from 'reactstrap'

const WidgetErrors: FC<FieldMetaState<any>> = ({ touched, error }) => {
  if (touched && !!error) {
    return <FormFeedback>
      {error}
    </FormFeedback>
  } else {
    return null
  }
}

export default WidgetErrors
