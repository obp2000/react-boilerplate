import 'server-only'

import Col from '@/client/Col'
import type {
  TableRowType,
  User,
  UserOptionsType,
  UserType
} from '@/interfaces/users'

export default function TableRow({
  fieldName,
  options,
  user
}: TableRowType & UserOptionsType & UserType) {
  return <>
    <Col sm={2}>
      {options && options[fieldName as keyof User]?.label}
    </Col>
    <Col sm={8}>
      {user && user[fieldName as keyof User]}
    </Col>
  </>
}
