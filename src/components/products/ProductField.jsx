import PropTypes from 'prop-types'
import React from 'react'
import DropdownList from '../Shared/DropdownList'
import { Actions } from '../redux/Products'
import ProductName from './ProductName'

const renderListItem = ({ item }) => ProductName(item)

const renderValue = ({ item }) => ProductName(item)

const textField = item => ProductName(item)

const ProductField = props =>
    <DropdownList {...{
        search_path:  Actions.getSearchPath(),
        textField,
        renderListItem,
        renderValue,
        ...props}} />

export default ProductField
