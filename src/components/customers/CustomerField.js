import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import dropdownListComponent from '../renderDropdownList'

const CustomerField = ({
    search_results,
    isFetching,
    onSearchCustomer
}) => <Field
        name='customer'
        component={dropdownListComponent}
        // dataKey='id'
        textField='nick'
        data={search_results}
        onSearch={onSearchCustomer}
        filter={"contains"}
        isFetching={isFetching}
      />

CustomerField.propTypes = {
    search_results: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onSearchCustomer: PropTypes.func,
}

export default CustomerField