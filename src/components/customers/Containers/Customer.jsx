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
        getObjectAction(id, accessToken)
    }

    render = () => <FormTemplate {...this.props} />
}

export default connect(mapObjectStateToProps('customers'), {
    getObjectAction,
    onSubmit
})(Customer)