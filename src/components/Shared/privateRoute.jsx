import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

const RedirectToLogin = ({ location }) =>
    <Redirect to={{pathname: '/login',
                   state: {from: location}}}
    />

const PrivateRoute = ({
        component: Component,
        isAuthenticated,
        ...rest
    }) =>
    <Route {...rest}
      render={props => isAuthenticated ?
        <Component {...props} /> :
        <RedirectToLogin {...props} />}
    />

const mapStateToProps = ({
    auth: {
        isAuthenticated
    }
}) => ({
    isAuthenticated
})

export default withRouter(connect(mapStateToProps)(PrivateRoute))