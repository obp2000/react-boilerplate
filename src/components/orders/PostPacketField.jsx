import PropTypes from 'prop-types'
import React from 'react'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import WrapInCol from '../Shared/WrapInCol'

const PostPacketField = DropdownListFormGroup({
    label_col_size: 2,
    dataKey: 'value',
    textField: 'display_name'
})

export default WrapInCol(PostPacketField)