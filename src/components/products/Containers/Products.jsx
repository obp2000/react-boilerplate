import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Template from '../Products'
import { getObjectsAction } from '../../redux/Products'
import { mapCollectionStateToProps } from '../../redux/mappers'

class CollectionComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            accessToken,
            page,
            term,
            getObjectsAction
        } = this.props
        getObjectsAction(page, term, accessToken)
    }

    componentDidUpdate({
        page: prevPage,
        term: prevTerm
    }) {
        const {
            accessToken,
            page,
            term,
            getObjectsAction
        } = this.props
        if (page !== prevPage || term !== prevTerm) {
            getObjectsAction(page, term, accessToken)
        }
    }

    render = () => <Template {...this.props} />

    // static propTypes = {
    //   getObjectsAction: PropTypes.func.isRequired,
    //   page: PropTypes.number,
    //   term: PropTypes.string
    // }
}

export default connect(mapCollectionStateToProps('products'), {
    getObjectsAction
})(CollectionComponent)