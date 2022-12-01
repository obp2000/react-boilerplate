import 'server-only'

import Card from '@/client/Card'
import CardBody from '@/client/CardBody'
import Row from '@/client/Row'
import { UserOptionsType } from '@/interfaces/users'
import { getOptions } from '@/services/api/options'
import { getUser } from '@/services/api/server'
import { userFieldNames } from './config'
import Header from './Header'
import { indexUrl } from './serverConfig'
import TableRow from './TableRow'

export default async function User() {
  const { options } = await getOptions(indexUrl, true) as UserOptionsType
  const user = await getUser(indexUrl)
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
