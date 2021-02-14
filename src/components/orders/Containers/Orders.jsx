import PropTypes from 'prop-types'
import React from 'react'
import {
  connect
} from 'react-redux'
import Template from '../Orders'
import {
  getOrdersAction,
  deleteOrderAction
} from '../../redux/Orders'

class Orders extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      page,
      term,
      getOrdersAction
    } = this.props
    getOrdersAction(page, term)
  }

  componentDidUpdate({
    page: prevPage,
    term: prevTerm
  }) {
    const {
      page,
      term,
      getOrdersAction
    } = this.props
    if (page !== prevPage || term !== prevTerm) {
      getOrdersAction(page, term)
    }
  }

  render = () => <Template {...this.props}/>

  // static propTypes = {
  //   getOrdersAction: PropTypes.func.isRequired,
  //   page: PropTypes.string,
  //   term: PropTypes.string
  // }
}

const mapStateToProps = ({
  orders: {
    results,
    totalCount,
    totalPages,
    isFetching
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
  search
})

export default connect(mapStateToProps, {
  getOrdersAction,
  deleteOrderAction
})(Orders)