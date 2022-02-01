import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'reactstrap'
import Loader from 'react-loader'
import ProductRow from './ProductRow'
import Pagination from '../Pagination/Pagination'
import ObjectsPageHeader from '../Shared/ObjectsPageHeader'
import { deleteObjectAction } from '../redux/ServerActions'
import { Actions } from '../redux/Products'
import LinkToNew from '../Shared/LinkToNew'

const Products = props => {
    const loaded = useSelector(({
        products: {
            results = [],
            totalCount,
        },
        auth: {
            accessToken
        },
        temp_state: {
            isFetching
        }
    }) => ({
        results,
        totalCount,
        isFetching,
        accessToken
    }))
    const dispatch = useDispatch()
    const deleteObject = deleteObjectAction(dispatch, Actions, loaded.accessToken)
    return <>
            <ObjectsPageHeader title='Ткани' totalCount={loaded.totalCount} />
            <Loader loaded={!loaded.isFetching}>
            <Table size='sm' bordered striped hover className='table-secondary'>
                <thead className="thead-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Название</th>
                            <th scope="col">Цена, руб.</th>
                            <th scope="col">Ширина, см</th>
                            <th scope="col">Плотность</th>
                            {/* <th scope="col">Вес</th>
                            <th scope="col">Цена, $</th>
                            <th scope="col">Курс $</th>
                            <th scope="col">Себестоимость, руб./м</th> */}
                            <th scope="col">Создана</th>
                            <th scope="col">Изменена</th>
                            <th scope="col" colSpan={2}>
                                <LinkToNew {...props}/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loaded.results.map((product, key) => <ProductRow
                            {...{...product, deleteObject, key, ...props}} />)
                        }
                    </tbody>
                </Table>
            </Loader>
            <Pagination {...props} />
        </>
}

export default Products