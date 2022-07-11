import PropTypes from 'prop-types'
import React from 'react'
import {useOutletContext} from 'react-router-dom'

const ObjectsTableFieldValues = ({object}) => {
  const {rowData} = useOutletContext()
  return rowData(object)?.map((value, key) =>
              <td scope="row" key={key}>
                {value}
              </td>
        )
}

ObjectsTableFieldValues.propTypes = {
  object: PropTypes.object,
}

export default ObjectsTableFieldValues
