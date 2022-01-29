import PropTypes from 'prop-types'
import React from 'react'
import DropdownList from '../Shared/DropdownList'
import { Actions } from '../redux/Products'

const ProductField = params =>
    <DropdownList {...{
        Actions,
        selector: 'products',
        textField: 'name',
        ...params}} />

export default ProductField

// ProductField.propTypes = {
//     search_results: PropTypes.array.isRequired,
//     isFetching: PropTypes.bool.isRequired,
//     onChangeProduct: PropTypes.func,
//     // order_item_name: PropTypes.string
// }

    // <DropdownList
    //     {...input}
    //     id={input.name}
    //     placeholder={label}
    //     // dataKey='id'
    //     textField='name'
    //     data={search_results}
    //     onSearch={onSearch}
    //     onBlur={onBlur}
    //     renderListItem={renderListItem}
    //     filter={"contains"}
    //     busy={isFetching}
    //     invalid={(meta.touched && !!meta.error) ? 'true' : null}
    //     valid={(meta.touched && !meta.error) ? 'true' : null}
    //     messages={WidgetMessages}
    // />
    // <WidgetErrors {...meta} />
    // {form_text && <FormTextList {...{form_text}} />}