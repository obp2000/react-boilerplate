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
            options = {},
            options: {
                name_plural,
                id = {},
                name = {},
                city = {},
                address = {},
                created_at = {}
            } = {}
        },
        auth: {
            accessToken
        },
        temp_state: {
            isFetching
        },
        common_consts,
        common_consts: {
            successfully
        }
    }) => ({
        results,
        totalCount,
        options,
        name_plural,
        id,
        name,
        city,
        address,
        created_at,
        isFetching,
        accessToken,
        common_consts,
        successfully
    }))
    const dispatch = useDispatch()
    const deleteObject = deleteObjectAction(dispatch,
        Actions,
        loaded.accessToken,
        loaded.successfully)
    return < >
        <ObjectsPageHeader title={loaded.name_plural}
                           totalCount={loaded.totalCount} /> <
        Loader loaded = {!loaded.isFetching } >
        <Table size='sm' bordered striped hover className='table-secondary'>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">{loaded.id.label}</th>
                        <th scope="col">{loaded.name.label}</th>
                        <th scope="col">{loaded.city.label}</th>
                        <th scope="col">{loaded.address.label}</th>
                        <th scope="col">{loaded.created_at.label}</th>
                        <th scope="col" colSpan={2}>
                            <LinkToNew {...props} {...loaded.common_consts}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {loaded.results.map((customer, key) =>
                    <CustomerRow {...{customer,
                                      options: loaded.options,
                                      common_consts: loaded.common_consts,
                                      deleteObject,
                                      key,
                                      ...props}}
                    />)}
                </tbody>
            </Table> <
        /Loader> <
        Pagination { ...props }
    /> <
    />
}

// Customers.propTypes = {
//     page: PropTypes.string,
//     // deleteObjectAction: PropTypes.func.isRequired
// }

export default Customers