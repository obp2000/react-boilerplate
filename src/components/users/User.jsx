import React from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from 'reactstrap'
import {useRouter} from 'next/dist/client/router'
import {useUserForm} from './hooks'

const User = () => {
  const {
    isFetchingOptions,
    isLoadingUser,
    nameSingular,
    tableData,
    isAuthenticated,
  } = useUserForm()
  const router = useRouter()
  if (!isAuthenticated) {
    router.push('/', undefined, {shallow: true})
  }
  return <Card>
    <CardBody>
      <CardTitle>
        <h3>{nameSingular}</h3>
      </CardTitle>
      {tableData.map((dataRow, key) =>
        <Row key={key}>
          <Col sm={2}>{dataRow.label}</Col>
          <Col sm={8}>{dataRow.value}</Col>
        </Row>
      )}
    </CardBody>
  </Card>
}

export default User
