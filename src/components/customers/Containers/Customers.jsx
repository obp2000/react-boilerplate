import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../Customers'
import { getObjectsAction, deleteObjectAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Customers'

class Customers extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        console.log('customers DidMount')
        this.props.getObjectsAction()
    }

    componentDidUpdate(prevProps) {
        console.log('customers DidUpdate')
        if (prevProps != this.props) this.props.getObjectsAction()
    }

    render() {
        return <Template {...this.props} />
    }
}

// const mapStateToProps = ({
//     customers: objects = {},
//     common_consts
// }) => ({
//     objects,
//     common_consts
// })

export default connect(null, {
    getObjectsAction: getObjectsAction(Actions),
    deleteObjectAction: deleteObjectAction(Actions)
})(Customers)