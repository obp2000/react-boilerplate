import { FC } from 'react'
import { Card, CardBody, Row } from 'reactstrap'
// import Loader from 'react-loader'
import type { UserOptions } from '../../../interfaces/users'
import { userFieldNames } from './config'
import Header from './Header'
import { useUser } from './hooks'
import TableRow from './TableRow'

const UserComp: FC = () => {
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
