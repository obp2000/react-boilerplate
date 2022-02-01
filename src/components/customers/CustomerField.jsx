import PropTypes from 'prop-types'
import React from 'react'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import WrapInCol from '../Shared/WrapInCol'
import { Actions } from '../redux/Customers'

const CustomerField = DropdownListFormGroup({
    search_path:  Actions.getSearchPath(),
    label_col_size: 2,
    textField: 'nick',
})

export default WrapInCol(CustomerField)
