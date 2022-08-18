import PropTypes from 'prop-types'
import React from 'react'
import {useFieldLabels} from './hooks'

const FieldLabels = (props) => {
  const fieldLabels = useFieldLabels(props)
  return fieldLabels.map((fieldLabel, key) =>
    <th scope="col" key={key}>
      {fieldLabel}
    </th>
  )
}

FieldLabels.propTypes = {
  props: PropTypes.object,
}

export default FieldLabels
