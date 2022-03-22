import PropTypes from 'prop-types'
import React from 'react'
import DeleteButton from '../Shared/DeleteButton'
import LinkToEdit from '../Shared/LinkToEdit'
import ProductName from './ProductName'

const ProductRow = ({
    product,
    product: {
        id,
        price,
        width,
        density,
        created_at,
        updated_at
    },
    options,
    deleteObject,
    common_consts,
    ...rest
}) => <tr>
        <th scope="row">{id}</th>
        <td>{ProductName(product, options)}</td>
        <td>{price}</td>
        <td>{width}</td>
        <td>{density}</td>
        <td>{created_at}</td>
        <td>{updated_at}</td>
        <td>
            <LinkToEdit {...{id, ...common_consts, ...rest}} />
        </td>
        <td>
            <DeleteButton action={() => deleteObject(id)} {...common_consts} />
        </td>
    </tr>

ProductRow.propTypes = {
    product: PropTypes.object,
    id: PropTypes.number,
    price: PropTypes.number,
    width: PropTypes.number,
    density: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    options: PropTypes.object,
    deleteObject: PropTypes.func.isRequired,
    common_consts: PropTypes.object,
}

export default ProductRow