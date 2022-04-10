import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardTitle } from 'reactstrap'
import UserRow from './UserRow'
import { selectNameSingular } from '../redux/CommonConsts'
import { selectUserFields } from '../redux/auth'

const User = () =>
    <Card>
        <CardBody>
            <CardTitle>
                <h3>{useSelector(selectNameSingular)}</h3>
            </CardTitle>
            {useSelector(selectUserFields).map(
                (field, key) => <UserRow {...{...field, key}} />

            )}
        </CardBody>
    </Card>

export default User
