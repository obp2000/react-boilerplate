import React from 'react'
import {useOutletContext} from 'react-router-dom'

const ObjectsTableFieldNames = () => {
  const {options, tableFieldNames} = useOutletContext()
  return tableFieldNames.map((tableFieldName, key) =>
            <th scope="col" key={key}>
              {options[tableFieldName]?.label}
            </th>
          )
}

export default ObjectsTableFieldNames
