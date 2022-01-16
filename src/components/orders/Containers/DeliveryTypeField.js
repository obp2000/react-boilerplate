import React from 'react'
import { connect } from 'react-redux'
import Template from '../DeliveryTypeField'
// import { getDeliveryTypesAction } from '../../redux/DeliveryTypes'
import { mapDeliveryTypesStateToProps } from '../../redux/mappers'

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

export default connect(mapDeliveryTypesStateToProps())(Template)