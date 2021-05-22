import PropTypes from 'prop-types'
import React from 'react'
import {
    Link
} from 'react-router-dom'
import Loader from 'react-loader'
import Order from './Order'
import Pagination from '../Pagination/Pagination'

const Orders = ({
    results,
    totalCount,
    totalPages,
    search,
    page,
    isFetching,
    deleteOrderAction
}) => <Loader loaded={!isFetching}>
            <div>
            <h3>Заказы ({totalCount})</h3>
            <table className="table table-sm table-striped table-bordered table-hover">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Заказчик</th>
                        <th scope="col">Сумма</th>
                        <th scope="col">Создана</th>
                        <th scope="col">Изменена</th>
                        <th scope="col">
                            <Link to="/orders/new" className="btn btn-outline-primary btn-sm">Новый</Link>
                        </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((order, index) => <Order {...order} key={index} deleteOrderAction={deleteOrderAction}/>)}
                </tbody>
            </table>
            <Pagination {...{table: 'orders', totalPages, page, search}} />
        </div>
    </Loader>

Orders.propTypes = {
    results: PropTypes.array.isRequired,
    totalCount: PropTypes.number,
    totalPages: PropTypes.number,
    search: PropTypes.string,
    page: PropTypes.number,
    isFetching: PropTypes.bool,
    deleteOrderAction: PropTypes.func
}

Orders.defaultProps = {
    results: []
}

export default Orders