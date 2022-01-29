import PropTypes from 'prop-types'
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Container } from 'reactstrap'
// import {
//   TransitionGroup,
//   CSSTransition
// } from "react-transition-group"
import Errors from './Shared/Errors'
import NavBar from './NavBar/NavBar'
import Products from './products/Containers/Products'
import Product from './products/Containers/Product'
import Customers from './customers/Containers/Customers'
import Customer from './customers/Containers/Customer'
import Orders from './orders/Containers/Orders'
import Order from './orders/Containers/Order'
// import Profile from './profile/Containers/Profile'
import PrivateRoute from './Shared/privateRoute'
import RegisterForm from './auth/RegisterForm'
import LoginForm from './auth/LoginForm'
import User from './users/Containers/User'
// import Pagination from './Pagination/Containers/Pagination'

const Layout = ({history}) => {
  return <ConnectedRouter history={history}>
    <Container className="container-xxl my-md-4 bd-layout">
      <Route path="/" component={Errors} />
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Products}/>
      <Route path="/signup" component={RegisterForm}/>
      <Route path="/login" component={LoginForm}/>
      <Switch>
            <Route exact path="/products/pages/:page" component={Products}/>
            <Route exact path="/products" component={Products}/>
            <Route path="/products/:id" component={Product}/>
            <Route exact path="/orders/pages/:page" component={Orders}/>
            <Route exact path="/orders" component={Orders}/>
            <Route path="/orders/:id" component={Order}/>
            <Route exact path="/customers/pages/:page" component={Customers}/>
            <Route exact path="/customers" component={Customers} />
            <Route path="/customers/:id" component={Customer}/>
            <PrivateRoute path="/user/" component={User}/>
      </Switch>
     </Container>
  </ConnectedRouter>
}

Layout.propTypes = {
  history: PropTypes.object
}

export default Layout
