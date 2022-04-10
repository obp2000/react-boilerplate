import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import ObjectsTable from '../../Shared/ObjectsTable'
import { getObjectsAction, deleteObjectAction } from '../../redux/ServerActions'
import { Actions } from '../../redux/Customers'
import {
    selectTableLabels,
    selectTableValues,
    selectTotalCount,
    selectTotalPages
} from '../../redux/Customers'

class Customers extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        console.log('customers DidMount')
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
        console.log('customers DidUpdate')
        const {
            location: {
                search
            },
            getObjectsAction
        } = this.props
        if (prevSearch != search) getObjectsAction()
    }

    render() {
        console.log('render customers')
        return <ObjectsTable {...this.props}
            {...{selectTableLabels,
                selectTableValues,
                selectTotalCount,
                selectTotalPages}} />
    }
}

// const mapStateToProps = ({
//     customers: objects = {},
//     // temp_state: {
//         // isFetching
//     // },
//     // common_consts
//     // router: {
//     //     location
//     // }
// }) => ({
//     objects,
//     // isFetching,
//     // common_consts
//     // location
// })

export default connect(null, {
    getObjectsAction: getObjectsAction(Actions),
    deleteObjectAction: deleteObjectAction(Actions)
})(Customers)