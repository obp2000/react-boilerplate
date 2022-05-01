import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'react-final-form'
import { Form } from 'reactstrap'
import Loader from 'react-loader'
import RowFormGroup from '../Shared/RowFormGroup'
import Errors from '../Shared/Errors'
import SubmitButton from '../Shared/SubmitButton'

const RegisterFormRender = ({
    options,
    handleSubmit,
    isLoadingRegister,
    // hasSubmitErrors,
    register,
    // isErrorRegister,
    // registerError,
    ...props
}) => {
    // const options = { options: useSelector(selectOptions) }
        return <Loader loaded={!isLoadingRegister}>
                <Form    onSubmit={handleSubmit}
                            className="shadow p-3 mb-5 bg-body rounded">
                {/*{isErrorRegister && <Errors submitError={registerError.data.non_field_errors} />}*/}
                <Field  name="username"
                        {...{options}}
                        component={RowFormGroup} />
                <Field  name="email"
                        type='email'
                        {...{options}}
                        component={RowFormGroup} />
                <Field  name="first_name"
                        {...{options}}
                        component={RowFormGroup} />
                <Field  name="last_name"
                        {...{options}}
                        component={RowFormGroup} />
                <Field  name="password1"
                        type='password'
                        {...{options}}
                        component={RowFormGroup} />
                <Field  name="password2"
                        type='password'
                        {...{options}}
                        component={RowFormGroup} />
                 <SubmitButton text={register} {...props} />
            </Form>
        </Loader>
}

RegisterFormRender.propTypes = {
    handleSubmit: PropTypes.func,
    // hasSubmitErrors: PropTypes.func,
    // submitError: PropTypes.object,
}

export default RegisterFormRender
