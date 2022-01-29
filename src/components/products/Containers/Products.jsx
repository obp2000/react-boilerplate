import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../Products'
import { getObjectsAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Products'

class Products extends React.Component {
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
        console.log('componentDidMount')
        getObjectsAction(page, term)
    }

    componentDidUpdate({
        page: prevPage,
        term: prevTerm
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
        console.log('componentDidUpdate')
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
})(Products)