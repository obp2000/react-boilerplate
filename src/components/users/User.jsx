import React from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col
} from 'reactstrap'
import Loader from 'react-loader'
import {useOutletContext, Navigate} from 'react-router-dom'
import {useUserForm} from './hooks'

const User = () => {
  const {isAuthenticated} = useOutletContext()
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  const {
    isFetchingOptions,
    isLoadingUser,
    nameSingular,
    tableData,
  } = useUserForm()
  return <Loader loaded={!isFetchingOptions && !isLoadingUser} >
    <Card>
      <CardBody>
        <CardTitle>
          <h3>{nameSingular}</h3>
        </CardTitle>
        {tableData.map((dataRow, key) =>
          <Row {...{key}}>
            <Col sm={2}>{dataRow.label}</Col>
            <Col sm={8}>{dataRow.value}</Col>
          </Row>
        )}
      </CardBody>
    </Card>
  </Loader>
}

export default User
