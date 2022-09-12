import React from 'react'
import {
  Card,
  CardBody,
  Row,
} from 'reactstrap'
// import Loader from 'react-loader'
import {useUser, userFieldNames} from './hooks'
import TableRow from './tableRow'
import Header from './Header'
import {User, UserOptions} from '../../../interfaces'

type Props = {
  object: User
  options?: UserOptions
  loaded: boolean
}

const UserComp = (): JSX.Element => {
  const {object, options, loaded}: Props = useUser()
// {<Loader loaded={loaded}>
  return <Card>
    <CardBody>
      <Header {...{options}} />
      {userFieldNames.map((fieldName, key) => <Row key={key}>
        <TableRow {...{ object, options, fieldName }} />
      </Row>
      )}
    </CardBody>
  </Card>
}

export default UserComp
