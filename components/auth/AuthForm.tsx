'use client'

import FormBootstrap from '@/client/FormBootstrap'
import RowFormGroup from '@/formInput/RowFormGroup'
import SubmitButton from '@/submitButton/SubmitButton'
import { Field, Form } from 'react-final-form'
import { loginFormConfig, registerFormConfig } from './config'
import { useForm, useSubmitButtom } from './hooks'

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
	const { formFields } = isLogin ? loginFormConfig : registerFormConfig
	return <Form {...useForm({ isLogin })}>
		{(props) => <FormBootstrap onSubmit={props.handleSubmit}
			className='shadow p-3 mb-5 bg-body rounded'>
			{formFields.map((field, key) => <Field key={key} {...field}
				component={RowFormGroup} />)}
			<SubmitButton {...props} {...useSubmitButtom({ isLogin })} />
		</FormBootstrap>}
	</Form>
}
