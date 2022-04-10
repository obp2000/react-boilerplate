import PropTypes from 'prop-types'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Container } from 'reactstrap'
// import {
//   TransitionGroup,
//   CSSTransition
// } from "react-transition-group"
import Errors from './Shared/Errors'
import { ToastContainer, Zoom } from 'react-toastify'
import NavBar from './NavBar/NavBar'
import Products from './products/Containers/Products'
import Product from './products/Containers/Product'
import Customers from './customers/Containers/Customers'
import Customer from './customers/Containers/Customer'
import Orders from './orders/Containers/Orders'
import Order from './orders/Containers/Order'
// import Profile from './profile/Containers/Profile'
import PrivateRoute from './Shared/privateRoute'
import RegisterForm from './auth/Containers/RegisterForm'
import LoginForm from './auth/Containers/LoginForm'
import User from './users/Containers/User'

const Layout = props =>
    <Container fluid="sm" className="bg-light border">
      <ToastContainer position="top-center"
                      autoClose={2000}
                      transition={Zoom}
                      theme="colored"
                      hideProgressBar={true}
                      />
      <Errors />
      <ConnectedRouter {...props} >
        {/*<Route path="/" component={Errors} />*/}
        <Route path="/" render={routeProps => <NavBar {...routeProps} />} />
        <Route path="/signup" component={RegisterForm}/>
        <Route path="/login" component={LoginForm}/>
        <Switch>
          <Route  path="/customers/:id"
                  render={routeProps => <Customer {...routeProps} />} />
          {/*<Route path="/customers" componenet={Customers} />*/}
          <Route  path="/customers"
                  render={routeProps => <Customers {...routeProps} />} />
          {/*            <Route path="/customers">
                    <Customers />
                  </Route>*/}
          <Route  path="/products/:id"
                  render={routeProps => <Product {...routeProps} />} />
          <Route  path="/products"
                  render={routeProps => <Products {...routeProps} />} />
          <Route  path="/orders/:id"
                  render={routeProps => <Order {...routeProps} />} />
          <Route  path="/orders"
                  render={routeProps => <Orders {...routeProps} />} />
          <PrivateRoute path="/user/" component={User} />
          <Route  path="/"
                  render={routeProps => <Customers {...routeProps} />} />
        </Switch>
      </ConnectedRouter>
    </Container>

Layout.propTypes = {
    history: PropTypes.object
}

export default Layout