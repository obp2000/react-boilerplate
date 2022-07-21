import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'

const emptyObject = {}

const ObjectsTableFieldNames = ({tableFieldNames}) => {
  const {options = emptyObject} = useOutletContext()
  return tableFieldNames.map((tableFieldName, key) =>
            <th scope="col" key={key}>
              {options[tableFieldName]?.label}
            </th>
          )
}

ObjectsTableFieldNames.propTypes = {
  tableFieldNames: PropTypes.array,
}

export default ObjectsTableFieldNames
