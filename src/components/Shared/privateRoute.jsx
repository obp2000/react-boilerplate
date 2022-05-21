import PropTypes from 'prop-types'
import React from 'react'
import {useSelector} from 'react-redux'
// import {Route, Navigate, withRouter} from 'react-router-dom'
import {Route, Navigate} from 'react-router-dom'
import {selectAuth} from '../redux/auth'

const RedirectToLogin = ({location}) =>
  <Navigate to={{pathname: '/', state: {from: location}}} />

RedirectToLogin.propTypes = {
  location: PropTypes.string,
}

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const {isAuthenticated} = useSelector(selectAuth)
  return <Route {...rest}
    render={(props) => isAuthenticated ?
        <Component {...props} /> :
        <RedirectToLogin {...props} />}
  />
}

PrivateRoute.propTypes = {
  component: PropTypes.object,
}

// export default withRouter(PrivateRoute)
export default PrivateRoute
