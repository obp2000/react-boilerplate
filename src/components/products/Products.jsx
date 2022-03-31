import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'reactstrap'
import Label from '../Shared/Label'
import DeleteButton from '../Shared/DeleteButton'
import LinkToEdit from '../Shared/LinkToEdit'
import TableData from './TableData'
import Pagination from '../Pagination/Pagination'
import ObjectsPageHeader from '../Shared/ObjectsPageHeader'
import LinkToNew from '../Shared/LinkToNew'
import Loader from '../Shared/Loader'

const Products = props => {
    const loaded = useSelector(({
        products: objects = {},
        common_consts
    }) => ({
        objects,
        common_consts
    }))
     return <>
        <ObjectsPageHeader {...loaded.objects} {...loaded.common_consts} />
        <Loader loaded={!loaded.isFetching} >
            <Table size='sm' bordered striped hover className='table-secondary'>
                    <thead className="thead-light">
                        <tr>
                            {Object.keys(TableData).map((name, key) =>
                                <th scope="col" key={key}>
                                    <Label {...{name}}
                                           {...loaded.common_consts}
                                           required={false} />
                                </th>
                            )}
                            <th scope="col" colSpan={2}>
                                <LinkToNew {...loaded.common_consts}/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loaded.objects.results.map((object, key) =>
                            <tr key={key}>
                                {Object.values(TableData).map((value, key) =>
                                    <td scope="row" key={key}>
                                        {value(object, loaded.common_consts)}
                                    </td>
                                )}
                                <td>
                                    <LinkToEdit {...object}
                                                {...loaded.common_consts} />
                                </td>
                                <td>
                                    <DeleteButton {...object} {...props}
                                                  {...loaded.common_consts} />
                                </td>
                            </tr>
                        )}
                    </tbody>
            </Table>
        </Loader>
        <Pagination {...loaded.objects} />
    </>
}

export default Products