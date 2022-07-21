import PropTypes from 'prop-types'
import React from 'react'
// import {useOutletContext} from 'react-router-dom'
import {Table, Row, Col, Badge, Button} from 'reactstrap'
import Loader from 'react-loader'
import Pagination from '../Pagination/Pagination'
// import {useObjects} from '../../services/entityAdapter'
import FieldLabels from './FieldLabels'
import DeleteObjectButton from '../deleteObjectButton/DeleteObjectButton'
import Header from './Header'
import LinkToNewOrEditObject from
  '../linkToNewOrEditObject/LinkToNewOrEditObject'
// import {useObjectsTable} from './hooks'
// import {useCustomersTable} from '../customers/hooks'
import FieldValues from './FieldValues'

const ObjectsTable = ({useObjectsTable}) => {
  const {
    indexUrl,
    nameSingular,
    tableFieldNames,
    useTableFieldValues,
    isAuthenticated,
    isLoadingObjects,
    allObjects,
    totalCount,
    totalPages,
    useDeleteObjectMutation,
  } = useObjectsTable()
  return <Loader loaded={!isLoadingObjects}>
    <Header {...{totalCount}} />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <FieldLabels {...{tableFieldNames}} />
          {isAuthenticated &&
                            <th scope="col" colSpan={2}>
                              <LinkToNewOrEditObject {...{indexUrl}} />
                            </th>}
        </tr>
      </thead>
      <tbody>
        {allObjects?.map((object, key) =>
          <tr key={key} aria-label={nameSingular}>

            <FieldValues {...{useTableFieldValues, object}} />

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
