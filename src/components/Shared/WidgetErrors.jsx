import PropTypes from 'prop-types'
import React from 'react'
import {FormFeedback} from 'reactstrap'

const WidgetErrors = ({
  touched,
  error,
  warning,
}) => {
  if (touched && !!error) {
    return <FormFeedback>
      {error}
    </FormFeedback>
  } else if (touched && !!warning) {
    return <div>{warning}</div>
  } else {
    return null
  }
}

WidgetErrors.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.string,
  warning: PropTypes.string,
}

export default WidgetErrors
