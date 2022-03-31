import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { validate } from './Validators'
import CustomerFormRender from './CustomerFormRender'

const CustomerForm = ({ onSubmitAction }) => {
    const loaded = useSelector(({
        customers: {
            object
        },
        common_consts: {
            error_messages = {}
        } = {}
    }) => ({
        object,
        error_messages
    }))
    return <Form
            name='customer'
            validate={validate(loaded.error_messages)}
            onSubmit={onSubmitAction}
            initialValues={loaded.object}
            render={CustomerFormRender}
            />
}

CustomerForm.propTypes = {
    onSubmitAction: PropTypes.func.isRequired
}

export default CustomerForm