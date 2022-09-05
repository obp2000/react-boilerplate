import React from 'react'
import {
  Card,
  CardBody,
  Row,
} from 'reactstrap'
import Loader from 'react-loader'
import {userFieldNames} from './hooks'
import TableRow from './tableRow'
import Header from './Header'
import {User, UserOptions} from '../../../interfaces'

type Props = {
  object: User
  options: UserOptions
  loaded: boolean
}

const UserComp = (
  {object, options, loaded}: Props
): JSX.Element => <Loader loaded={loaded}>
  <Card>
    <CardBody>
      <Header options={options} />
      {userFieldNames.map((fieldName, key) => <Row key={key}>
        <TableRow {...{ object, options, fieldName }} />
      </Row>
      )}
    </CardBody>
  </Card>
</Loader>

export default UserComp
