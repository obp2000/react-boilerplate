import PropTypes from 'prop-types'
import React from 'react'

const FieldValues = ({useTableFieldValues, object, options}) => {
  const tableFieldValues = useTableFieldValues(object, options)
  return tableFieldValues.map((fieldValue, key) =>
    <td scope="row" key={key}>
      {fieldValue}
    </td>
  )
}

FieldValues.propTypes = {
  useTableFieldValues: PropTypes.func,
  object: PropTypes.object,
}

export default FieldValues
