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
import Product from './products/ProductForm'
// import Customers from './customers/Containers/Customers'
import Customer from './customers/CustomerForm'
import Orders from './orders/Containers/Orders'
import Order from './orders/OrderForm'
// import Profile from './profile/Containers/Profile'
import PrivateRoute from './Shared/privateRoute'
import RegisterForm from './auth/Containers/RegisterForm'
import LoginForm from './auth/Containers/LoginForm'
import User from './users/Containers/User'

import ObjectsTable from './Shared/ObjectsTable'

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
        {/*<Route path="/" render={routeProps => <NavBar {...routeProps} />} />*/}
        <Route path="/signup" component={RegisterForm}/>
        <Route path="/login" component={LoginForm}/>
        <Switch>
{/*          <Route  path="/customers/:id"
                  render={routeProps => <Customer {...routeProps} />} />*/}
          {/*<Route path="/customers" componenet={Customers} />*/}
{/*          <Route  path="/customers"
                  render={routeProps => <ObjectsTable {...routeProps} index_url='/customers/' />} />*/}
          <Route path="/customers/:id">
            <NavBar index_url='/customers/' />
            <Customer index_url='/customers/' />
          </Route>
          <Route path="/customers">
            <NavBar index_url='/customers/' />
            <ObjectsTable index_url='/customers/' />
          </Route>
          <Route  path="/products/:id"
                  render={routeProps => <Product {...routeProps} />} />
          <Route path="/products">
            <NavBar index_url='/products/' />
            <ObjectsTable index_url='/products/' />
          </Route>
{/*          <Route  path="/products"
                  render={routeProps => <ObjectsTable {...routeProps} index_url='/products/' />} />*/}
          <Route  path="/orders/:id"
                  render={routeProps => <Order {...routeProps} />} />
          <Route path="/orders">
            <NavBar index_url='/orders/' />
            <ObjectsTable index_url='/orders/' />
          </Route>
{/*          <Route  path="/orders"
                  render={routeProps => <ObjectsTable {...routeProps} index_url='/orders/' />} />*/}
          <PrivateRoute path="/user/" component={User} />
{/*          <Route  path="/"
                  render={routeProps => <ObjectsTable {...routeProps} index_url='/customers/' />} />*/}
          <Route path="/">
            <NavBar index_url='/customers/' />
            <ObjectsTable index_url='/customers/' />
          </Route>
        </Switch>
      </ConnectedRouter>
    </Container>

Layout.propTypes = {
    history: PropTypes.object
}

export default Layout