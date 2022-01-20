import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import FormTemplate from '../OrderForm'
// import { OrderSumSelector } from '../Selectors'
import { getObjectAction, onSubmit } from '../../redux/Orders'
import { mapObjectStateToProps } from '../../redux/mappers'

// const ReduxForm = setReduxForm()(FormTemplate)

class Order extends React.Component {
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

    render = () => <FormTemplate {...this.props} />
}

export default connect(mapObjectStateToProps('orders'), {
    getObjectAction,
    onSubmit
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