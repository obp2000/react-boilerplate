import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader'
import Product from './Product'
import Pagination from '../Pagination/Pagination'
import SearchForm from '../Search/Containers/SearchForm'

const Products = ({results, 
                   totalCount, 
                   totalPages, 
                   search, 
                   page,
                   isFetching, 
                   deleteProductAction}) => <Loader loaded={!isFetching}>
            <div>
                <div className="row">
                    <div className="col-sm-7">
                        <h3>Ткани ({totalCount})</h3>
                    </div>
                    <div className="col-sm-5">
                        <SearchForm table='products'/>
                    </div>
                </div>
                <table className="table table-sm table-striped table-bordered table-hover">
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
                            <th scope="col">
                                <Link to='/products/new' className="btn btn-outline-primary btn-sm">Новая</Link>
                            </th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((product, index) => <Product {...product} key={index} deleteProductAction={deleteProductAction} />)}
                    </tbody>
                </table>
                <Pagination {...{table: 'products', totalPages, page, search}} />
            </div>
        </Loader>

Products.propTypes = {
    results: PropTypes.array.isRequired,
    totalCount: PropTypes.number,
    totalPages: PropTypes.number,
    search: PropTypes.string,
    page: PropTypes.number,
    isFetching: PropTypes.bool,
    deleteProductAction: PropTypes.func
}

Products.defaultProps = {
    results: []
}

export default Products