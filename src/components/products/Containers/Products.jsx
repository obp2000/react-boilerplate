import React from 'react'
import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
import Template from '../Products'
import {
  getProductsAction,
  deleteProductAction
} from '../../redux/Products'

class Products extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      page,
      term,
      getProductsAction
    } = this.props
    getProductsAction(page, term)
  }

  componentDidUpdate({
    page: prevPage,
    term: prevTerm
  }) {
    const {
      page,
      term,
      getProductsAction
    } = this.props
    if (page !== prevPage || term !== prevTerm) {
      getProductsAction(page, term)
    }
  }

  render = () => <Template {...this.props} />

  // static propTypes = {
  //   getProductsAction: PropTypes.func.isRequired,
  //   page: PropTypes.number,
  //   term: PropTypes.string
  // }
}

const mapStateToProps = ({
  products: {
    results,
    totalCount,
    totalPages,
    isFetching,
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
  getProductsAction,
  deleteProductAction
})(Products)