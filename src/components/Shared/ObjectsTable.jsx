import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'reactstrap'
import Loader from 'react-loader'
import Label from './Label'
import Pagination from '../Pagination/Pagination'
import ObjectsPageHeader from './ObjectsPageHeader'
import LinkToNew from './LinkToNew'
import DeleteButton from './DeleteButton'
import LinkToEdit from './LinkToEdit'
// import { selectTableLabels } from '../redux/CommonConsts'
import { selectIsFetching } from '../redux/TempState'

const ObjectsTable = ({
    selectTableLabels,
    selectTableValues,
    selectTotalCount,
    selectTotalPages,
    ...rest
}) => {
    const isFetching = useSelector(selectIsFetching)
    return <>
        <ObjectsPageHeader totalCount={useSelector(selectTotalCount)} />
        <Loader loaded={!isFetching} >
            <Table  size='sm'
                    bordered
                    striped
                    hover
                    className='table-secondary'
                    role="table">
                <thead className="thead-light">
                    <tr>
                        {useSelector(selectTableLabels).map((label, key) =>
                            <th scope="col" key={key}>
                                {label}
                            </th>
                        )}
                        <th scope="col" colSpan={2}>
                            <LinkToNew />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {useSelector(selectTableValues).map((object, key) =>
                        <tr key={key} role="row">
                            {Object.values(object).map((value, key) =>
                                <td scope="row" key={key}>
                                    {value}
                                </td>
                            )}
                            <td>
                                <LinkToEdit {...object} />
                            </td>
                            <td>
                                <DeleteButton {...object} {...rest} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Loader>
        <Pagination totalPages={useSelector(selectTotalPages)} />
    </>
}

ObjectsTable.propTypes = {
    table: PropTypes.string,
    fields: PropTypes.object,
    deleteObjectAction: PropTypes.func.isRequired
}

export default ObjectsTable