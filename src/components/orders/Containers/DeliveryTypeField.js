import React from 'react'
import { connect } from 'react-redux'
import Template from '../DeliveryTypeField'

const mapStateToProps = ({
    orders: {
        object: {
            delivery_types = []
        }
    }
}) => ({
    delivery_types
})

export default connect(mapStateToProps)(Template)

// class DeliveryTypeField extends React.Component {
//     constructor(props) {
//         super(props)
//     }

//     componentDidMount() {
//         const {
//             getDeliveryTypesAction,
//         } = this.props
//         getDeliveryTypesAction()
//     }

//     render = () => <Template {...this.props} />

// }