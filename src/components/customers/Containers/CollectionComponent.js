import PropTypes from 'prop-types'
import React from 'react'
// import Template from '../Customers'
// import {
//     getObjectsAction,
//     deleteObjectAction
// } from '../../redux/Customers'

export class CollectionComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {
            accessToken,
            getObjectsAction,
            page,
            term
        } = this.props
        if (accessToken) {
            getObjectsAction(page, term, accessToken)
        }
    }

    componentDidUpdate({
        page: prevPage,
        term: prevTerm
    }) {
        const {
            accessToken,
            getObjectsAction,
            page,
            term
        } = this.props
        if (accessToken && (page !== prevPage || term !== prevTerm)) {
            getObjectsAction(page, term, accessToken)
        }
    }

    // render = () => <Template { ...this.props} />
}

// export const test1 = (template_path) => {
//     return class CustomerComponent extends CollectionComponent {
//     	import Template from template_path
//         constructor(props) {
//             super(props)
//         }

//         render = () => <Template { ...this.props} />
//     }
// }