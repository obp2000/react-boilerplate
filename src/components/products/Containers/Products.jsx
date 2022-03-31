import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../Products'
import { getObjectsAction, deleteObjectAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Products'

class Products extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        console.log('products DidMount')
        this.props.getObjectsAction()
    }

    componentDidUpdate() {
        console.log('products DidUpdate')
        this.props.getObjectsAction()
    }

    render() {
        return <Template {...this.props} />
    }
}

export default connect(null, {
    getObjectsAction: getObjectsAction(Actions),
    deleteObjectAction: deleteObjectAction(Actions)
})(Products)