import PropTypes from 'prop-types'
import React from 'react'
import {Table, Button} from 'reactstrap'
import OrderItem from './OrderItem'
import { addOrderItemAction } from '../redux/Orders'

const OrderItems = ({
    fields
}) =>   <>
            <thead>
                <tr>
                    <th scope='col'>№ п/п</th>
                    <th scope='col'>Наименование</th>
                    <th scope='col'>Цена, руб.</th>
                    <th scope='col'>Метраж</th>
                    <th scope='col'>Стоимость, руб.</th>
                    <th scope='col'>Вес, гр.</th>
                    <th scope='col'>
                        <Button size='sm' outline onClick={addOrderItemAction(fields)}>
                            Добавить
                        </Button>
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
