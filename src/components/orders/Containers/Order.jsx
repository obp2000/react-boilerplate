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

export default connect(null, {
    getObjectAction: getObjectAction(Actions),
    onSubmitAction: onSubmitAction(Actions)
})(Order)

// const mapStateToProps = (state, {
//     match: {
//         params: {
//             id
//         }
//     }
// }) => {
//     const {
//         orders: {
//             order,
//             isFetching
//         },
//     } = state
//     return {
//         id,
//         initialValues: order,
//         isFetching,
//         ...OrderSumSelector(state)
//     }
// }

// export default connect(mapStateToProps, {
//     getObjectAction,
//     getPostCost,
//     goBack
// })(Order)