import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import FormTemplate from '../CustomerForm'
import { getObjectAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Customers'

class Customer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            match: {
                params: {
                    id
                }
            },
            getObjectAction
        } = this.props
        console.log('customer DidMount')
        getObjectAction(id)
    }

    render() {
        return <FormTemplate />
    }
}

export default connect(null, {
    getObjectAction: getObjectAction(Actions),
})(Customer)