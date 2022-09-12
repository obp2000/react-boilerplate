import {FormFeedback} from 'reactstrap'

type Props = {
  touched?: boolean
  error?: string
}

const WidgetErrors = ({
  touched,
  error,
  // warning,
}: Props) => {
  if (touched && !!error) {
    return <FormFeedback>
      {error}
    </FormFeedback>
  } else {
    return null
  }
}

export default WidgetErrors
