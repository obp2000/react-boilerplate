'use client'

import Input from '@/formInput/Input'
import Header from './Header'
import { ReactNode } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Form } from 'reactstrap'

export default function Layout({
	children,
	...props
}: { children: ReactNode } & FormRenderProps) {
	return <Form onSubmit={props.handleSubmit}
		className="shadow p-3 mb-5 bg-body rounded">
		<Header {...props} />
		<Field name="id" hidden component={Input} />
		{children}
	</Form>
}
