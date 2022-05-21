import React from 'react'
import {useParams, Navigate} from 'react-router-dom'
import Loader from 'react-loader'
import {Form} from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {toast} from 'react-toastify'
import createDecorator from 'final-form-submit-listener'
import {validate} from './Validators'
import {orderCalculator} from './Calculator'
import {orderItemsCalculator} from '../order_items/Calculator'
import OrderFormRender from './OrderFormRender'
import {formInitialValues} from '../redux/Orders'
import {config} from '../redux/Orders'
import {
  useGetOptionsQuery,
  useGetObjectQuery,
  useCreateObjectMutation,
  useUpdateObjectMutation,
} from '../../services/apiSlice'

const submitListener = createDecorator({
  beforeSubmit: (form) => {
    // console.log('form ', form.getState().values)
    config.preSubmitAction(form.getState().values)
  },
})

const OrderForm = () => {
  const url = config.indexUrl
  const {
    data: {
      commonConsts,
      options = {},
    } = {},
    isFetching: isOptionsFetching,
  } = useGetOptionsQuery(url)
  const {id} = useParams()
  const isNewObject = id == 'new'
  const {
    data: object = {},
    isFetching: isObjectFetching,
    // isLoading,
    // isFetching,
    // isSuccess,
    // isError,
    // error,
  } = isNewObject ? {} : useGetObjectQuery({url, id: parseInt(id)})
  const [
    createOrUpdateObject,
    {
      isLoading: isMutating,
      // data: updatedObject,
      isSuccess: isSuccessMutation,
      isError: isErrorMutation,
      error: mutationError,
    },
  ] = isNewObject ? useCreateObjectMutation() : useUpdateObjectMutation()
  const busy = isOptionsFetching || isObjectFetching || isMutating
  if (!busy && isSuccessMutation) {
    toast.dismiss()
    toast.success(commonConsts?.successfully)
  }
  if (!busy && isErrorMutation) {
    toast.dismiss()
    toast.error(mutationError.detail, {autoClose: false})
  }
  return <Loader loaded={!busy}>
    {isSuccessMutation && <Navigate to={config.redirectUrl} />}
    <Form
      name='order'
      validate={validate(commonConsts?.error_messages)}
      // onSubmit={(values) => createOrUpdateObject({...values, url}).unwrap()
      //     .then(() => {
      //       toast.dismiss()
      //       toast.success(commonConsts?.successfully)
      //     })
      //     .catch(({data}) => toast.error(data.detail, {autoClose: false}))
      // }
      onSubmit={(values) => createOrUpdateObject({...values, url})}
      mutators={{...arrayMutators}}
      decorators={[orderCalculator, orderItemsCalculator, submitListener]}
      initialValues={formInitialValues(object, options)}
      render={OrderFormRender}
      {...{commonConsts, options}}
    />
  </Loader>
}

export default OrderForm
