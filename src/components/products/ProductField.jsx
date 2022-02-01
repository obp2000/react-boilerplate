import PropTypes from 'prop-types'
import React from 'react'
import DropdownList from '../Shared/DropdownList'
import { Actions } from '../redux/Products'

const ProductField = params =>
    <DropdownList {...{
        search_path:  Actions.getSearchPath(),
        textField: 'name',
        ...params}} />

export default ProductField
