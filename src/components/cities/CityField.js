import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import renderDropdownList from '../renderDropdownList'

const CityField = ({
    results,
    isFetching,
    onChangeCity
}) => <Field
       name = 'city'
       component = { renderDropdownList }
       dataKey = 'pindex'
       textField = 'city'
       data = { results }
       onSearch= { onChangeCity }
       filter={"contains"}
       isFetching = { isFetching }
      />

CityField.propTypes = {
    results: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onChangeCity: PropTypes.func,
}

export default CityField