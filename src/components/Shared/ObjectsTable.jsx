import PropTypes from 'prop-types'
import React from 'react'
import {useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import querystring from 'querystring'
import {Table, Row, Col, Badge} from 'reactstrap'
import Loader from 'react-loader'
// import {toast} from 'react-toastify'
import Pagination from '../Pagination/Pagination'
import DeleteButton from './DeleteButton'
import {selectAuth} from '../redux/auth'
import {tableName} from './BasePathname'
import {
  useGetObjectsQuery,
  useGetOptionsQuery,
  useDeleteObjectMutation,
} from '../../services/apiSlice'
import {getTableLabels} from '../redux/Router'
// import {useNavigate} from 'react-router-dom'

const ObjectsTable = ({indexUrl, tableFieldNames, rowData}) => {
  const {isAuthenticated} = useSelector(selectAuth)
  const {
    data: {
      commonConsts,
      options,
    } = {},
    // isLoading,
    // isSuccess,
  } = useGetOptionsQuery(indexUrl)
  const location = useLocation()
  const tablePath = `/${tableName(location)}/`
  const args = {url: indexUrl}
  if (location.search) {
    args.params = querystring.parse(location.search.replace('?', ''))
  }
  const {
    data: tableData = {},
    // isLoading,
    isFetching,
  } = useGetObjectsQuery(args)
  const [deleteObject] = useDeleteObjectMutation()
  // console.log('useNavigate() ', useNavigate())
  // console.log('tableData ', useGetObjectsQuery(args))
  return <>
    <Row>
      <Col sm={2}>
        <h3>{options?.name_plural}</h3>
      </Col>
      <Col>
        <h4>
          <Badge>{tableData.totalCount}</Badge>
        </h4>
      </Col>
    </Row>
    <Loader loaded={!isFetching} >
      <Table size='sm'
        bordered
        striped
        hover
        className='table-secondary'
        role="table">
        <thead className="thead-light">
          <tr>
            {getTableLabels(tableFieldNames, options).map((label, key) =>
              <th scope="col" key={key}>
                {label}
              </th>,
            )}
            {isAuthenticated &&
                            <th scope="col" colSpan={2}>
                              <Link to={`${tablePath}new`}
                                className="btn btn-outline-primary btn-sm">
                                {commonConsts?.new}
                              </Link>
                            </th>}
          </tr>
        </thead>
        <tbody>
          {tableData?.results?.map((object, key) =>
            <tr key={key} role="row">
              {rowData(object, options)?.map((value, key) =>
                <td scope="row" key={key}>
                  {value}
                </td>,
              )}
              {isAuthenticated &&
                                <td>
                                  <Link to={`${tablePath}${object.id}`}
                                    className="btn btn-outline-primary btn-sm">
                                    {commonConsts?.edit}
                                  </Link>
                                </td>}
              {isAuthenticated &&
                                <td>
                                  <DeleteButton
                                    {...object}
                                    {...{url: indexUrl,
                                      deleteObjectAction: deleteObject,
                                    }}
                                    {...commonConsts} />
                                </td>}
            </tr>,
          )}
        </tbody>
      </Table>
    </Loader>
    <Pagination {...{tableData}} />
  </>
}

ObjectsTable.propTypes = {
  indexUrl: PropTypes.string,
  tableFieldNames: PropTypes.array,
  rowData: PropTypes.func,
}

export default ObjectsTable
