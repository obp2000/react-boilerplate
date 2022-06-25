import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useSearchParams} from 'react-router-dom'
import {Table, Row, Col, Badge, Button} from 'reactstrap'
import Loader from 'react-loader'
import Pagination from '../Pagination/Pagination'
import {selectAuth} from '../auth/selectors'
import {
  getObjectsDataSelector,
  getSelectors,
  getObjectByIdSelector,
} from '../../services/entityAdapter'
import {deleteWithConfirm} from './deleteWithConfirm'

const ObjectsTable = ({
  indexUrl: url,
  tableFieldNames,
  rowData,
  optionsTrigger,
  commonConsts,
  options,
  getObjects,
  useDeleteObjectMutation,
}) => {
  useEffect(() => {
    optionsTrigger(url, true)
  }, [url])
  const params = useSearchParams()[0].toString()
  const dispatch = useDispatch()
  dispatch(getObjects.initiate(params))
  const selectObjectsResult = getObjects.select(params)
  const objectsResult = useSelector(selectObjectsResult)
  const selectObjectsData = getObjectsDataSelector(selectObjectsResult)
  const objectsData = useSelector(selectObjectsData)
  const {selectAll} = getSelectors(selectObjectsData)
  const [deleteObject, deleteStatus] = useDeleteObjectMutation()
  const busy = objectsResult.isFetching || deleteStatus.isLoading
  const {isAuthenticated} = useSelector(selectAuth)
  return <Loader loaded={!busy} >
    <Row>
      <Col sm={2}>
        <h3 aria-labelledby={options?.name_plural}>
          {options?.name_plural}
        </h3>
      </Col>
      <Col>
        <h4 aria-label='Total count'>
          <Badge>{objectsData?.totalCount}</Badge>
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
          {tableFieldNames.map((tableFieldName, key) =>
            <th scope="col" key={key}>
              {options[tableFieldName]?.label}
            </th>
          )}
          {isAuthenticated &&
                            <th scope="col" colSpan={2}>
                              <Link to={`${url}new`}
                                state={{object: {}}}
                                className="btn btn-outline-primary btn-sm"
                                aria-labelledby={commonConsts?.new}>
                                {commonConsts?.new}
                              </Link>
                            </th>}
        </tr>
      </thead>
      <tbody>
        {useSelector(selectAll)?.map((object, key) =>
          <tr key={key} aria-label={options?.name_singular}>
            {rowData(object, options)?.map((value, key) =>
              <td scope="row" key={key}>
                {value}
              </td>,
            )}
            {isAuthenticated &&
                                <td>
                                  <Link to={`${url}${object.id}`}
                                    state={{object}}
                                    className="btn btn-outline-primary btn-sm"
                                    aria-labelledby={commonConsts?.edit}>
                                    {commonConsts?.edit}
                                  </Link>
                                </td>}
            {isAuthenticated &&
                <td>
                  <Button size='sm'
                    outline
                    aria-labelledby={commonConsts?.delete}
                    onClick={deleteWithConfirm(deleteObject,
                      {id: object.id, tableArgs: params}, commonConsts)}>
                    {commonConsts?.delete}
                  </Button>
                </td>}
          </tr>,
        )}
      </tbody>
    </Table>
    <Pagination totalPages={objectsData?.totalPages} />
  </Loader>
}

ObjectsTable.propTypes = {
  indexUrl: PropTypes.string,
  tableFieldNames: PropTypes.array,
  rowData: PropTypes.func,
  optionsTrigger: PropTypes.func,
  commonConsts: PropTypes.object,
  options: PropTypes.object,
}

export default ObjectsTable
