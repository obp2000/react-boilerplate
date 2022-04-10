import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import Loader from 'react-loader'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { validate } from './Validators'
import { order_calculator } from './Selectors'
import { order_items_calculator } from '../order_items/Selectors'
import OrderFormRender from './OrderFormRender'
import { selectFormInitialValues } from '../redux/Orders'

const OrderForm = ({
    onSubmitAction,
    object,
    common_consts = {},
    isFetching
}) => <Loader loaded={!isFetching } >
        <Form
            name='order'
            validate={validate(common_consts.error_messages)}
            onSubmit={onSubmitAction}
            mutators={{...arrayMutators}}
            decorators={[order_calculator, order_items_calculator]}
            // initialValues={{...object,
            //                 ...FormConsts(common_consts.options)
            //               }}
            initialValues={useSelector(selectFormInitialValues)}
            render={OrderFormRender}
            {...{object, common_consts}}
            />
    </Loader>

OrderForm.propTypes = {
    onSubmitAction: PropTypes.func.isRequired,
    object: PropTypes.object,
    common_consts: PropTypes.object,
    isFetching: PropTypes.bool
}

export default OrderForm