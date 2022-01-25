import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import FormTemplate from '../CustomerForm'
// import { CustomerSelector } from '../Selectors'
import { getObjectAction, onSubmit } from '../../redux/Customers'
import { mapObjectStateToProps } from '../../redux/mappers'

class Customer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            id,
            accessToken,
            getObjectAction
        } = this.props
        // console.log('customer DidMount')
        getObjectAction(id, accessToken)
    }

    render() {
        return <FormTemplate {...this.props} />
    }
}

// const mapStateToProps = mapObjectStateToProps('customers')

export default connect(mapObjectStateToProps('customers'), {
    getObjectAction,
    onSubmit
})(Customer)