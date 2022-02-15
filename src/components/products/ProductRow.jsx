import PropTypes from 'prop-types'
import React from 'react'
import DeleteButton from '../Shared/DeleteButton'
import LinkToEdit from '../Shared/LinkToEdit'
import ProductName from './ProductName'

const ProductRow = ({
    id,
    // name,
    // product_type,
    // threads,
    // get_threads_display,
    // contents,
    // get_contents_display,
    price,
    weight,
    width,
    density,
    dollar_price,
    dollar_rate,
    created_at,
    updated_at,
    deleteObject,
    ...rest
}) => {
    return <tr>
        <th scope="row">{id}</th>
        <td>{ProductName(rest)}</td>
        <td>{price}</td>
        <td>{width}</td>
        <td>{density}</td>
        <td>{created_at}</td>
        <td>{updated_at}</td>
        <td>
            <LinkToEdit {...{id, ...rest}} />
        </td>
        <td>
            <DeleteButton action={() => deleteObject(id)} />
        </td>
    </tr>
}

ProductRow.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    product_type: PropTypes.number,
    threads: PropTypes.number,
    get_threads_display: PropTypes.string,
    contents: PropTypes.number,
    get_contents_display: PropTypes.string,
    image_url: PropTypes.string,
    density: PropTypes.number,
    density_shop: PropTypes.number,
    width: PropTypes.number,
    width_shop: PropTypes.number,
    price: PropTypes.number.isRequired,
    price_pre: PropTypes.number,
    dollar_price: PropTypes.string,
    dollar_rate: PropTypes.string,
    weight_for_count: PropTypes.number,
    length_for_count: PropTypes.string,
    weight: PropTypes.string,
    deleteObject: PropTypes.func
}

ProductRow.defaultProps = {
    id: 0,
    name: '',
    image_url: '',
    density: 0,
    density_shop: 0,
    width: 0,
    width_shop: 0,
    price: 0,
    price_pre: 0,
    dollar_price: 0,
    dollar_rate: 0,
    weight_for_count: 0,
    length_for_count: 0,
    weight: 0
}

export default ProductRow