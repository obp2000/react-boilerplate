import React from 'react'
import {useParams, Navigate} from 'react-router-dom'
import Loader from 'react-loader'
import {Form} from 'react-final-form'
import {toast} from 'react-toastify'
import createDecorator from 'final-form-submit-listener'
import {validate} from './Validators'
import {calculator} from './Calculator'
import ProductFormRender from './ProductFormRender'
import {config} from '../redux/Products'
import {
  useGetOptionsQuery,
  useGetObjectQuery,
  useCreateObjectMutation,
  useUpdateObjectMutation,
} from '../../services/apiSlice'
// import { selectErrorMessages } from '../redux/CommonConsts'
import {formInitialValues} from '../redux/Products'

const submitListener = createDecorator({
  beforeSubmit: (form) => {
    config.preSubmitAction(form.getState().values)
  },
})

const ProductForm = () => {
  const url = config.indexUrl
  const {
    data: {
      commonConsts,
      options,
    } = {},
    isFetching: isOptionsFetching,
  } = useGetOptionsQuery(url)
  const {id} = useParams()
  const isNewObject = id == 'new'
  const {
    data: object = {},
    isFetching: isObjectFetching,
    // isLoading,
    // isSuccess,
    // isError,
    // error
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
    {/*{isSuccessMutation && <Navigate to={config.redirectUrl} />}*/}
    <Form name='product'
      validate={validate(commonConsts?.error_messages)}
      // onSubmit={values => createOrUpdateObject({...values, url}).unwrap()
      //             .then(() => {toast.dismiss()
      //                          toast.success(commonConsts?.successfully)})
      //             .catch(({ data }) =>
      // toast.error(data.detail, {autoClose: false}))
      //         }
      onSubmit={(values) => createOrUpdateObject({...values, url})}
      decorators={[calculator, submitListener]}
      initialValues={formInitialValues(object, options)}
      render={ProductFormRender}
      {...{...commonConsts, options}}
    />
  </Loader>
}

export default ProductForm
