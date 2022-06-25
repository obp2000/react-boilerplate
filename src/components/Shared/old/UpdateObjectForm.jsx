import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import Loader from 'react-loader'
import {Form} from 'react-final-form'
import {toastSuccess, toastError} from './Toast'

const UpdateObjectForm = ({
  object,
  indexUrl: url,
  decorators,
  mutators = {},
  ObjectFormRender,
  validate,
  formInitialValues,
  optionsTrigger,
  commonConsts,
  options,
  useUpdateObjectMutation,
}) => {
  useEffect(() => {
    optionsTrigger(url, true)
  }, [url])
  const [updateObject,
    	{error, isLoading, isSuccess, isError}] = useUpdateObjectMutation()
  if (isSuccess) {toastSuccess(commonConsts?.successfully)}
  if (isError) {toastError(error.detail)}
  return <Loader loaded={!isLoading}>
	{isSuccess && <Navigate to={url} />}
    <Form name='objectForm'
      validate={validate(commonConsts?.error_messages)}
      onSubmit={(values) => updateObject(values)}
      initialValues={formInitialValues(object, options)}
      decorators={decorators}
      mutators={mutators}
      render={ObjectFormRender}
      {...{commonConsts, options}}
    />
  </Loader>
}

UpdateObjectForm.propTypes = {
  id: PropTypes.string,
  indexUrl: PropTypes.string,
  decorators: PropTypes.array,
  mutators: PropTypes.object,
  ObjectFormRender: PropTypes.func,
  validate: PropTypes.func,
  formInitialValues: PropTypes.func,
  optionsTrigger: PropTypes.func,
  commonConsts: PropTypes.object,
  options: PropTypes.object,
  useUpdateObjectMutation: PropTypes.func,
}

export default UpdateObjectForm
