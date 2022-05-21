import PropTypes from 'prop-types'
import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
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
import Layout1 from './Layout1'

import ObjectsTable from './Shared/ObjectsTable'

const Layout = () =>
    // <Container fluid="sm" className="bg-light border">
      {/*<Errors />*/}
      // <HashRouter>
        {/*<Route path="/" component={Errors} />*/}
        {/*<Route path="/" render={routeProps => <NavBar {...routeProps} />} />*/}
{/*        <Route path="/signup" component={RegisterForm}/>
        <Route path="/login" component={LoginForm}/>*/}
        <Routes>
{/*          <Route path="/customers/:id">
            <NavBar {...customersConfig} />
            <Customer {...customersConfig} />
          </Route>*/}
          <Route path="/" element={<Layout1 />}>
            <Route index element={<ObjectsTable {...customersConfig} />} />
            <Route path='customers' element={<ObjectsTable {...customersConfig} />} />
            <Route path='customers/:id' element={<Customer {...customersConfig} />} />
          </Route>
            {/*</Route>*/}
          {/*<Route path="customers" element={<NavBar {...customersConfig} />} >*/}
{/*            <Route path="test1" element={<ObjectsTable {...customersConfig} />} />
            <Route path=":id" element={<Customer {...customersConfig} />} />*/}

{/*            <ObjectsTable {...customersConfig} />
          </Route>*/}
{/*          <Route path="/products/:id">
            <NavBar {...productsConfig} />
            <Product {...productsConfig} />
          </Route>
          <Route path="/products">
            <NavBar {...productsConfig} />
            <ObjectsTable {...productsConfig} />
          </Route>
          <Route path="/orders/:id">
            <NavBar {...ordersConfig} />
            <Order {...ordersConfig} />
          </Route>
          <Route path="/orders">
            <NavBar {...ordersConfig} />
            <ObjectsTable {...ordersConfig} />
          </Route>
          <Route path="/user">
            <NavBar indexUrl='/user/' />
            <PrivateRoute path="/user/" component={User} />
          </Route>
          <Route path="/">
            <NavBar {...customersConfig} />
            <ObjectsTable {...customersConfig} />
          </Route>*/}
        </Routes>
      // </HashRouter>
      {/*<AuthModal />*/}
    {/*</Container>*/}

Layout.propTypes = {
    // history: PropTypes.object
}

export default Layout
