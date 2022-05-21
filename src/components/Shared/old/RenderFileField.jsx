import PropTypes from 'prop-types'
import React from 'react'
import WidgetErrors from './WidgetErrors'

const renderFileField = ({
  input: {
    onChange,
    type,
  },
  meta,
  ...rest
}) =>
  <div>
    <div>
      <input
        type={type}
        onChange={(e) => onChange(e.target.files[0])}
        {...rest}
      />
    </div>
    <WidgetErrors {...meta} />
  </div>

export default renderFileField
