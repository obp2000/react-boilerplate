import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import querystring from 'querystring'
import { Table, Row, Col, Badge } from 'reactstrap'
import Loader from 'react-loader'
// import Label from './Label'
import Pagination from '../Pagination/Pagination'
import DeleteButton from './DeleteButton'
import { selectTableValues } from '../redux/Router'
// import { selectOptions, getOptionsThunk } from '../redux/CommonConsts'
import { selectAuth } from '../redux/auth'
import { Error } from './Errors'
import { TableName } from './BasePathname'
import { deleteObjectThunk } from '../redux/CommonActions'
import { useCommonConsts, useOptions, useGetObjectsQuery } from '../../services/apiSlice'
import { tableFieldNames as customersFieldNames,
         rowData as customersRowData } from '../redux/Customers'
import { tableFieldNames as productsFieldNames,
         rowData as productsRowData  } from '../redux/Products'
import { tableFieldNames as ordersFieldNames,
         rowData as ordersRowData } from '../redux/Orders'
import { getTableLabels } from '../redux/Router'

const ObjectsTable = ({ index_url }) => {
    const { isAuthenticated } = useSelector(selectAuth)
    const common_consts = useCommonConsts({
        url: index_url,
        params: {
            isAuthenticated
        }
    })
    const location = useLocation()
    const table_name = TableName(location)
    const {
        data: tableData = {},
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetObjectsQuery({
        url: index_url,
        params: querystring.parse(location.search.replace('?', ''))
    })
    // console.log('render ')
    const options = useOptions({url: index_url,
                                params: {isAuthenticated}})
    // const table_values = useSelector(selectTableValues(table_name, tableData))

    let tableLabels = []
    let rowData = []
    switch (table_name) {
        case 'customers':
            tableLabels = getTableLabels(customersFieldNames, options)
            rowData = customersRowData
            break
      case 'products':
            tableLabels = getTableLabels(productsFieldNames, options)
            rowData = productsRowData
            break
      case 'orders':
            tableLabels = getTableLabels(ordersFieldNames, options)
            rowData = ordersRowData
            break
    }

    return <>
        <Row>
            <Col sm={2}>
                <h3>{options.name_plural}</h3>
            </Col>
            <Col>
                <h4>
                    <Badge>{tableData.totalCount}</Badge>
                </h4>
            </Col>
        </Row>
        {isError && <Error message={error} />}
        <Loader loaded={!isFetching} >
        <Table  size='sm'
                    bordered
                    striped
                    hover
                    className='table-secondary'
                    role="table">
                <thead className="thead-light">
                    <tr>
                        {tableLabels?.map((label, key) =>
                            <th scope="col" key={key}>
                                {label}
                            </th>
                        )}
                        {isAuthenticated &&
                            <th scope="col" colSpan={2}>
                                <Link to={`/${table_name}/new`}
                                      className="btn btn-outline-primary btn-sm">
                                    {common_consts.new}
                                </Link>
                            </th>}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.results?.map((object, key) =>
                        <tr key={key} role="row">
                            {rowData(object, options).map((value, key) =>
                                <td scope="row" key={key}>
                                    {value}
                                </td>
                            )}
                            {isAuthenticated &&
                                <td>
                                    <Link to={`/${table_name}/${object.id}`}
                                        className="btn btn-outline-primary btn-sm">
                                        {common_consts.edit}
                                    </Link>
                                </td>}
                            {isAuthenticated &&
                                <td>
                                    <DeleteButton {...object}
                                        deleteObjectAction={deleteObjectThunk(index_url)}
                                        {...common_consts} />
                                </td>}
                        </tr>
                    )}
                </tbody>
            </Table>
        </Loader>
        <Pagination {...{tableData}} />
        </>
}

ObjectsTable.propTypes = {
    index_url: PropTypes.string,
    // fields: PropTypes.object,
    // deleteObjectAction: PropTypes.func.isRequired
}

export default ObjectsTable