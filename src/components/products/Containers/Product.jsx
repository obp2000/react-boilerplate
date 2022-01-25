import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FormTemplate from '../ProductForm'
import { ProductSelector } from '../Selectors'
import { getObjectAction, onSubmit } from '../../redux/Products'
import { mapObjectStateToProps } from '../../redux/mappers'

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

const mapStateToProps = mapObjectStateToProps('products')

export default connect(mapStateToProps, { getObjectAction, onSubmit })(Product)