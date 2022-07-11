import PropTypes from 'prop-types'
import React from 'react'
import {
  Navigate,
  Outlet,
  useOutletContext,
} from 'react-router-dom'

const ProtectedRoute = ({allow, children}) => {
  if (!allow) {
    return <Navigate to="/" replace />
  }
  const context = useOutletContext()
  return children || <Outlet {...{context}} />
}

ProtectedRoute.propTypes = {
  allow: PropTypes.bool,
  children: PropTypes.object,
}

export default ProtectedRoute
