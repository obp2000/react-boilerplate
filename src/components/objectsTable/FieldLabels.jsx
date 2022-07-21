import PropTypes from 'prop-types'
import React from 'react'
import {useFieldLabels} from './hooks'

const FieldLabels = ({tableFieldNames}) => {
  const fieldLabels = useFieldLabels(tableFieldNames)
  return fieldLabels.map((fieldLabel, key) =>
            <th scope="col" {...{key}}>
              {fieldLabel}
            </th>
          )
}

FieldLabels.propTypes = {
  tableFieldNames: PropTypes.array,
}

export default FieldLabels
