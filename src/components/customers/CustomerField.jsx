import PropTypes from 'prop-types'
import React from 'react'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import CustomerName from './CustomerName'
import { Actions } from '../redux/Customers'

const renderListItem = ({ item }) => CustomerName(item)

const renderValue = ({ item }) => CustomerName(item)

const textField = item => CustomerName(item)

const CustomerField = DropdownListFormGroup({
    search_path:  Actions.getSearchPath(),
    label_col_size: 1,
    renderListItem,
    renderValue,
    textField
})

export default CustomerField
