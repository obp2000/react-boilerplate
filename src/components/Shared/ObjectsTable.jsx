import PropTypes from 'prop-types'
import React from 'react'
import {useSelector} from 'react-redux'
import {Link, useLocation, useSearchParams} from 'react-router-dom'
import {Table, Row, Col, Badge, Button} from 'reactstrap'
import {toast} from 'react-toastify'
import Loader from 'react-loader'
// import {toast} from 'react-toastify'
import Pagination from '../Pagination/Pagination'
// import DeleteButton from './DeleteButton'
import {selectAuth} from '../redux/auth'
import {
  useGetObjectsQuery,
  useGetOptionsQuery,
  useDeleteObjectMutation,
} from '../../services/apiSlice'
import {getTableLabels} from '../redux/Router'
import config from '../Config'
import confirmAction from '../Shared/ConfirmAction'

const ObjectsTable = ({indexUrl, tableFieldNames, rowData}) => {
  const {isAuthenticated} = useSelector(selectAuth)
  // console.log("isAuthenticated ", isAuthenticated)
  // const {indexUrl, tableFieldNames, rowData} = config
  const {
    data: {
      commonConsts: {
        new: textNew,
        edit,
        successfully,
        delete: textDelete,
        yes,
        no
      } = {},
      options,
    } = {},
    isFetching: isOptionsFetching,
    // isLoading,
    // isSuccess,
  } = useGetOptionsQuery(indexUrl)
  const [searchParams] = useSearchParams()
  const args = {url: indexUrl}
  if (searchParams) {
    // args.params = querystring.parse(location.search.replace('?', ''))
    args.params = searchParams.toString()
  }
  const {
    data: tableData = {},
    isFetching: isObjectsFetching,
  } = useGetObjectsQuery(args)
  const [
    deleteObject,
    {
      isLoading: isDeleting,
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: deleteError,
    }
  ] = useDeleteObjectMutation()
  const busy = isOptionsFetching || isObjectsFetching || isDeleting
  // if (!busy && isSuccessDelete) {
  //   toast.dismiss()
  //   toast.success(commonConsts?.successfully)
  // }
  // if (!busy && isErrorDelete) {
  //   toast.dismiss()
  //   toast.error(deleteError.detail, {autoClose: false})
  // }
  // console.log('useNavigate() ', useNavigate())
  return <Loader loaded={!busy} >
      <Row>
        <Col sm={2}>
          <h3 aria-labelledby={options?.name_plural}>
            {options?.name_plural}
          </h3>
        </Col>
        <Col>
          <h4 aria-label='Total count'>
            <Badge>{tableData.totalCount}</Badge>
          </h4>
        </Col>
      </Row>
      <Table size='sm'
        bordered
        striped
        hover
        className='table-secondary'>
        <thead className="thead-light">
          <tr>
            {getTableLabels(tableFieldNames, options).map((label, key) =>
              <th scope="col" key={key}>
                {label}
              </th>,
            )}
            {isAuthenticated &&
                            <th scope="col" colSpan={2}>
                              <Link to={`${indexUrl}new`}
                                className="btn btn-outline-primary btn-sm"
                                aria-labelledby={textNew}>
                                {textNew}
                              </Link>
                            </th>}
          </tr>
        </thead>
        <tbody>
          {tableData?.results?.map((object, key) =>
            <tr key={key} aria-label={options?.name_singular}>
              {rowData(object, options)?.map((value, key) =>
                <td scope="row" key={key}>
                  {value}
                </td>,
              )}
              {isAuthenticated &&
                                <td>
                                  <Link to={`${indexUrl}${object.id}`}
                                    className="btn btn-outline-primary btn-sm"
                                    aria-labelledby={edit}>
                                    {edit}
                                  </Link>
                                </td>}
              {isAuthenticated &&
                <td>
                  <Button size='sm'
                      outline
                      aria-labelledby={textDelete}
                      onClick={confirmAction(() => deleteObject({
                                                    url: indexUrl,
                                                    id: object.id}).unwrap()
                          .then(() => {
                            toast.dismiss()
                            toast.success(successfully)
                          })
                          .catch(({data}) =>
                            toast.error(data.detail, {autoClose: false})),
                      `${textDelete}?`, yes, no)}
                  >
                    {textDelete}
                  </Button>
                </td>}
            </tr>,
          )}
        </tbody>
      </Table>
      <Pagination {...{tableData}} />
    </Loader>
}

ObjectsTable.propTypes = {
  indexUrl: PropTypes.string,
  tableFieldNames: PropTypes.array,
  rowData: PropTypes.func,
}

export default ObjectsTable
