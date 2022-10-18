import React from 'react'
import { Card, CardBody, Row } from 'reactstrap'
// import Loader from 'react-loader'
import { userFieldNames } from './config'
import { useUser } from './hooks'
import TableRow from './TableRow'
import Header from './Header'
import type { UserOptions } from '../../../interfaces/users'

const UserComp = () => {
  const { object, options } = useUser()
  // {<Loader loaded={loaded}>
  return <Card>
    <CardBody>
      <Header options={options as UserOptions} />
      {userFieldNames.map((fieldName, key) => <Row key={key}>
        <TableRow {...{ object, fieldName }} options={options as UserOptions} />
      </Row>
      )}
    </CardBody>
  </Card>
}

export default UserComp
