import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'reactstrap'
import Loader from 'react-loader'
import ProductRow from './ProductRow'
import Pagination from '../Pagination/Pagination'
import ObjectsPageHeader from '../Shared/ObjectsPageHeader'
import { deleteObjectAction } from '../redux/ServerActions'
import { Actions } from '../redux/Products'
import LinkToNew from '../Shared/LinkToNew'

const Products = props => {
    const loaded = useSelector(({
        products: {
            results = [],
            totalCount,
            options = {},
            options: {
                name_plural,
                id = {},
                name = {},
                price = {},
                width = {},
                density = {},
                created_at = {},
                updated_at = {}
            } = {}
        },
        auth: {
            accessToken
        },
        temp_state: {
            isFetching
        },
        common_consts
    }) => ({
        results,
        totalCount,
        options,
        name_plural,
        id,
        name,
        price,
        width,
        density,
        created_at,
        updated_at,
        isFetching,
        accessToken,
        common_consts
    }))
    const dispatch = useDispatch()
    const deleteObject = deleteObjectAction(dispatch, Actions, loaded.accessToken)
    return <>
            <ObjectsPageHeader title={loaded.name_plural}
                               totalCount={loaded.totalCount} />
            <Loader loaded={!loaded.isFetching}>
            <Table size='sm' bordered striped hover className='table-secondary'>
                <thead className="thead-light">
                        <tr>
                            <th scope="col">{loaded.id.label}</th>
                            <th scope="col">{loaded.name.label}</th>
                            <th scope="col">{loaded.price.label}</th>
                            <th scope="col">{loaded.width.label}</th>
                            <th scope="col">{loaded.density.label}</th>
                            <th scope="col">{loaded.created_at.label}</th>
                            <th scope="col">{loaded.updated_at.label}</th>
                            <th scope="col" colSpan={2}>
                                <LinkToNew {...props} {...loaded.common_consts}/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loaded.results.map((product, key) =>
                            <ProductRow {...{...product,
                                             options: loaded.options,
                                             common_consts: loaded.common_consts,
                                             deleteObject,
                                             key,
                                             ...props}}
                            />)
                        }
                    </tbody>
                </Table>
            </Loader>
            <Pagination {...props} />
        </>
}

export default Products