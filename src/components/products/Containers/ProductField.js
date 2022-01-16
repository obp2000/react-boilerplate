import React from 'react'
import { connect } from 'react-redux'
import Template from '../ProductField'
import { mapCollectionStateToProps } from '../../redux/mappers'
import { onChangeProduct } from '../../redux/Products'

export default connect(mapCollectionStateToProps('products'), {
    onChangeProduct
})(Template)

// const mapStateToProps = ({
//         products: {
//             search_results,
//             isFetching
//         }
//     }) =>
//     ({
//         search_results,
//         // order_item_name
//     })

// export default connect(mapStateToProps, {
//     onChangeProduct,
//     onSelectProduct
// })(Template)