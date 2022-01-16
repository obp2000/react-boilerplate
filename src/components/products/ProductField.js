import PropTypes from 'prop-types'
import React from 'react'
// import { Field } from 'redux-form'
import { Field } from 'react-final-form'
// import comboboxComponent from '../renderCombobox'
import dropdownListComponent from '../renderDropdownList'

const ProductField = ({
    search_results,
    isFetching,
    onChangeProduct,
    order_item_name
}) => <Field
        name={`${order_item_name}.product`}
        component={dropdownListComponent}
        // dataKey='id'
        textField='name'
        data={search_results}
        onSearch={onChangeProduct}
        filter={"contains"}
        isFetching={isFetching}
        // onSelect={obj => onSelectProduct(obj, order_item_name)}
        // inputProps={{
        //     style: {fontSize: "18px"}
        // }}
    />

ProductField.propTypes = {
    search_results: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onChangeProduct: PropTypes.func,
    // onSelectProduct: PropTypes.func,
    order_item_name: PropTypes.string
}

export default ProductField