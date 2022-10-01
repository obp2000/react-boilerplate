import React from 'react'
import { Col } from 'reactstrap'
import { User, UserWithOptions } from '../../../interfaces'

type Props = UserWithOptions & {
	fieldName: string
}

const tableRow = ({ object, options, fieldName }: Props) => <>
	<Col sm={2}>
		{options && options[fieldName as keyof User]?.label}
	</Col>
	<Col sm={8}>
		{object && object[fieldName as keyof User]}
	</Col>
</>

export default tableRow
