import PropTypes from 'prop-types'
import React from 'react'
import {useSelector} from 'react-redux'
import {Table, Row, Col, Badge, Button} from 'reactstrap'
import {selectAuth} from '../auth/selectors'
import Pagination from '../Pagination/Pagination'
import FieldLabels from './FieldLabels'
import DeleteObjectButton from '../deleteObjectButton/DeleteObjectButton'
import Header from './Header'
import LinkToNewOrEditObject from
  '../linkToNewOrEditObject/LinkToNewOrEditObject'
import FieldValues from './FieldValues'

const ObjectsTable = ({
  busyLoadingObjects,
  allObjects,
  ...props
}) => {
  const {isAuthenticated} = useSelector(selectAuth)
  // if (busyLoadingObjects) {return <Loader />}
  return <>
    <Header {...props} />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <FieldLabels {...props} />
          {allObjects?.slice(0, 1).map((object, key) =>
            <>
              {isAuthenticated &&
                <th scope="col" colSpan={2}>
                  <LinkToNewOrEditObject {...props} />
                </th>
              }
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {allObjects?.map((object, key) =>
          <tr key={key} aria-label={props.options?.name_singular}>
            <FieldValues {...{object}} {...props} />
            {isAuthenticated && <>
              <td>
                <LinkToNewOrEditObject {...{object}} {...props} />
              </td>
              <td>
                <DeleteObjectButton {...{object}} {...props} />
              </td>
            </>}
          </tr>
        )}
      </tbody>
    </Table>
    <Pagination {...props} />
  </>
}

ObjectsTable.propTypes = {
  isLoadingObjects: PropTypes.bool,
  allObjects: PropTypes.array,
  props: PropTypes.object,
}


export default ObjectsTable
