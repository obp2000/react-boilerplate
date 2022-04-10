import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import Loader from 'react-loader'
import { Form } from 'react-final-form'
import { validate } from './Validators'
import CustomerFormRender from './CustomerFormRender'
import { selectErrorMessages } from '../redux/CommonConsts'
import { selectObject } from '../redux/Customers'

const CustomerForm = ({
    onSubmitAction,
    isFetching
}) => <Loader loaded={!isFetching } >
        <Form   name='customer'
                validate={validate(useSelector(selectErrorMessages))}
                onSubmit={onSubmitAction}
                initialValues={useSelector(selectObject)}
                render={CustomerFormRender}
                />
    </Loader>

CustomerForm.propTypes = {
    onSubmitAction: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
}

export default CustomerForm
