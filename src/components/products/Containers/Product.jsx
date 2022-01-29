import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import FormTemplate from '../ProductForm'
import { getObjectAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Products'

class Product extends React.Component {
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
        // console.log(' DidMount')
        getObjectAction(id)
    }

    render() {
        return <FormTemplate />
    }
}

export default connect(null, {
    getObjectAction: getObjectAction(Actions),
})(Product)