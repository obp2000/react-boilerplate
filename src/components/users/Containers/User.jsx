import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Template from '../User'
import { getObjectAction } from '../../redux/auth'

class User extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            getObjectAction
        } = this.props
        getObjectAction()
    }

    render() {
        return <Template />
    }
}

export default connect(null, {
    getObjectAction
})(User)


// const mapStateToProps = ({
//     user: {
//         user: {
//             name,
//             email,
//             username
//         },
//         isFetching
//     },
//     auth: {
//         accessToken
//     }
// }) => ({
//     accessToken,
//     name,
//     email,
//     username,
//     isFetching
// })
