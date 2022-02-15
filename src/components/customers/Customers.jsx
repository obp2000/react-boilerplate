import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from 'react-loader'
import { Table } from 'reactstrap'
import CustomerRow from './CustomerRow'
import Pagination from '../Pagination/Pagination'
import ObjectsPageHeader from '../Shared/ObjectsPageHeader'
import { deleteObjectAction } from '../redux/ServerActions'
import { Actions } from '../redux/Customers'
import LinkToNew from '../Shared/LinkToNew'

const Customers = props => {
    const loaded = useSelector(({
        customers: {
            results = [],
            totalCount,
        },
        auth: {
            accessToken
        },
        temp_state: {
            isFetching
        }
    }) => ({
        results,
        totalCount,
        isFetching,
        accessToken
    }))
    // console.log('props ', props)
    const dispatch = useDispatch()
    const deleteObject = deleteObjectAction(dispatch, Actions, loaded.accessToken)
    return <>
        <ObjectsPageHeader title='Покупатели' totalCount={loaded.totalCount} />
        <Loader loaded={!loaded.isFetching } >
            <Table size='sm' bordered striped hover className='table-secondary'>
                  <thead className="thead-light">
                      <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Имя</th>
                          <th scope="col">Город</th>
                          <th scope="col">Индекс</th>
                          <th scope="col">Адрес</th>
                          <th scope="col">Создан</th>
                          <th scope="col" colSpan={2}>
                                <LinkToNew {...props}/>
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {loaded.results.map((customer, key) =>
                            <CustomerRow {...{...customer, deleteObject, key, ...props}} />)}
                  </tbody>
                </Table>
                </Loader>
                <Pagination { ...props } />
        </>
}

// Customers.propTypes = {
//     page: PropTypes.string,
//     // deleteObjectAction: PropTypes.func.isRequired
// }

export default Customers