import PropTypes from 'prop-types'
import React from 'react'
import {Card, CardBody, CardTitle, Row, Col} from 'reactstrap'
import {useGetOptionsQuery, useGetUserQuery} from '../../services/apiSlice'
import {userFieldNames} from '../redux/auth'

const User = ({indexUrl}) => {
  // const { isAuthenticated } = useSelector(selectAuth)
  // if (!isAuthenticated) return
  const {
    data: {
      options = {},
    } = {},
  } = useGetOptionsQuery('/user/')
  const {
    data: user = {},
    // isLoading,
    // isFetching,
    // isSuccess,
    // isError,
    // error,
  } = useGetUserQuery()
  return <Card>
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
}

User.propTypes = {
  indexUrl: PropTypes.string,
}

export default User
