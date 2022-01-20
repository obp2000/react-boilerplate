import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Template from '../User'
import { getObjectAction } from '../../redux/auth'
import { mapObjectStateToProps } from '../../redux/mappers'

class User extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            accessToken,
            getObjectAction
        } = this.props
        getObjectAction(accessToken)
    }

    // componentDidUpdate({
    //   page: prevPage,
    //   term: prevTerm
    // }) {
    //   const {
    //     page,
    //     term,
    //     getProductsAction
    //   } = this.props
    //   if (page !== prevPage || term !== prevTerm) {
    //     getProductsAction(page, term)
    //   }
    // }

    render = () => <Template {...this.props} />
}

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

export default connect(mapObjectStateToProps('auth'), {
    getObjectAction
})(User)