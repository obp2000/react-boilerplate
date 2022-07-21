import PropTypes from 'prop-types'
import React from 'react'
import {Table, Row, Col, Badge, Button} from 'reactstrap'
import Loader from 'react-loader'
import Pagination from '../Pagination/Pagination'
// import {useObjects} from '../../services/entityAdapter'
import ObjectsTableFieldNames from './ObjectsTableFieldNames'
import DeleteObjectButton from '../deleteObjectButton/DeleteObjectButton'
import ObjectsTableHeader from './ObjectsTableHeader'
import LinkToNewOrEditObject from
  '../linkToNewOrEditObject/LinkToNewOrEditObject'
// import {useObjectsTable} from './hooks'
// import {useCustomersTable} from '../customers/hooks'

const ObjectsTable = ({useObjectsTable}) => {
  const {
    indexUrl,
    nameSingular,
    tableFieldNames,
    ObjectsTableRow,
    isAuthenticated,
    isLoadingObjects,
    allObjects,
    totalCount,
    totalPages,
    useDeleteObjectMutation,
  } = useObjectsTable()
  return <Loader loaded={!isLoadingObjects}>
    <ObjectsTableHeader {...{totalCount}} />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <ObjectsTableFieldNames {...{tableFieldNames}} />
          {isAuthenticated &&
                            <th scope="col" colSpan={2}>
                              <LinkToNewOrEditObject {...{indexUrl}} />
                            </th>}
        </tr>
      </thead>
      <tbody>
        {allObjects?.map((object, key) =>
          <tr key={key} aria-label={nameSingular}>
            <ObjectsTableRow {...object} />
            {isAuthenticated && <>
                                  <td>
                                    <LinkToNewOrEditObject
                                      {...{indexUrl, object}} />
                                  </td>
                                  <td>
                                    <DeleteObjectButton
                                      {...{useDeleteObjectMutation, object}} />
                                  </td>
                                </>
            }
          </tr>
        )}
      </tbody>
    </Table>
    <Pagination {...{totalPages}} />
  </Loader>
}

ObjectsTable.propTypes = {
  useObjectsTable: PropTypes.func,
}

export default ObjectsTable
