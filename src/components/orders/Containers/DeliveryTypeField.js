import React from 'react'
import { connect } from 'react-redux'
import Template from '../DeliveryTypeField'

const mapStateToProps = ({
    orders: {
        object: {
            delivery_types: search_results = []
        }
    }
}) => ({
    search_results
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