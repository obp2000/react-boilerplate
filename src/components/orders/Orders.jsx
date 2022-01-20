import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader'
import OrderRow from './Containers/OrderRow'
import Pagination from '../Pagination/Pagination'
import SearchForm from '../Search/Containers/SearchForm'
import Errors from '../Errors'

const Orders = ({
    results,
    totalCount,
    totalPages,
    search,
    page,
    isFetching,
    errors
}) => <Loader loaded={!isFetching}>
        <div>
            {errors && <Errors errors={errors}/>}
            <div className="row">
                <div className="col-sm-7">
                  <h3>Заказы ({totalCount})</h3>
                </div>
                <div className="col-sm-5">
                  <SearchForm table='orders'/>
                </div>
            </div>
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
                    {results.map((order, index) => <OrderRow {...order} key={index} />)}
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
    errors: PropTypes.array
}

Orders.defaultProps = {
    results: []
}

export default Orders