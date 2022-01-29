import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardTitle} from 'reactstrap'
import UserRow from './UserRow'

const User = () => {
    const loaded = useSelector(({
        auth: {
            object: {
                username,
                email,
                first_name,
                last_name
            },
        }
    }) => ({
        username,
        email,
        first_name,
        last_name,
    }))
    return <Card>
        <CardBody>
            <CardTitle>
                <h4 className="display-6">
                    Профиль
                </h4>
            </CardTitle>
            <UserRow name='Имя пользователя:' value={loaded.username} />
            <UserRow name='Email:' value={loaded.email} />
            <UserRow name='Имя:' value={loaded.first_name} />
            <UserRow name='Фамилия:' value={loaded.last_name} />
        </CardBody>
    </Card>
}

User.propTypes = {
    username: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
}

export default User