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

export default FieldLabels
