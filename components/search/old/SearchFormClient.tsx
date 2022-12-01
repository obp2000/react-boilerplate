'use client'

import Input from '@/formInput/Input'
import { CommonConstsType } from '@/interfaces/commonConsts'
import SubmitButton from '@/submitButton/SubmitButton'
import { useSearchParams } from 'next/navigation'
import { Field, Form } from 'react-final-form'
import { Form as FormStrap } from 'reactstrap'
import { useOnSubmit } from './hooks'

export default function SearchForm({ commonConsts }: CommonConstsType) {
	return <Form name='search'
		initialValues={{ term: useSearchParams().get('term') }}
		onSubmit={useOnSubmit()}>
		{(props) => <FormStrap onSubmit={props.handleSubmit}
			inline='true'
			className='d-flex mt-1'>
			<Field
				name='term'
				type="search"
				placeholder={commonConsts?.search}
				className="me-2"
				component={Input}
			/>
			<SubmitButton className='btn-outline-light' {...props}>
				{commonConsts?.search}
			</SubmitButton>
		</FormStrap>}
	</Form>
}
