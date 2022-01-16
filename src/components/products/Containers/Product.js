import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FormTemplate from '../ProductForm'
import { ProductSelector } from '../Selectors'
import { getObjectAction, onSubmit } from '../../redux/Products'
import { mapObjectStateToProps } from '../../redux/mappers'

// const ReduxForm = setReduxForm()(FormTemplate)

class Product extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            id,
            getObjectAction,
            accessToken
        } = this.props
        getObjectAction(id, accessToken)
    }

    render() {
        return <FormTemplate {...this.props} />
    }
}

export default connect(
    mapObjectStateToProps('products'), {
        getObjectAction,
        onSubmit
    })(Product)