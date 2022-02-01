import PropTypes from 'prop-types'
import React from 'react'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'

const renderListItem = ({ item }) =>
    <> { item.city } инд. { item.pindex } </>

const CityField = DropdownListFormGroup({
    search_path: '/cities',
    label_col_size: 2,
    textField: 'city',
    dataKey: 'id',
    renderListItem,
})

export default CityField
