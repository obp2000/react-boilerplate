import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import FormTemplate from '../OrderForm'
import { getObjectAction, onSubmitAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Orders'

class Order extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        this.props.getObjectAction()
    }

    render() {
        return <FormTemplate {...this.props} />
    }
}

const mapStateToProps = ({
    orders: {
        object
    },
    temp_state: {
        isFetching
    },
    common_consts
}) => ({
    object,
    isFetching,
    common_consts
})

export default connect(mapStateToProps, {
    getObjectAction: getObjectAction(Actions),
    onSubmitAction: onSubmitAction(Actions)
})(Order)
