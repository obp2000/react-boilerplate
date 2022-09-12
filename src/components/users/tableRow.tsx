import React from 'react'
import { Col } from 'reactstrap'
import { User, UserOptions } from '../../../interfaces'

type Props = {
	object: User
	options?: UserOptions
	fieldName: string
}

const tableRow = ({ object, options, fieldName }: Props) => {
	return <>
		<Col sm={2}>
			{options && options[fieldName as keyof User]?.label}
		</Col>
		<Col sm={8}>
			{object[fieldName as keyof User]}
		</Col>
	</>
}

export default tableRow
