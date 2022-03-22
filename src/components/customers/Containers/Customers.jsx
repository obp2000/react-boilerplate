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
                }
            }
        } = this.props
        // console.log('componentDidMount')
        // console.log('mount props ', this.props)
        console.log('Actions ', Actions)
        getObjectsAction(page)
    }

    componentDidUpdate({
        // term,
        match: {
            params: {
                page: prevPage
            },
            term: prevTerm
        }
    }) {
        const {
            getObjectsAction,
            match: {
                params: {
                    page
                },
                term = ''
            }
        } = this.props
        // console.log('componentDidUpdate')
        // console.log('prevProps ', prevProps)
        // console.log('prevPage ', prevPage)
        // console.log('prevTerm ', prevTerm)
        // if (page !== prevPage || term !== prevTerm) {
        getObjectsAction(page)
        // }
    }

    render() {
        return <Template {...this.props} />
    }
}

export default connect(null, {
    getObjectsAction: getObjectsAction(Actions),
})(Customers)