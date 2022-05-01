import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'
import Loader from 'react-loader'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { toast } from 'react-toastify'
import createDecorator from 'final-form-submit-listener'
import { validate } from './Validators'
import { order_calculator } from './Calculator'
import { order_items_calculator } from '../order_items/Calculator'
import OrderFormRender from './OrderFormRender'
import { formInitialValues } from '../redux/Orders'
import { config } from '../redux/Orders'
import {
    useGetOptionsQuery,
    useGetObjectQuery,
    useCreateObjectMutation,
    useUpdateObjectMutation
} from '../../services/apiSlice'
import { selectAuth } from '../redux/auth'
import { Error } from '../Shared/Errors'

const submitListener = createDecorator({
    beforeSubmit: form => {
        // console.log('form ', form.getState().values)
        config.preSubmitAction(form.getState().values)
    }
})

const OrderForm = () => {
    const url = config.indexUrl
    const { isAuthenticated } = useSelector(selectAuth)
    const {
        data: {
            commonConsts,
            options = {}
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
    return <Loader loaded={!isFetching && !isLoading}>
        {isSuccessMutation && isNewObject && <Redirect to={config.redirectUrl} />}
        <Form
            name='order'
            validate={validate(commonConsts?.error_messages)}
            onSubmit={values => createOrUpdateObject({...values, url}).unwrap()
                        .then(() => {toast.dismiss()
                                     toast.success(commonConsts?.successfully)})
                        .catch(({ data }) => toast.error(data.detail, {autoClose: false}))
                    }
            mutators={{...arrayMutators}}
            decorators={[order_calculator, order_items_calculator, submitListener]}
            initialValues={formInitialValues(object, options)}
            render={OrderFormRender}
            {...{commonConsts, isSuccessMutation, options}}
            />
    </Loader>
}

OrderForm.propTypes = {
    // onSubmitAction: PropTypes.func.isRequired,
    // object: PropTypes.object,
    // commonConsts: PropTypes.object,
    // isFetching: PropTypes.bool
}

export default OrderForm
