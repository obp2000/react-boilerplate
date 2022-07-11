import PropTypes from 'prop-types'
import React from 'react'
import {useSelector} from 'react-redux'
import {Link, useOutletContext} from 'react-router-dom'
import {Table} from 'reactstrap'
import Loader from 'react-loader'
import Pagination from '../Pagination/Pagination'
import {selectAuth} from '../auth/selectors'
import {useObjects} from '../../services/entityAdapter'
import {useOptionsTrigger} from '../options/hooks'
import DeleteObjectButton from './DeleteObjectButton'
import {getOptions} from '../options/optionsApi'
import ObjectsTableHeader from '../Shared/ObjectsTableHeader'
import ObjectsTableFieldNames from '../Shared/ObjectsTableFieldNames'
import ObjectsTableFieldValues from '../Shared/ObjectsTableFieldValues'
import LinkToNewOrEditObject from '../Shared/LinkToNewOrEditObject'

const ObjectsTable = () => {
  const {indexUrl, getObjects, options} = useOutletContext()
  useOptionsTrigger(indexUrl)
  const {isLoading, allObjects} = useObjects(getObjects)
  // const busy = isLoading || deleteStatus.isLoading
  const {isAuthenticated} = useSelector(selectAuth)
  return <Loader loaded={!isLoading}>
    <ObjectsTableHeader />
    <Table size='sm' bordered striped hover className='table-secondary'>
      <thead className="thead-light">
        <tr>
          <ObjectsTableFieldNames />
          {isAuthenticated &&
                            <th scope="col" colSpan={2}>
                              <LinkToNewOrEditObject />
                            </th>}
        </tr>
      </thead>
      <tbody>
        {allObjects?.map((object, key) =>
          <tr key={key} aria-label={options?.name_singular}>
            <ObjectsTableFieldValues {...{object}} />
            {isAuthenticated && <>
                                  <td>
                                    <LinkToNewOrEditObject {...{object}} />
                                  </td>
                                  <td>
                                    <DeleteObjectButton {...{object}} />
                                  </td>
                                </>
            }
          </tr>,
        )}
      </tbody>
    </Table>
    <Pagination />
  </Loader>
}

export default ObjectsTable
