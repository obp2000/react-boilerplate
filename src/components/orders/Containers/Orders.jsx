import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Template from '../Orders'
import { getObjectsAction } from '../../redux/Orders'
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

    render = () => <Template {...this.props}/>
}

export default connect(mapCollectionStateToProps('orders'), {
    getObjectsAction
})(CollectionComponent)

// const mapStateToProps = ({
//   orders: {
//     results,
//     totalCount,
//     totalPages,
//     isFetching
//   },
//   router: {
//     location: {
//       query: {
//         term = ''
//       },
//       search
//     }
//   }
// }, {
//   match: {
//     params: {
//       page = 1
//     }
//   }
// }) => ({
//   results,
//   totalCount,
//   totalPages,
//   isFetching,
//   page: parseInt(page),
//   term,
//   search
// })

