import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {Card, CardBody, CardTitle, Row, Col} from 'reactstrap'
import Loader from 'react-loader'
import {userFieldNames} from './config'

const User = ({
  optionsTrigger,
  options,
  optionsStatus,
  user,
  userStatus
}) => {
    const url = '/user/'
    useEffect(() => {
      optionsTrigger(url, true)
    }, [url])
    // const { data: user = {}, ...userStatus } = useGetUserQuery()
    const busy = optionsStatus.isFetching || userStatus.isFetching
    return <Loader loaded={!busy} >
      <Card>
      <CardBody>
        <CardTitle>
          <h3>{options?.name_singular}</h3>
        </CardTitle>
        {userFieldNames.map((fieldName, key) =>
          <Row key={key}>
            <Col sm={2}>{options[fieldName]?.label}</Col>
            <Col sm={8}>{user[fieldName]}</Col>
          </Row>
        )}
      </CardBody>
    </Card>
  </Loader>
}

User.propTypes = {
  optionsTrigger: PropTypes.func,
  options: PropTypes.object,
  optionsStatus: PropTypes.object,
  user: PropTypes.object,
  userStatus: PropTypes.object,
}

export default User
