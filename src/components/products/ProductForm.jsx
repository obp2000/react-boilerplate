import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import Loader from 'react-loader'
import { Form } from 'react-final-form'
import { validate } from './Validators'
import { calculator } from './Calculator'
import ProductFormRender from './ProductFormRender'
import { selectErrorMessages } from '../redux/CommonConsts'
import { selectFormInitialValues } from '../redux/Products'

const ProductForm = ({
    onSubmitAction,
    isFetching
}) => <Loader loaded={!isFetching }>
        <Form name='product'
            validate={validate(useSelector(selectErrorMessages))}
            onSubmit={onSubmitAction}
            decorators={[calculator]}
            initialValues={useSelector(selectFormInitialValues)}
            render={ProductFormRender}
            />
    </Loader>

ProductForm.propTypes = {
    onSubmitAction: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
}

export default ProductForm
