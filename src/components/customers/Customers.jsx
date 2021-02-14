import PropTypes from 'prop-types'
import React from 'react'
import Loader from 'react-loader'
import {Link} from 'react-router-dom'
import Customer from './Customer'
import Pagination from '../Pagination/Pagination'
import SearchForm from '../Search/Containers/SearchForm'

const Customers = ({results, 
                    totalCount, 
                    totalPages, 
                    search, 
                    page, 
                    isFetching, 
                    accessToken,
                    deleteCustomerAction}) => <Loader loaded={!isFetching}>
      <div>
          <div className="row">
              <div className="col-sm-7">
                  <h3>Покупатели ({totalCount})</h3>
              </div>
              <div className="col-sm-5">
                  <SearchForm table='customers'/>
              </div>
          </div>
        <table className="table table-sm table-striped table-bordered table-hover">
          <thead className="thead-light">
              <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Ник</th>
                  <th scope="col">ФИО</th>
                  <th scope="col">Создан</th>
                  <th scope="col">Обновлен</th>
                  <th scope="col">
                      <Link to="/customers/new" className="btn btn-outline-primary btn-sm">Новый</Link>
                  </th>
                  <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
            {results.map((customer, index) => <Customer {...customer} 
                accessToken={accessToken} key={index} deleteCustomerAction={deleteCustomerAction}/>)}
          </tbody>
        </table>
        <Pagination {...{table: 'customers', totalPages, page, search}} />
      </div>
</Loader>

Customers.propTypes = {
  results: PropTypes.array.isRequired,
  totalCount: PropTypes.number,
  totalPages: PropTypes.number,
  search: PropTypes.string,
  page: PropTypes.number,
  isFetching: PropTypes.bool,
  accessToken: PropTypes.string,
  deleteCustomerAction: PropTypes.func
}

Customers.defaultProps = {
  results: []
}

export default Customers
