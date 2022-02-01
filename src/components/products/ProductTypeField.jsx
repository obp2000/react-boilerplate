import PropTypes from 'prop-types'
import React from 'react'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'

const ProductTypeField = DropdownListFormGroup({
    // search_path: '/product_types',
    label_col_size: 2,
    textField: 'name',
    dataKey: 'id'
})

export default ProductTypeField