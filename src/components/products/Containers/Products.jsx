// import PropTypes from 'prop-types'
// import React from 'react'
// import { connect } from 'react-redux'
// // import Template from '../Products'
// import ObjectsTable from '../../Shared/ObjectsTable'
// import { getObjectsAction, deleteObjectAction } from '../../redux/ServerActions'
// import { Actions } from '../../redux/Products'

// class Products extends React.Component {
//     // constructor(props) {
//     //     super(props)
//     // }

//     componentDidMount() {
//         console.log('products DidMount')
//         const {
//             getObjectsAction
//         } = this.props
//         getObjectsAction()
//     }

//     componentDidUpdate({
//         location: {
//             search: prevSearch
//         }
//     }) {
//         console.log('products DidUpdate')
//         const {
//             location: {
//                 search
//             },
//             getObjectsAction
//         } = this.props
//         if (prevSearch != search) getObjectsAction()
//     }

//     render() {
//         return <ObjectsTable {...this.props} />
//     }
// }

// export default connect(null, {
//     getObjectsAction: getObjectsAction(Actions),
//     deleteObjectAction: deleteObjectAction(Actions)
// })(Products)
