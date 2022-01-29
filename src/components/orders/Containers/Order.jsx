import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import FormTemplate from '../OrderForm'
import { getObjectAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Orders'

class Order extends React.Component {
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
        getObjectAction(id)
    }

    render() {
        return <FormTemplate />
    }
}

export default connect(null, {
    getObjectAction: getObjectAction(Actions),
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