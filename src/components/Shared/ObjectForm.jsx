import PropTypes from 'prop-types'
import React from 'react'
import {Navigate} from 'react-router-dom'
import Loader from 'react-loader'
import {Form} from 'react-final-form'
import {toast} from 'react-toastify'
import {
  useGetOptionsQuery,
  useGetObjectQuery,
  useCreateObjectMutation,
  useUpdateObjectMutation,
} from '../../services/apiSlice'
import NotFound from '../NotFound'

const ObjectForm = ({
  id,
  indexUrl: url,
  redirectUrl,
  decorators,
  mutators = {},
  ObjectFormRender,
  validate,
  formInitialValues,
}) => {
  const {
    data: {
      commonConsts = {},
      options = {},
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
    // isSuccess: isSuccessFetchingObject,
    isError: isErrorFetchingObject,
    // error: objectFetchingError,
  } = isNewObject ?
    {isSuccess: true} :
    useGetObjectQuery({url, id: parseInt(id)})
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
  if (isErrorFetchingObject) {
    return <NotFound />
  }
  return <Loader loaded={!busy}>
    {isSuccessMutation && <Navigate to={redirectUrl} />}
    {/* {isErrorFetchingObject && <Navigate to={-1} />}*/}
    {/* {!isNewObject && isErrorFetchingObject && <Navigate to='/' />}*/}
    <Form name='objectForm'
      validate={validate(commonConsts?.error_messages)}
      // onSubmit={values => createOrUpdateObject({...values, url}).unwrap()
      //             .then(() => {toast.dismiss()
      //                          toast.success(commonConsts?.successfully)})
      //             .catch(({ data }) =>
      //    toast.error(data.detail, {autoClose: false}))
      //         }
      onSubmit={(values) => createOrUpdateObject({...values, url})}
      initialValues={formInitialValues(object, options)}
      decorators={decorators}
      mutators={mutators}
      render={ObjectFormRender}
      {...{commonConsts, options}}
    />
  </Loader>
}

ObjectForm.propTypes = {
  id: PropTypes.string,
  indexUrl: PropTypes.string,
  redirectUrl: PropTypes.string,
  decorators: PropTypes.array,
  mutators: PropTypes.object,
  ObjectFormRender: PropTypes.func,
  validate: PropTypes.func,
  formInitialValues: PropTypes.func,
}

export default ObjectForm
