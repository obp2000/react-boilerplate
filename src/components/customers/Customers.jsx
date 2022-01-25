import PropTypes from 'prop-types'
import React from 'react'
import Loader from 'react-loader'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
import CustomerRow from './Containers/CustomerRow'
import Pagination from '../Pagination/Pagination'
import SearchForm from '../Search/Containers/SearchForm'
import Errors from '../Errors'

const Customers = ({
    results,
    totalCount,
    totalPages,
    search,
    page,
    isFetching,
    errors
}) => <div>
        {errors && <Errors errors={errors}/>}
          <div className="row">
              <div className="col-sm-7">
                  <h3>Покупатели ({totalCount})</h3>
              </div>
              <div className="col-sm-5">
                  <SearchForm table='customers'/>
              </div>
          </div>
        <Loader loaded={!isFetching}>
        <Table size='sm' bordered striped hover className='table-secondary'>
          <thead className="thead-light">
              <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Ник</th>
                  <th scope="col">ФИО</th>
                  <th scope="col">Город</th>
                  <th scope="col">Индекс</th>
                  <th scope="col">Адрес</th>
                  <th scope="col">Создан</th>
                  <th scope="col">
                      <Link to="/customers/new" className="btn btn-outline-primary btn-sm">Новый</Link>
                  </th>
                  <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
              {results.map((customer, index) => <CustomerRow {...customer} key={index} />)}
          </tbody>
        </Table>
        </Loader>
        <Pagination {...{table: 'customers', totalPages, page, search}} />
      </div>


Customers.propTypes = {
    results: PropTypes.array.isRequired,
    totalCount: PropTypes.number,
    totalPages: PropTypes.number,
    search: PropTypes.string,
    page: PropTypes.number,
    isFetching: PropTypes.bool,
    errors: PropTypes.array
}

Customers.defaultProps = {
    results: []
}

export default Customers