import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { validate } from './Validators'
import { calculator } from './Calculator'
import { onSubmitAction } from '../redux/ServerActions'
import { Actions } from '../redux/Products'
import ProductFormRender from './ProductFormRender'

const ProductForm = () => {
    const loaded = useSelector(({
        products: {
            object: {
                options = {},
                options: {
                    Consts = {}
                } = {},
                ...object
            }
        },
        auth: {
            accessToken
        },
        common_consts: {
            successfully = '',
            error_messages = {}
        } = {}
    }) => ({
        options,
        Consts,
        object,
        accessToken,
        successfully,
        error_messages
    }))
    const dispatch = useDispatch()
    return <Form name='product'
        validate={validate(loaded.error_messages)}
        onSubmit={onSubmitAction(
            dispatch,
            Actions,
            loaded.accessToken,
            loaded.successfully)}
        decorators={[calculator]}
        initialValues={{...loaded.object, Consts: loaded.Consts}}
        render={ProductFormRender} />
}

export default ProductForm
