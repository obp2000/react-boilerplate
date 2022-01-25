import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../Customers'
import { getObjectsAction } from '../../redux/Customers'
import { mapCollectionStateToProps } from '../../redux/mappers'

class CollectionComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            accessToken,
            getObjectsAction,
            page,
            term
        } = this.props
        console.log('componentDidMount')
        if (accessToken) {
            getObjectsAction(page, term, accessToken)
        }
    }

    componentDidUpdate({
        page: prevPage,
        term: prevTerm
    }) {
        const {
            getObjectsAction,
            page,
            term,
            accessToken
        } = this.props
        console.log('componentDidUpdate')
        if (accessToken && (page !== prevPage || term !== prevTerm)) {
            getObjectsAction(page, term, accessToken)
        }
    }

    render() {
        return <Template { ...this.props} />
    }
}

export default connect(mapCollectionStateToProps('customers'), {
    getObjectsAction
})(CollectionComponent)