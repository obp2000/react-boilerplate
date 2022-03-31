import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardTitle } from 'reactstrap'
import UserRow from './UserRow'

const User = () => {
    const loaded = useSelector(({
        auth: {
            object
        } = {},
        common_consts: {
            options = {},
        } = {}
    }) => ({
        options,
        object
    }))
    return <Card>
        <CardBody>
            <CardTitle>
                <h3>
                    {loaded.options.name_singular}
                </h3>
            </CardTitle>
            {['username', 'email', 'first_name', 'last_name'].map(
                (name, key) => <UserRow {...{...loaded.object,
                                                options: loaded.options,
                                                name,
                                                key}} />
              )
            }
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