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
        }
    }) => ({
        object,
        accessToken
    }))
    const dispatch = useDispatch()
    return <Form
            name='customer'
            validate={validate}
            onSubmit={onSubmitAction(dispatch, Actions, loaded.accessToken)}
            initialValues={loaded.object}
            render={CustomerFormRender}
            />
}

export default CustomerForm