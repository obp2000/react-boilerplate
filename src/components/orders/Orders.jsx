import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
import Loader from 'react-loader'
import OrderRow from './OrderRow'
import Pagination from '../Pagination/Pagination'
import ObjectsPageHeader from '../Shared/ObjectsPageHeader'
import { deleteObjectAction } from '../redux/ServerActions'
import { Actions } from '../redux/Orders'
import LinkToNew from '../Shared/LinkToNew'

const Orders = props => {
    const loaded = useSelector(({
        orders: {
            results = [],
            totalCount,
            options = {},
            options: {
                id = {},
                customer = {},
                order_items_cost = {},
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
        id,
        customer,
        order_items_cost,
        created_at,
        updated_at,
        isFetching,
        accessToken,
        common_consts
    }))
    const dispatch = useDispatch()
    const deleteObject = deleteObjectAction(dispatch, Actions, loaded.accessToken)
    return <>
            <ObjectsPageHeader title='Заказы' totalCount={loaded.totalCount} />
            <Loader loaded={!loaded.isFetching}>
            <Table size='sm' bordered striped hover className='table-secondary'>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">{loaded.id.label}</th>
                        <th scope="col">{loaded.customer.label}</th>
                        <th scope="col">{loaded.order_items_cost.label}</th>
                        <th scope="col">{loaded.created_at.label}</th>
                        <th scope="col">{loaded.updated_at.label}</th>
                        <th scope="col" colSpan={2}>
                            <LinkToNew {...props} {...loaded.common_consts} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loaded.results.map((order, key) =>
                        <OrderRow {...{...order,
                                       options: loaded.options,
                                       common_consts: loaded.common_consts,
                                       deleteObject,
                                       key,
                                       ...props}}
                        />)}
                </tbody>
            </Table>
            </Loader>
            <Pagination {...props} />
        </>
}

export default Orders