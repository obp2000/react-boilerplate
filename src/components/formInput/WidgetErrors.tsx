import React from 'react'
import { FormFeedback } from 'reactstrap'

type Props = {
  touched?: boolean
  error?: string
}

const WidgetErrors = ({
  touched,
  error,
  // warning,
}: Props): JSX.Element | null => {
  if (touched && !!error) {
    return <FormFeedback>
      {error}
    </FormFeedback>
  } else {
    return null
  }
}

export default WidgetErrors
