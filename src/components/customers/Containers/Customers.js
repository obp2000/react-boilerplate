import PropTypes from 'prop-types'
import React from 'react'
import {
  connect
} from 'react-redux'
import Template from '../Customers'
import {
  getCustomersAction,
  deleteCustomerAction
} from '../../redux/Customers'

class Customers extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      accessToken,
      getCustomersAction,
      page,
      term
    } = this.props
    if (accessToken) {
      getCustomersAction(page, term, accessToken)
    }
  }

  componentDidUpdate({
    page: prevPage,
    term: prevTerm
  }) {
    const {
      accessToken,
      getCustomersAction,
      page,
      term
    } = this.props
    if (accessToken && (page !== prevPage || term !== prevTerm)) {
      getCustomersAction(page, term, accessToken)
    }
  }

  render = () => <Template { ...this.props} />
}

const mapStateToProps = ({
  customers: {
    results,
    totalCount,
    totalPages,
    isFetching,
    page: loadedPage,
    term: loadedTerm
  },
  auth: {
    accessToken
  },
  router: {
    location: {
      query: {
        term = ''
      },
      search
    }
  }
}, {
  match: {
    params: {
      page = 1
    }
  }
}) => ({
  results,
  totalCount,
  totalPages,
  isFetching,
  page: parseInt(page),
  term,
  search,
  accessToken
})

export default connect(mapStateToProps, {
  getCustomersAction,
  deleteCustomerAction
})(Customers)