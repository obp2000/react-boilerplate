import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { validate } from './Validators'
import { onSubmitAction } from '../redux/ServerActions'
import { Actions } from '../redux/Customers'
import CustomerFormRender from './CustomerFormRender'

const CustomerForm = () => {
    const loaded = useSelector(({
        customers: {
            object
        },
        auth: {
            accessToken
        },
        common_consts: {
            successfully = '',
            error_messages = {}
        } = {}
    }) => ({
        object,
        accessToken,
        successfully,
        error_messages
    }))
    const dispatch = useDispatch()
    return <Form
            name='customer'
            validate={validate(loaded.error_messages)}
            onSubmit={onSubmitAction(
                dispatch,
                Actions,
                loaded.accessToken,
                loaded.successfully)}
            initialValues={loaded.object}
            render={CustomerFormRender}
            />
}

export default CustomerForm