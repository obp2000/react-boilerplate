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
            isFetching,
        },
        auth: {
            accessToken
        }
    }) => ({
        results,
        totalCount,
        isFetching,
        accessToken
    }))
    const dispatch = useDispatch()
    const deleteObject = deleteObjectAction(dispatch, Actions, loaded.accessToken)
    return <Loader loaded={!loaded.isFetching}>
        <>
            <ObjectsPageHeader title='Заказы' totalCount={loaded.totalCount} />
            <Table size='sm' bordered striped hover className='table-secondary'>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Заказчик</th>
                        <th scope="col">Сумма</th>
                        <th scope="col">Создана</th>
                        <th scope="col">Изменена</th>
                        <th scope="col" colSpan={2}>
                            <LinkToNew {...props}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loaded.results.map((order, key) =>
                        <OrderRow {...{...order, deleteObject, key, ...props}} />)}
                </tbody>
            </Table>
            <Pagination {...props} />
        </>
    </Loader>
}

export default Orders