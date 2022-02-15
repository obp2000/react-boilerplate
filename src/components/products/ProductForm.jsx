import PropTypes from 'prop-types'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { validate } from './Validators'
import { calculator } from './Selectors'
import { onSubmitAction } from '../redux/ServerActions'
import { Actions } from '../redux/Products'
import ProductFormRender from './ProductFormRender'

const ProductForm = () => {
    const loaded = useSelector(({
        products: {
            object
        },
        auth: {
            accessToken
        },
    }) => ({
        object,
        accessToken
    }))
    const dispatch = useDispatch()
    return <Form name={'product'}
        validate={validate}
        onSubmit={onSubmitAction(dispatch, Actions, loaded.accessToken)}
        decorators={[calculator]}
        initialValues={loaded.object}
        render={ProductFormRender} />
}

export default ProductForm