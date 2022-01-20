import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import renderDropdownList from '../Shared/renderDropdownList'

const CityField = ({
    search_results,
    isFetching,
    onChangeCity
}) => <Field
       name='city'
       component={ renderDropdownList }
       dataKey='pindex'
       textField='city'
       data={ search_results }
       onSearch={ onChangeCity }
       filter={"contains"}
       busy={ isFetching }
      />

CityField.propTypes = {
    search_results: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onChangeCity: PropTypes.func,
}

export default CityField