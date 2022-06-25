import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import {Navigate } from 'react-router-dom'
import Loader from 'react-loader'
import {Form} from 'react-final-form'
import {toastSuccess, toastError} from './Toast'

const CreateObjectForm = ({
    indexUrl: url,
    redirectUrl,
    decorators,
    mutators = {},
    ObjectFormRender,
    validate,
    formInitialValues,
    optionsTrigger,
    commonConsts,
    options,
    useCreateObjectMutation,
}) => {
    useEffect(() => {
        optionsTrigger(url, true)
    }, [url])
    const [createObject,
        {
            error,
            isLoading,
            isSuccess,
            isError,
        }
    ] = useCreateObjectMutation()
    if (isSuccess) {toastSuccess(commonConsts?.successfully)}
    if (isError) {toastError(error.detail)}
    return <Loader loaded={!isLoading}>
        {isSuccess && <Navigate to={url} />}
	    <Form name='objectForm'
	      validate={validate(commonConsts?.error_messages)}
	      onSubmit={(values) => createObject(values)}
	      initialValues={formInitialValues({}, options)}
	      decorators={decorators}
	      mutators={mutators}
	      render={ObjectFormRender}
	      {...{commonConsts, options}}
	    />
  	</Loader>
}

CreateObjectForm.propTypes = {
    indexUrl: PropTypes.string,
    redirectUrl: PropTypes.string,
    decorators: PropTypes.array,
    mutators: PropTypes.object,
    ObjectFormRender: PropTypes.func,
    validate: PropTypes.func,
    formInitialValues: PropTypes.func,
    optionsTrigger: PropTypes.func,
    commonConsts: PropTypes.object,
    options: PropTypes.object,
    useCreateObjectMutation: PropTypes.func,
}

export default CreateObjectForm