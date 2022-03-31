import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { validate } from './Validators'
import { order_calculator } from './Selectors'
import { order_items_calculator } from '../order_items/Selectors'
import OrderFormRender from './OrderFormRender'

const OrderForm = ({ onSubmitAction }) => {
    const loaded = useSelector(({
        orders: {
            object
        },
        common_consts: {
            error_messages = {},
            options: {
                Consts = {},
                Consts: {
                    SAMPLES_WEIGHT,
                    PACKET_WEIGHT,
                    GIFT_WEIGHT,
                } = {},
                order_items_cost: {
                    label: order_items_cost_label
                } = {},
                need_gift: {
                    label: need_gift_label
                } = {}
            } = {},
        } = {}
    }) => ({
        Consts,
        SAMPLES_WEIGHT,
        PACKET_WEIGHT,
        GIFT_WEIGHT,
        order_items_cost_label,
        need_gift_label,
        object,
        error_messages
    }))
    return <Form
        name='order'
        validate={validate(loaded.error_messages)}
        onSubmit={onSubmitAction}
        mutators={{...arrayMutators}}
        decorators={[order_calculator, order_items_calculator]}
        initialValues={{...loaded.object,
                        Consts: loaded.Consts,
                        samples_weight: loaded.SAMPLES_WEIGHT,
                        packet_weight: loaded.PACKET_WEIGHT,
                        gift_weight: loaded.GIFT_WEIGHT,
                        order_items_cost_label: loaded.order_items_cost_label,
                        need_gift_label: loaded.need_gift_label
                      }}
        render={OrderFormRender} />
}

OrderForm.propTypes = {
    onSubmitAction: PropTypes.func.isRequired
}

export default OrderForm