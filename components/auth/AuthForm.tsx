'use client'

import RowFormGroup from '@/formInput/RowFormGroup'
import { LoginFormValues, RegisterFormValues } from '@/interfaces/auth'
import { CommonConstsType } from '@/interfaces/commonConsts'
import { AnyObjectOptionsType } from '@/interfaces/options'
import { authAction } from '@/services/api/client'
import { MainContext } from '@/services/context'
import SubmitButton from '@/submitButton/SubmitButton'
import { validate } from "@/validators/validators"
import { useRouter } from 'next/navigation'
import { Field, Form } from 'react-final-form'
import { Form as FormStrap } from 'reactstrap'
import { loginFormConfig, registerFormConfig } from './config'

export default function AuthForm({
	isLogin,
	commonConsts,
	options
}: { isLogin: boolean } & CommonConstsType & AnyObjectOptionsType) {
	// const { commonConsts } = useContext(MainContext)
	const {
		indexUrl,
		name,
		validatedFields,
		formFields
	} = isLogin ? loginFormConfig : registerFormConfig
	const { refresh } = useRouter()
	const onSubmit = (values: LoginFormValues | RegisterFormValues) =>
		authAction(values, indexUrl, refresh)
	return <Form {...{
		name,
		validate: validate({
			errorMessages: commonConsts?.error_messages,
			validatedFields
		}),
		onSubmit
	}}>
		{(props) => <MainContext.Provider value={{ commonConsts, options }}>
			<FormStrap onSubmit={props.handleSubmit}
				className='shadow p-3 mb-5 bg-body rounded'>
				{formFields.map((field, key) => <Field key={key} {...field}
					component={RowFormGroup} />)}
				<SubmitButton {...props} >
					{isLogin ? commonConsts?.login : commonConsts?.register}
				</SubmitButton>
			</FormStrap>
		</MainContext.Provider>}
	</Form>
}
