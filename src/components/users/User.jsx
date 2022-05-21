// import PropTypes from 'prop-types'
import React from 'react'
import {Card, CardBody, CardTitle, Row, Col} from 'reactstrap'
import Loader from 'react-loader'
import {useGetOptionsQuery, useGetUserQuery} from '../../services/apiSlice'
import {userFieldNames} from '../redux/auth'

const User = () => {
  // const { isAuthenticated } = useSelector(selectAuth)
  // if (!isAuthenticated) return
  const {
    data: {
      options = {},
    } = {},
    isFetching: isOptionsFetching,
  } = useGetOptionsQuery('/user/')
  const {
    data: user = {},
    isFetching: isUserFetching,
  } = useGetUserQuery()
  const busy = isOptionsFetching || isUserFetching
  return <Loader loaded={!busy}>
    <Card>
      <CardBody>
        <CardTitle>
          <h3>{options?.name_singular}</h3>
        </CardTitle>
        {userFieldNames.map((fieldName, key) =>
          <Row key={key}>
            <Col sm={2}>
              {options[fieldName]?.label}
            </Col>
            <Col sm={8}>
              {user[fieldName]}
            </Col>
          </Row>,

        )}
      </CardBody>
    </Card>
  </Loader>
}

export default User
