import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { validate } from './Validators'
import { calculator } from './Calculator'
import { onSubmitAction } from '../redux/ServerActions'
import { Actions } from '../redux/Products'
import ProductFormRender from './ProductFormRender'

const ProductForm = ({ onSubmitAction }) => {
    const loaded = useSelector(({
        products: {
            object
        },
        common_consts: {
            error_messages = {},
            options: {
                Consts = {}
            } = {},
        } = {}
    }) => ({
        object,
        error_messages,
        Consts
    }))
    const dispatch = useDispatch()
    return <Form name='product'
        validate={validate(loaded.error_messages)}
        onSubmit={onSubmitAction}
        decorators={[calculator]}
        initialValues={{...loaded.object, Consts: loaded.Consts}}
        render={ProductFormRender} />
}

ProductForm.propTypes = {
    onSubmitAction: PropTypes.func.isRequired
}

export default ProductForm