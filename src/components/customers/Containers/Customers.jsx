import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../Customers'
import { getObjectsAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Customers'

class Customers extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            getObjectsAction,
            match: {
                params: {
                    page
                },
                term = ''
            }
        } = this.props
        // console.log('componentDidMount')
        // console.log('mount props ', this.props)
        getObjectsAction(page, term)
    }

    componentDidUpdate({
        page: prevPage,
        term: prevTerm
    }) {
        const {
            getObjectsAction,
            // term,
            match: {
                params: {
                    page
                },
                term = ''
            }
        } = this.props
        // console.log('componentDidUpdate')
        // console.log('update props ', this.props)
        if (page !== prevPage || term !== prevTerm) {
            getObjectsAction(page, term)
        }
    }

    render() {
        return <Template {...this.props} />
    }
}

export default connect(null, {
    getObjectsAction: getObjectsAction(Actions),
})(Customers)