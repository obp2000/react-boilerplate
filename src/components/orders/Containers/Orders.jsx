import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import ObjectsTable from '../../Shared/ObjectsTable'
import { getObjectsAction, deleteObjectAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Orders'
import {
    selectTableLabels,
    selectTableValues,
    selectTotalCount,
    selectTotalPages
} from '../../redux/Orders'

class Orders extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        console.log('orders DidMount')
        const {
            getObjectsAction
        } = this.props
        getObjectsAction()
    }

    componentDidUpdate({
        location: {
            search: prevSearch
        }
    }) {
        console.log('orders DidUpdate')
        const {
            location: {
                search
            },
            getObjectsAction
        } = this.props
        if (prevSearch != search) getObjectsAction()
    }

    render() {
        return <ObjectsTable {...this.props}
            {...{selectTableLabels,
                selectTableValues,
                selectTotalCount,
                selectTotalPages}} />
    }
}

export default connect(null, {
    getObjectsAction: getObjectsAction(Actions),
    deleteObjectAction: deleteObjectAction(Actions)
})(Orders)
