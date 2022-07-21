import PropTypes from 'prop-types'
import React from 'react'

const FieldValues = ({useTableFieldValues, object}) => {
  const tableFieldValues = useTableFieldValues(object)
  return tableFieldValues.map((fieldValue, key) =>
            <td scope="row" {...{key}}>
              {fieldValue}
            </td>
          )
}

FieldValues.propTypes = {
  useTableFieldValues: PropTypes.func,
  object: PropTypes.object,
}

export default FieldValues
