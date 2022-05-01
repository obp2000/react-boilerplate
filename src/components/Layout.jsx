import PropTypes from 'prop-types'
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
// import { ConnectedRouter } from 'connected-react-router'
import { Container } from 'reactstrap'
// import {
//   TransitionGroup,
//   CSSTransition
// } from "react-transition-group"
import Errors from './Shared/Errors'
import { ToastContainer, Zoom } from 'react-toastify'
import NavBar from './NavBar/NavBar'
import AuthModal from './auth/AuthModal'
// import Products from './products/Products'
import { config as productsConfig } from './redux/Products'
import Product from './products/ProductForm'
// import Customers from './customers/Containers/Customers'
import { config as customersConfig } from './redux/Customers'
import Customer from './customers/CustomerForm'
// import Orders from './orders/Orders'
import { config as ordersConfig } from './redux/Orders'
import Order from './orders/OrderForm'
// import Profile from './profile/Containers/Profile'
import PrivateRoute from './Shared/privateRoute'
import RegisterForm from './auth/RegisterForm'
import LoginForm from './auth/LoginForm'
import User from './users/User'

import ObjectsTable from './Shared/ObjectsTable'

const Layout = () =>
    <Container fluid="sm" className="bg-light border">
      <ToastContainer position="top-center"
                      autoClose={2000}
                      transition={Zoom}
                      theme="colored"
                      closeOnClick
                      draggable
                      hideProgressBar={true}
                      limit={1}
                      />
      {/*<Errors />*/}
      <HashRouter>
        {/*<Route path="/" component={Errors} />*/}
        {/*<Route path="/" render={routeProps => <NavBar {...routeProps} />} />*/}
{/*        <Route path="/signup" component={RegisterForm}/>
        <Route path="/login" component={LoginForm}/>*/}
        <Switch>
{/*          <Route  path="/customers/:id"
                  render={routeProps => <Customer {...routeProps} />} />*/}
          {/*<Route path="/customers" componenet={Customers} />*/}
{/*          <Route  path="/customers"
                  render={routeProps => <ObjectsTable {...routeProps} indexUrl='/customers/' />} />*/}
          <Route path="/customers/:id">
            <NavBar {...customersConfig} />
            <Customer {...customersConfig} />
          </Route>
          <Route path="/customers">
            <NavBar {...customersConfig} />
            <ObjectsTable {...customersConfig} />
          </Route>
          <Route path="/products/:id">
            <NavBar {...productsConfig} />
            <Product {...productsConfig} />
          </Route>
{/*          <Route  path="/products/:id"
                  render={routeProps => <Product {...routeProps} />} />*/}
          <Route path="/products">
            <NavBar {...productsConfig} />
            <ObjectsTable {...productsConfig} />
          </Route>
{/*          <Route  path="/products"
                  render={routeProps => <ObjectsTable {...routeProps} indexUrl='/products/' />} />*/}
          <Route path="/orders/:id">
            <NavBar {...ordersConfig} />
            <Order {...ordersConfig} />
          </Route>
{/*          <Route  path="/orders/:id"
                  render={routeProps => <Order {...routeProps} />} />*/}
          <Route path="/orders">
            <NavBar {...ordersConfig} />
            <ObjectsTable {...ordersConfig} />
          </Route>
{/*          <Route  path="/orders"
                  render={routeProps => <ObjectsTable {...routeProps} indexUrl='/orders/' />} />*/}
          <Route path="/user">
            <NavBar indexUrl='/user/' />
            <PrivateRoute path="/user/" component={User} />
          </Route>
          {/*<PrivateRoute path="/user/" component={User} />*/}
{/*          <Route  path="/"
                  render={routeProps => <ObjectsTable {...routeProps} indexUrl='/customers/' />} />*/}
          <Route path="/">
            <NavBar {...customersConfig} />
            <ObjectsTable {...customersConfig} />
          </Route>
        </Switch>
      </HashRouter>
      {/*<AuthModal />*/}
    </Container>

Layout.propTypes = {
    history: PropTypes.object
}

export default Layout
