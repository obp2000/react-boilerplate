import PropTypes from 'prop-types'
import React from 'react'
import {useParams, Navigate} from 'react-router-dom'
import Loader from 'react-loader'
import {Form} from 'react-final-form'
import {toast} from 'react-toastify'
import createDecorator from 'final-form-submit-listener'
// import {validate} from './Validators'
// import CustomerFormRender from './CustomerFormRender'
// import {config} from '../redux/Customers'
import {
  useGetOptionsQuery,
  useGetObjectQuery,
  useCreateObjectMutation,
  useUpdateObjectMutation,
} from '../../services/apiSlice'
// import { apiSlice } from '../../services/apiSlice'

const ObjectForm = ({
  id,
  indexUrl: url,
  redirectUrl,
  decorators,
  ObjectFormRender,
  validate,
  formInitialValues,
}) => {
  // const {pathname} = useLocation()
  // console.log('pathname ', pathname)
  // const url = config.indexUrl
  const {
    data: {
      commonConsts,
      options,
    } = {},
    isFetching: isOptionsFetching,
    // isError: isOptionsError,
    // error: optionsError
  } = useGetOptionsQuery(url)
  // const {id} = useParams()
  const isNewObject = id == 'new'
  const {
    data: object = {},
    // isLoading,
    isFetching: isObjectFetching,
    isSuccess: isSuccessFetchingObject,
    isError: isErrorFetchingObject,
    error: objectFetchingError
  } = isNewObject ? {isSuccess: true} : useGetObjectQuery({url, id: parseInt(id)})
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
    {/*{(isErrorFetchingObject || isSuccessMutation) && <Navigate to={redirectUrl} />}*/}
    {/*{isErrorFetchingObject && <Navigate to={-1} />}*/}
    {/*{!isNewObject && isErrorFetchingObject && <Navigate to='/' />}*/}
    <Form name='objectForm'
      validate={validate(commonConsts?.error_messages)}
      // onSubmit={values => createOrUpdateObject({...values, url}).unwrap()
      //             .then(() => {toast.dismiss()
      //                          toast.success(commonConsts?.successfully)})
      //             .catch(({ data }) =>
      //    toast.error(data.detail, {autoClose: false}))
      //         }
      onSubmit={(values) => createOrUpdateObject({...values, url})}
      initialValues={object}
      initialValues={formInitialValues(object, options)}
      decorators={decorators}
      render={ObjectFormRender}
      {...{...commonConsts, options}}
    />
  </Loader>
}

ObjectForm.propTypes = {
  id: PropTypes.string,
  indexUrl: PropTypes.string,
  redirectUrl: PropTypes.string,
  decorators: PropTypes.array,
  ObjectFormRender: PropTypes.func,
  validate: PropTypes.func,
  formInitialValues: PropTypes.func,
}

export default ObjectForm
