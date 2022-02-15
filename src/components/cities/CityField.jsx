import PropTypes from 'prop-types'
import React from 'react'
import CityName from './CityName'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'

const renderListItem = ({ item }) => CityName(item)

const renderValue = ({ item }) => CityName(item)

const textField = item => CityName(item)

const CityField = DropdownListFormGroup({
    search_path: '/cities',
    label_col_size: 1,
    textField: 'city',
    dataKey: 'id',
    renderListItem,
    renderValue,
    textField
})

export default CityField
