'use client'

import Col from '@/client/Col'
import Row from '@/client/Row'
import Input from '@/formInput/Input'
import SubmitButton from '@/submitButton/SubmitButton'
import { ReactNode } from 'react'
import FormBootstrap from '@/client/FormBootstrap'
import { Field, FormRenderProps } from 'react-final-form'

export default function Layout({
	children,
	...props
}: { children: ReactNode } & FormRenderProps) {
	return <FormBootstrap onSubmit={props.handleSubmit}
		className="shadow p-3 mb-5 bg-body rounded">
		<Field name="id" hidden component={Input} />
		{children}
		<Row>
			<Col sm={2}>
				<SubmitButton {...props} />
			</Col>
		</Row>
	</FormBootstrap>
}
