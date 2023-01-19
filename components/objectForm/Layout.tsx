'use client'

import Button from '@/client/Button'
import { useDisabled } from '@/submitButton/hooks'
import type { PropsWithChildren } from 'react'
import { FormRenderProps } from 'react-final-form'

export default function Layout({
	children,
	save,
	...props
}: PropsWithChildren & FormRenderProps & { save: string }) {
	return <div className="bg-white shadow-md rounded p-2 text-sm">
		<form onSubmit={props.handleSubmit}>
		{/*<Field name="id" hidden={true} component={Input} />*/}
		{children}
		<Button
			type='submit'
			size='sm'
			aria-labelledby={save}
			disabled={useDisabled(props)} >
			{save}
		</Button>
	</form>
	</div>
}
