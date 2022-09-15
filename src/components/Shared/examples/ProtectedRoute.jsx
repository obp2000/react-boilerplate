import PropTypes from 'prop-types'
import React from 'react'
import {
  Navigate,
  Outlet,
  useOutletContext,
} from 'react-router-dom'

const ProtectedRoute = ({allow, children}) => {
  const context = useOutletContext()
  if (!allow) {
    return <Navigate to="/" replace />
  }
  return children || <Outlet {...{context}} />
}

ProtectedRoute.propTypes = {
  allow: PropTypes.bool,
  children: PropTypes.object,
}

export default ProtectedRoute
