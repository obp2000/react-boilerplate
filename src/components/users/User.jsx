import PropTypes from 'prop-types'
import React from 'react'
import {useSelector} from 'react-redux'
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col
} from 'reactstrap'
import {useOutletContext} from 'react-router-dom'
import Loader from 'react-loader'
import {useGetUserQuery} from './apiSlice'
import {userFieldNames} from './config'
import {useOptionsTrigger, useOptions} from '../options/hooks'

const emptyObject = {}

const User = () => {
  const indexUrl = '/user/'
  useOptionsTrigger(indexUrl)
  const {options = emptyObject} = useOutletContext()
  // console.log('options ', options)
  const {
    data: user = emptyObject,
    isFetching
  } = useGetUserQuery()
  return <Loader loaded={!isFetching} >
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

export default User
