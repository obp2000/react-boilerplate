import PropTypes from 'prop-types'
import React from 'react'
import {Table} from 'reactstrap'
import OrderItem from './Containers/OrderItem'
import {
    initOrderItem
} from '../redux/Orders'

const OrderItems = ({
    fields
}) =>   <>
            <thead className="thead-light">
                <tr className="d-flex">
                    <th scope="col" className="col-1">№ п/п</th>
                    <th scope="col" className="col-6">Наименование</th>
                    <th scope="col" className="col-1">Цена, руб.</th>
                    <th scope="col" className="col-1">Метраж</th>
                    <th scope="col" className="col-1">Стоимость, руб.</th>
                    <th scope="col" className="col-1">Вес, гр.</th>
                    <th scope="col" className="col-1">
                        <button onClick={() => fields.push(initOrderItem)}
                                type="button"
                                className="btn btn-outline-primary btn-sm">
                            Добавить
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {fields.map((order_item_name, index) => 
                    <OrderItem key={index} {...{order_item_name, fields, index}}/>)}
            </tbody>
        </>

OrderItems.propTypes = {
    fields: PropTypes.object
}

OrderItems.defaultProps = {
    fields: {}
}

export default OrderItems
