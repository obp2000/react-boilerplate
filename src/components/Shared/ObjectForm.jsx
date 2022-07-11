import PropTypes from 'prop-types'
import React from 'react'
import {Navigate, useOutletContext} from 'react-router-dom'
import Loader from 'react-loader'
import {Form} from 'react-final-form'
import {toastSuccess, toastError} from './Toast'
import {useOptionsTrigger} from '../options/hooks'

const emptyObject = {}

const ObjectForm = ({object}) => {
  const {
    indexUrl,
    decorators,
    mutators = emptyObject,
    ObjectFormRender,
    validate,
    formInitialValues,
    useCreateObjectMutation,
    useUpdateObjectMutation,
    commonConsts,
    options,
  } = useOutletContext()
  useOptionsTrigger(indexUrl)
  const [ mutateObject,
          {error, isLoading, isSuccess, isError}
        ] = object ? useUpdateObjectMutation() : useCreateObjectMutation()
  if (isSuccess) {toastSuccess(commonConsts?.successfully)}
  if (isError) {toastError(error.detail)}
  return <Loader loaded={!isLoading}>
  	{isSuccess && <Navigate to={indexUrl} />}
      <Form name='objectForm'
        validate={validate(commonConsts?.error_messages)}
        onSubmit={(values) => mutateObject(values)}
        initialValues={formInitialValues(object, options)}
        decorators={decorators}
        mutators={mutators}
        render={ObjectFormRender}
        {...{object}}
      />
    </Loader>
}

ObjectForm.propTypes = {
  object: PropTypes.object,
}

export default ObjectForm