import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import Loader from 'react-loader'
import {Form} from 'react-final-form'
import {toastSuccess, toastError} from './Toast'

const ObjectForm = ({
  object = {},
  indexUrl: url,
  decorators,
  mutators = {},
  ObjectFormRender,
  validate,
  formInitialValues,
  optionsTrigger,
  commonConsts,
  options,
  useObjectMutation,
}) => {
  useEffect(() => {
    optionsTrigger(url, true)
  }, [url])
  const [mutateObject,
    	{error, isLoading, isSuccess, isError}] = useObjectMutation()
  if (isSuccess) {toastSuccess(commonConsts?.successfully)}
  if (isError) {toastError(error.detail)}
  return <Loader loaded={!isLoading}>
	{isSuccess && <Navigate to={url} />}
    <Form name='objectForm'
      validate={validate(commonConsts?.error_messages)}
      onSubmit={(values) => mutateObject(values)}
      initialValues={formInitialValues(object, options)}
      decorators={decorators}
      mutators={mutators}
      render={ObjectFormRender}
      {...{commonConsts, options}}
    />
  </Loader>
}

ObjectForm.propTypes = {
  object: PropTypes.object,
  indexUrl: PropTypes.string,
  decorators: PropTypes.array,
  mutators: PropTypes.object,
  ObjectFormRender: PropTypes.func,
  validate: PropTypes.func,
  formInitialValues: PropTypes.func,
  optionsTrigger: PropTypes.func,
  commonConsts: PropTypes.object,
  options: PropTypes.object,
  useObjectMutation: PropTypes.func,
}

export default ObjectForm