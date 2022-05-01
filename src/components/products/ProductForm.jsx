import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'
import Loader from 'react-loader'
import { Form } from 'react-final-form'
import { objectToFormData } from 'object-to-formdata'
import { toast } from 'react-toastify'
import createDecorator from 'final-form-submit-listener'
import { validate } from './Validators'
import { calculator } from './Calculator'
import ProductFormRender from './ProductFormRender'
import { config } from '../redux/Products'
import {
    useGetOptionsQuery,
    useGetObjectQuery,
    useCreateObjectMutation,
    useUpdateObjectMutation
} from '../../services/apiSlice'
import { selectAuth } from '../redux/auth'
import { Error } from '../Shared/Errors'
// import { selectErrorMessages } from '../redux/CommonConsts'
import { formInitialValues } from '../redux/Products'

const submitListener = createDecorator({
    beforeSubmit: form => {
        config.preSubmitAction(form.getState().values)
    }
})

const ProductForm = () => {
    const url = config.indexUrl
    const { isAuthenticated } = useSelector(selectAuth)
    const {
        data: {
            commonConsts,
            options
        } = {}
    } = useGetOptionsQuery(url)
    const { id } = useParams()
    const isNewObject = id == 'new'
    const {
        data: object = {},
        // isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = isNewObject ? {} : useGetObjectQuery({ url, id: parseInt(id) })
    const [
        createOrUpdateObject,
        {
            isLoading,
            data: updatedObject,
            isSuccess: isSuccessMutation
        }
    ] = isNewObject ? useCreateObjectMutation() : useUpdateObjectMutation()
    // if (isSuccessMutation) toast.success(commonConsts?.successfully)
    // if (isError) toast.error(error.data.detail)
    return <Loader loaded={!isFetching && !isLoading}>
        {isSuccessMutation && isNewObject && <Redirect to={config.redirectUrl} />}
        <Form name='product'
            validate={validate(commonConsts?.error_messages)}
            onSubmit={values => createOrUpdateObject({...values, url}).unwrap()
                        .then(() => {toast.dismiss()
                                     toast.success(commonConsts?.successfully)})
                        .catch(({ data }) => toast.error(data.detail, {autoClose: false}))
                    }
            decorators={[calculator, submitListener]}
            initialValues={formInitialValues(object, options)}
            render={ProductFormRender}
            {...{...commonConsts, isSuccessMutation, options}}
        />
    </Loader>
}

ProductForm.propTypes = {
    // onSubmitAction: PropTypes.func.isRequired,
    // isFetching: PropTypes.bool
}

export default ProductForm
