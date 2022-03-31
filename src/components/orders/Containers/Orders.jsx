import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../Orders'
import { getObjectsAction, deleteObjectAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Orders'

class Orders extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        console.log('orders DidMount')
        this.props.getObjectsAction()
    }

    componentDidUpdate() {
        console.log('orders DidUpdate')
        this.props.getObjectsAction()
    }

    render() {
        return <Template {...this.props} />
    }
}

export default connect(null, {
    getObjectsAction: getObjectsAction(Actions),
    deleteObjectAction: deleteObjectAction(Actions)
})(Orders)
