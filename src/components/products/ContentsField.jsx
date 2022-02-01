import PropTypes from 'prop-types'
import React from 'react'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'

const ContentsField = DropdownListFormGroup({
    label_col_size: 2,
    dataKey: 'value',
    textField: 'display_name',
    // listbox: true
})

export default ContentsField