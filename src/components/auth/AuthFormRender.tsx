import React from 'react'
import { Field } from 'react-final-form'
import type { FormRenderProps } from 'react-final-form'
import { Form } from 'reactstrap'
import RowFormGroup from '../formInput/RowFormGroup'
import SubmitButton from '../submitButton/SubmitButton'
import {
	LoginOptions,
	RegisterOptions,
} from '../../../interfaces/auth'
import { CommonConsts } from '../../../interfaces'
import type { FormFields } from './hooks'

type Props = FormRenderProps & {
	options?: LoginOptions & RegisterOptions
	commonConsts?: CommonConsts
	formFields?: FormFields[]
	submitButtonLabel?: string
}

const AuthFormRender = (props: Props): JSX.Element => {
	const options = { options: props.options }
	return <Form
		onSubmit={props.handleSubmit}
		className="shadow p-3 mb-5 bg-body rounded">
		{props.formFields?.map((field, key): JSX.Element => <Field
			key={key}
			{...field}
			component={RowFormGroup}
			{...options}
		/>)}
		<SubmitButton text={props.submitButtonLabel} {...props} />
	</Form>
}

export default AuthFormRender
