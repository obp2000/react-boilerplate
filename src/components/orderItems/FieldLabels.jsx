import React from 'react'
import {useFieldLabels} from './hooks'

const FieldLabels = () => {
  const fieldLabels = useFieldLabels()
  return  fieldLabels.map((fieldLabel, key) =>
            <th scope="col" {...{key}}>
              {fieldLabel}
            </th>
  )
}

export default FieldLabels
