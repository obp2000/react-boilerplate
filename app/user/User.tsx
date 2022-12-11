import 'server-only'

import Card from '@/client/Card'
import CardBody from '@/client/CardBody'
import Row from '@/client/Row'
import { UserOptionsType } from '@/interfaces/users'
import { getOptions } from '@/options/server'
import { userFieldNames } from './config'
import Header from './Header'
import { getUser } from './server'
import TableRow from './TableRow'

export default async function User() {
  const { options } = await getOptions('/user/') as UserOptionsType
  const user = await getUser()
  // console.log('user options ', options)
  return <Card>
    <CardBody>
      <Header {...{ options }} />
      {userFieldNames.map((fieldName, key) => <Row key={key}>
        <TableRow {...{ fieldName, options, user }} />
      </Row>)}
    </CardBody>
  </Card>
}
