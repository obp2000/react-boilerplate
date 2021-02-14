import PropTypes from 'prop-types'
import React from 'react'
import {
    connect
} from 'react-redux'
import {
    goBack
} from 'connected-react-router'
import {
    reduxForm
} from 'redux-form'
import CustomerForm from '../CustomerForm'
import {
    CustomerSelector
} from '../Selectors'
import {
    getCustomerAction,
    onSubmit,
    onSubmitSuccess
} from '../../redux/Customers'
import {
    onChangeCity
} from '../../redux/Cities'
import {
    validate
} from '../Validators'

const ReduxCustomerForm = reduxForm({
    form: 'customer',
    validate,
    onSubmit,
    onSubmitSuccess,
    enableReinitialize: true
})(CustomerForm)

class Customer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            id,
            accessToken,
            getCustomerAction
        } = this.props
        getCustomerAction(id, accessToken)
    }

    render = () => < ReduxCustomerForm { ...this.props
    }
    />
}

const mapStateToProps = (state, {
    match: {
        params: {
            id
        }
    }
}) => {
    const {
        customers: {
            customer,
            isFetching
        },
        auth: {
            accessToken
        },
        cities
    } = state
    return {
        id,
        accessToken,
        initialValues: customer,
        isFetching,
        cities,
        ...CustomerSelector(state)
    }
}

export default connect(mapStateToProps, {
    getCustomerAction,
    goBack,
    onChangeCity
})(Customer)