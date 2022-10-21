import { FC } from 'react'
import { Col } from 'reactstrap'
import type { TableRowType, User } from '../../../interfaces/users'

const TableRow: FC<TableRowType> = ({ object, options, fieldName }) => <>
  <Col sm={2}>
    {options && options[fieldName as keyof User]?.label}
  </Col>
  <Col sm={8}>
    {object && object[fieldName as keyof User]}
  </Col>
</>

export default TableRow
